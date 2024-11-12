import { PATHS } from '@/config'

import { Route } from 'react-router-dom'
import { LoginView, RegisterView } from './view'

export const authPaths = {
  login: `${PATHS.identity}/login`,
  register: `${PATHS.identity}/register`,
}

export const authRoutes = [
  <Route id={authPaths.login} path={authPaths.login} element={<LoginView />} />,
  <Route
    id={authPaths.register}
    path={authPaths.register}
    element={<RegisterView />}
  />,
]
