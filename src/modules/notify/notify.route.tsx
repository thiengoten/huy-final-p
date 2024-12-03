import { PATHS } from "@/config"
import { Route } from "react-router-dom"
import { ErrorPage, SuccessPage } from "./View"

export const notifyPaths = {
  error: `${PATHS.notify}/error`,
  success: `${PATHS.notify}/success`,
}

export const notifyRoutes = [
  <Route
    key={notifyPaths.error}
    id={notifyPaths.error}
    path={notifyPaths.error}
    element={<ErrorPage />}
  />,
  <Route
    key={notifyPaths.success}
    id={notifyPaths.success}
    path={notifyPaths.success}
    element={<SuccessPage />}
  />,
]
