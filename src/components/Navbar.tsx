import { authPaths } from "@/modules/auth"
import { useCart } from "@/providers/CardProvider/CardProvider"
import { useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useMemo } from "react"
import {
  useCreateOrder,
  useCreateOrderDetail,
} from "@/queries/orders/useOrders"
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider"
import { useToast } from "@/hooks/use-toast"

const Navbar = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity } = useCart()
  const { toast } = useToast()
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
  }

  return (
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
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Cart ({cart.length})</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4 rounded-md border shadow-lg">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Your Cart
              </h3>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {cart.map((item, index: number) => (
                      <li key={index} className="p-2 rounded-md border">
                        <div className="flex items-center space-x-4">
                          {item.images && (
                            <img
                              src={item.images[0]}
                              alt={item.title ? String(item.title) : "product"}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${item.price ? Number(item.price).toFixed(2) : ""}
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
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Total: ${totalPrice}
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

          <Button onClick={() => navigate(authPaths.login)}>Login</Button>
        </div>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
