import { Outlet } from "react-router-dom"

const IdentityLayout = () => {
  return (
    <>
      <main className="bg-loginBackground">
        <Outlet />
      </main>
    </>
  )
}

export default IdentityLayout
