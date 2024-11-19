import { PATHS } from "@/config"

import { Route } from "react-router-dom"
import { Identity } from "./view"

export const authPaths = {
  login: `${PATHS.identity}/login`,
  signup: `${PATHS.identity}/signup`,
}

export const authRoutes = [
  <Route
    key={authPaths.login}
    id={authPaths.login}
    path={authPaths.login}
    element={<Identity />}
  />,
  <Route
    key={authPaths.signup}
    id={authPaths.signup}
    path={authPaths.signup}
    element={<Identity />}
  />,
]
