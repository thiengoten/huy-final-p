import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import CartProvider from "@/providers/CardProvider/CardProvider"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
      {/* TODO: can implement navbar if want */}
      <CartProvider>
        <header>
          <Navbar />
        </header>
        <main className="container">
          <Outlet />
        </main>
        {/* TODO: can implement footer if want */}
        <footer></footer>
        <Toaster />
      </CartProvider>
    </>
  )
}

export default MainLayout
