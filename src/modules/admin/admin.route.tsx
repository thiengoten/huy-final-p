import { PATHS } from "@/config"

import { Route } from "react-router-dom"
import Admin from "./view/AdminView"

export const adminPaths = {
  dashboard: `${PATHS.admin}/dashboard`,
  product: `${PATHS.admin}/product`,
  manage: `${PATHS.admin}/manage`,
  manageOrder: `${PATHS.admin}/manage-order`,
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
  <Route id={adminPaths.manage} path={adminPaths.manage} element={<Admin />} />,
  <Route
    id={adminPaths.manageOrder}
    path={adminPaths.manageOrder}
    element={<Admin />}
  />,
]
