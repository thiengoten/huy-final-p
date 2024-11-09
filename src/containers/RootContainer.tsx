import { PATHS } from '@/config'
import { MainLayout } from '@/layouts'
import { homeRoutes } from '@/modules/home'
import { loginRoutes } from '@/modules/auth'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const routes = [...homeRoutes, ...loginRoutes]

const RootContainer = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.root} element={<MainLayout />}>
      {...routes}
    </Route>
  )
)

export default RootContainer
