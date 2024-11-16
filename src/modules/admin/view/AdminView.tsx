import { lazy, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"

const Overview = lazy(() => import("@/components/admin/Overview"))
const AllProduct = lazy(
  () => import("@/modules/admin/view/Products/AllProduct")
)
const AllOrder = lazy(() => import("@/modules/admin/view/Orders/AllOrder"))
const AllUser = lazy(() => import("@/modules/admin/view/Users/AllUser"))
const AddProduct = lazy(
  () => import("@/modules/admin/view/Products/AddProduct")
)

const Admin = () => {
  const { pathname } = useLocation()

  const isDashboard = pathname.includes("overview")
  const isProduct = pathname.includes("products")
  const isManage = pathname.includes("users")
  const isManageOrder = pathname.includes("orders")
  const isAddProduct = pathname.includes("add-product")

  const renderForm = useMemo(() => {
    if (isDashboard) {
      return <Admin.Dashboard />
    }
    if (isProduct) {
      return <Admin.Product />
    }
    if (isAddProduct) {
      return <Admin.AddProduct />
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

Admin.Dashboard = Overview
Admin.Product = AllProduct
Admin.Manage = AllUser
Admin.ManageOrder = AllOrder
Admin.AddProduct = AddProduct

export default Admin
