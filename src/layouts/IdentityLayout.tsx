import { cn } from "@/lib/utils"
import { useTheme } from "@/providers/ThemesProvider/theme-provider"
import { Outlet } from "react-router-dom"

const IdentityLayout = () => {
  const theme = useTheme()
  return (
    <>
      <main
        className={cn(
          "bg-loginBackground",
          theme.theme === "dark" && "bg-dark-loginBackground"
        )}
      >
        <Outlet />
      </main>
    </>
  )
}

export default IdentityLayout
