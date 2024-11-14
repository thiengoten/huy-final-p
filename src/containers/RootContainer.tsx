import { PATHS } from "@/config"
import { AdminLayout, MainLayout } from "@/layouts"
import { adminRoutes } from "@/modules/admin"
import { authRoutes } from "@/modules/auth"
import { homeRoutes } from "@/modules/home"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

const userRoutes = [...homeRoutes]
const identityRoutes = [...authRoutes]
const adRoutes = [...adminRoutes]
//TODO: Add admin routes
// const adminRoutes = []

const RootContainer = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATHS.root} element={<MainLayout />}>
        {...userRoutes}
      </Route>
      <Route path={PATHS.identity} element={<AdminLayout />}>
        {...identityRoutes}
      </Route>
      <Route path={PATHS.admin} element={<AdminLayout />}>
        {...adRoutes}
      </Route>
    </>
  )
)

export default RootContainer
