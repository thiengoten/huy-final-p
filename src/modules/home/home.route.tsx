import { PREFIX_ROUTE } from '@/config/paths'
import { UserHome } from '@/modules/home/home.user'
import { Route } from 'react-router-dom'

export const homePaths = {
  home: `${PREFIX_ROUTE}/home`,
}

export const homeRoutes = [
  <Route key={homePaths.home} path={homePaths.home} element={<UserHome />} />,
]
