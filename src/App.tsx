import { Spinner } from '@/components/ui/spinner'
import { RootContainer as router } from '@/containers'
import { QueryProvider } from '@/providers'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </QueryProvider>
  )
}

export default App
