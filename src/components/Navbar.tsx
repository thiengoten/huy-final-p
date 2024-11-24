import { authPaths } from "@/modules/auth"
import { useCart } from "@/providers/CardProvider/CardProvider"
import { useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const Navbar = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity } = useCart()

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
                    {cart.map((item: any, index: number) => (
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
                      Total: $
                      {cart
                        .reduce(
                          (total: number, item: any) =>
                            total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => alert("Proceed to payment")}
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
