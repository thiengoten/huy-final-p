import { PATHS } from '@/config'
import { AdminLayout, MainLayout } from '@/layouts'
import { authRoutes } from '@/modules/auth'
import { homeRoutes } from '@/modules/home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const userRoutes = [...homeRoutes]
const identityRoutes = [...authRoutes]

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
    </>
  )
)

export default RootContainer
