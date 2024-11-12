import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <>
      <main className="bg-loginBackground">
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout
