import { Spinner } from "@/components/ui/spinner"
import { RootContainer as router } from "@/containers"
import { QueryProvider, ThemeProvider } from "@/providers"
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} fallbackElement={<Spinner />} />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
