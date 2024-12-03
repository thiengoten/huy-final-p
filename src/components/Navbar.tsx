import { signOut } from "@/api/auths"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { authPaths } from "@/modules/auth"
import { homePaths } from "@/modules/home"
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider"
import { useCart } from "@/providers/CardProvider/CardProvider"
import {
  useCreateOrder,
  useCreateOrderDetail,
  useTestApi,
} from "@/queries/orders/useOrders"
import { CircleX } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "./Search"
import { ModeToggle } from "./mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"

const Navbar = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, deleteFromCart } = useCart()
  const { toast } = useToast()
  const { onTestApi } = useTestApi()
  const { onAddNewOrder } = useCreateOrder({
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      })
    },
  })
  const { onAddNewOrderDetail } = useCreateOrderDetail({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order created successfully",
      })
    },
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const { user } = useAuthContext()

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cart])

  const handleProceedToPayment = async () => {
    const { data, error } = await onAddNewOrder({
      user_id: user?.id as string,
      order_status: "pending",
      total: totalPrice,
    })
    if (error) return

    const { error: orderDetailError } = await onAddNewOrderDetail(
      cart.map((item) => ({
        order_id: data?.id,
        product_id: item.id,
        quantity: item.quantity,
        image: item.images?.[0],
      }))
    )
    if (orderDetailError) {
      return toast({
        title: "Error",
        variant: "destructive",
        description: orderDetailError.message,
      })
    }
    const { clientUrl } = await onTestApi({
      products: cart,
    })
    window.location.href = clientUrl
  }

  const handleRemoveCart = (productId: string) => {
    deleteFromCart(productId)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate(authPaths.login)
    } catch (error) {
      console.error("Error logging out", error)
    }
  }
  return (
    <>
      <nav className="">
        <div className="container mx-auto flex p-4 items-center space-x-6 ">
          <div className="font-bold ">
            <a href="/">SNEAKERZONE</a>
          </div>
          <div className="hidden md:flex space-x-6  items-center justify-between">
            <a href="#">Home</a>

            <a href="#">Products</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className=" hidden md:flex w-[100%] justify-end gap-4">
            <div className="contents w-full max-w-[400px] relative">
              <Button
                variant="outline"
                className={cn(
                  "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setSearchOpen(true)}
              >
                <span className="hidden lg:inline-flex">
                  Search products...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>J
                </kbd>
              </Button>
            </div>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Cart ({cart.length})</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 rounded-md border shadow-lg">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  Your Cart
                </h3>
                {cart.length === 0 ? (
                  <p className="text-sm">Your cart is empty.</p>
                ) : (
                  <>
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-4">
                        {cart.map((item, index: number) => (
                          <li key={index} className="p-2 rounded-md border">
                            <div className="flex items-center space-x-4">
                              {item.images && (
                                <img
                                  src={item.images[0]}
                                  alt={
                                    item.title ? String(item.title) : "product"
                                  }
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm">
                                  $
                                  {item.price
                                    ? Number(item.price).toFixed(2)
                                    : ""}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity === 1}
                                  >
                                    -
                                  </Button>
                                  <span className="px-2 text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div
                              className="flex w-full items-center space-x-2 justify-around mt-2"
                              onClick={() => handleRemoveCart(item.id)}
                            >
                              <Button className="w-full" size="sm">
                                <CircleX className="mr-2 h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                    <div className="mt-4 border-t pt-4">
                      <p className="text-lg font-semibold text-gray-800">
                        Total: ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      onClick={handleProceedToPayment}
                    >
                      Proceed to Payment
                    </Button>
                  </>
                )}
              </PopoverContent>
            </Popover>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/micah/svg/backgroundColor=b6e3f4,c0aede,d1d4f9?seed=${user?.email}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-ellipsis overflow-hidden">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/" + user?.id)}
                    >
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(homePaths.home)}>
                      Home
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate(authPaths.login)}>Login</Button>
            )}
          </div>
          <ModeToggle />
        </div>
      </nav>
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

export default Navbar
