import Navbar from "@/components/Navbar"
import { CartProvider } from "@/context/CardContext"

import { Outlet } from "react-router-dom"
const MainLayout = () => {
  return (
    <>
      <CartProvider>
        <header>
          <Navbar />
        </header>
        <main className="container">
          <Outlet />
        </main>
      </CartProvider>
    </>
  )
}

export default MainLayout
