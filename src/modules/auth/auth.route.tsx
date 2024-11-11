import { PREFIX_ROUTE } from '@/config'

import { Route } from 'react-router-dom'
import { LoginView, RegisterView } from './view'

export const authPaths = {
  login: `${PREFIX_ROUTE}/login`,
  register: `${PREFIX_ROUTE}/register`,
}

export const authRoutes = [
  <Route id={authPaths.login} path={authPaths.login} element={<LoginView />} />,
  <Route
    id={authPaths.register}
    path={authPaths.register}
    element={<RegisterView />}
  />,
]
