import React, { createContext, useContext, useState } from "react"

type Cart = {
  images: string[]
  title: string
  price: number
  quantity: number
  id: string
}

type CartContextType = {
  cart: Cart[]
  addToCart: (product: any) => void
  updateQuantity: (productId: string, newQuantity: number) => void
}

// Define Cart Context
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
})

// Custom Hook for easier access
export const useCart = () => useContext(CartContext)

type Props = React.PropsWithChildren<{}> & {}

export default function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Cart[]>([])
  const addToCart = (product: Cart) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id)

      if (existingProduct) {
        // If product exists, increase the quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // If product does not exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item
      )
    )
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
