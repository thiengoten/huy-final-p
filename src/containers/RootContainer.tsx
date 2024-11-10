import { PATHS } from '@/config'
import { MainLayout } from '@/layouts'
import { authRoutes } from '@/modules/auth'
import { homeRoutes } from '@/modules/home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const routes = [...homeRoutes, ...authRoutes]

const RootContainer = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.root} element={<MainLayout />}>
      {...routes}
    </Route>
  )
)

export default RootContainer
