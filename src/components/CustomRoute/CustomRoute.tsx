// src/components/ProtectedRoute.tsx
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { authPaths } from "@/modules/auth/auth.route"
import { Spinner } from "@/components/ui/spinner"
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { PATHS } from "@/config"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isNewLogin } = useAuthContext()

  const navigate = useNavigate()
  const { toast } = useToast()

  const isAdminRoute = useLocation().pathname.startsWith(PATHS.admin)

  useEffect(() => {
    if (!isLoading && isAdminRoute && !user) {
      return navigate(authPaths.login)
    }

    if (!isLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You need to login to access this page",
        variant: "destructive",
        action: (
          <ToastAction
            onClick={() => {
              navigate(authPaths.login)
            }}
            altText="Login"
          >
            Login now
          </ToastAction>
        ),
      })
    } else if (isNewLogin && user) {
      toast({
        title: `Welcome back, ${user.email}`,
        description: "You are now logged in",
      })
    }
  }, [user, isLoading, isNewLogin])

  return <>{children}</>
}

// src/components/AdminRoute.tsx
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return <Spinner />
  }

  // Check if user has admin role (you'll need to adjust this based on your user data structure)
  const isAdmin = user?.user_metadata?.role === "admin"

  if (!user || !isAdmin) {
    return <Navigate to={authPaths.login} replace />
  }

  return <>{children}</>
}
