import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
      {/* TODO: can implement navbar if want */}
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Outlet />
      </main>
      {/* TODO: can implement footer if want */}
      <footer></footer>
      <Toaster />
    </>
  )
}

export default MainLayout
