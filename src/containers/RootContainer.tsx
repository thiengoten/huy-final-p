import { ProtectedRoute } from "@/components/CustomRoute/CustomRoute"
import { PATHS } from "@/config"
import {
  AdminLayout,
  IdentityLayout,
  MainLayout,
  NotifyLayout,
} from "@/layouts"
import { adminRoutes as admRoutes } from "@/modules/admin"
import { authRoutes } from "@/modules/auth"
import { homeRoutes } from "@/modules/home"
import { notifyRoutes } from "@/modules/notify"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

const userRoutes = [...homeRoutes]
const identityRoutes = [...authRoutes]
const adminRoutes = [...admRoutes]

const RootContainer = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={PATHS.root}
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
        action
      >
        {...userRoutes}
      </Route>
      <Route path={PATHS.identity} element={<IdentityLayout />}>
        {...identityRoutes}
      </Route>
      <Route
        path={PATHS.admin}
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {...adminRoutes}
      </Route>
      <Route path={PATHS.notify} element={<NotifyLayout />}>
        {...notifyRoutes}
      </Route>
    </>
  )
)

export default RootContainer
