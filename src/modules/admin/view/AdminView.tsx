import { lazy, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"

const Overview = lazy(() => import("@/components/admin/Overview"))
const AllProduct = lazy(() => import("@/components/admin/AllProduct"))
const AllOrder = lazy(() => import("@/components/admin/AllOrder"))
const AllUser = lazy(() => import("@/components/admin/AllUser"))

const Admin = () => {
  const { pathname } = useLocation()

  const isDashboard = pathname.includes("overview")
  const isProduct = pathname.includes("products")
  const isManage = pathname.includes("users")
  const isManageOrder = pathname.includes("orders")

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

Admin.Dashboard = Overview
Admin.Product = AllProduct
Admin.Manage = AllUser
Admin.ManageOrder = AllOrder

export default Admin
