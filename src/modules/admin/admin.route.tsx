import { PATHS } from "@/config"

import { Route } from "react-router-dom"
import Admin from "./view/AdminView"

export const adminPaths = {
  dashboard: `${PATHS.admin}/overview`,
  product: `${PATHS.admin}/products`,
  manageUser: `${PATHS.admin}/users`,
  manageOrder: `${PATHS.admin}/orders`,
}

export const adminRoutes = [
  <Route
    id={adminPaths.dashboard}
    path={adminPaths.dashboard}
    element={<Admin />}
  />,
  <Route
    id={adminPaths.product}
    path={adminPaths.product}
    element={<Admin />}
  />,
  <Route
    id={adminPaths.manageUser}
    path={adminPaths.manageUser}
    element={<Admin />}
  />,
  <Route
    id={adminPaths.manageOrder}
    path={adminPaths.manageOrder}
    element={<Admin />}
  />,
]
