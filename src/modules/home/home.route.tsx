import { PREFIX_ROUTE } from "@/config/paths"
import { UserHomeView } from "@/modules/home/home.user"
import { Route } from "react-router-dom"

export const homePaths = {
  home: `${PREFIX_ROUTE}/`,
}

export const homeRoutes = [
  <Route
    key={homePaths.home}
    id={homePaths.home}
    path={homePaths.home}
    element={<UserHomeView />}
  />,
]
