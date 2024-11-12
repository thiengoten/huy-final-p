import { Spinner } from "@/components/ui/spinner"
import { Suspense, lazy, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"

const LoginForm = lazy(() => import("@/components/Auth/login-form"))
const Registerform = lazy(() => import("@/components/Auth/register-form"))

//TODO: Huy will implement here
const Identity = () => {
  const { pathname } = useLocation()

  const isLoginPage = pathname.includes("login")
  const isSignUpPage = pathname.includes("signup")

  const renderForm = useMemo(() => {
    if (isLoginPage) {
      return <Identity.Login />
    }
    if (isSignUpPage) {
      return <Identity.SignUp />
    }
    return <Outlet />
  }, [isLoginPage, isSignUpPage])

  return (
    <Suspense fallback={<Spinner />}>
      <div className="container h-[100vh] place-content-center">
        {renderForm}
      </div>
    </Suspense>
  )
}

Identity.Login = LoginForm
Identity.SignUp = Registerform

export default Identity
