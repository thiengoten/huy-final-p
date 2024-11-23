import { PREFIX_ROUTE } from "@/config/paths"
import { ProductDetails, UserHomeView } from "@/modules/home/home.user"
import { Route } from "react-router-dom"

export const homePaths = {
  home: `${PREFIX_ROUTE}/`,
  details: `${PREFIX_ROUTE}/product/:id`,
}

export const homeRoutes = [
  <Route
    key={homePaths.home}
    id={homePaths.home}
    path={homePaths.home}
    element={<UserHomeView />}
  />,
  <Route
    id={homePaths.details}
    path={homePaths.details}
    element={<ProductDetails />}
  />,
]
