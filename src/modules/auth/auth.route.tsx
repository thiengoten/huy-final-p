import { PREFIX_ROUTE } from '@/config'
import { LoginView, RegisterView } from '@/modules/auth/view'
import { Route } from 'react-router-dom'

export const authPaths = {
  login: `${PREFIX_ROUTE}/login`,
  register: `${PREFIX_ROUTE}/register`,
}

export const loginRoutes = [
  <Route id={authPaths.login} path={authPaths.login} element={<LoginView />} />,
  <Route
    id={authPaths.register}
    path={authPaths.register}
    element={<RegisterView />}
  />,
]
