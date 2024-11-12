import { useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"

const Admin = () => {
  const { pathname } = useLocation()

  const isDashboard = pathname.includes("dashboard")
  const isProduct = pathname.includes("product")
  const isManage = pathname.includes("manage")
  const isManageOrder = pathname.includes("manage-order")

  const renderForm = useMemo(() => {
    if (isDashboard) {
      return <Admin.Dashboard />
    }
    if (isProduct) {
      return <Admin.Product />
    }
    if (isManage) {
      return <Admin.Manage />
    }
    if (isManageOrder) {
      return <Admin.ManageOrder />
    }
    return <Outlet />
  }, [isDashboard, isProduct, isManage, isManageOrder])
  return <div>{renderForm}</div>
}
Admin.Dashboard = () => <div>Dashboard</div>
Admin.Product = () => <div>Product</div>
Admin.Manage = () => <div>Manage</div>
Admin.ManageOrder = () => <div>Manage Order</div>
export default Admin
