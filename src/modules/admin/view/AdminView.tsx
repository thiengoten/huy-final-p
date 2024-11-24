import { Suspense, lazy, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"

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

  const renderForm = useMemo(() => {
    if (pathname.includes("overview")) {
      return <Admin.Dashboard />
    }
    if (pathname.includes("products")) {
      return <Admin.Product />
    }
    if (pathname.includes("add-product")) {
      return <Admin.AddProduct />
    }
    if (pathname.includes("users")) {
      return <Admin.Manage />
    }
    if (pathname.includes("orders")) {
      return <Admin.ManageOrder />
    }
    return <Outlet />
  }, [pathname])

  return (
    <div>
      <Suspense fallback={<Spinner />}>{renderForm}</Suspense>
    </div>
  )
}

Admin.Dashboard = Overview
Admin.Product = AllProduct
Admin.Manage = AllUser
Admin.ManageOrder = AllOrder
Admin.AddProduct = AddProduct

export default Admin
