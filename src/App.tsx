import { Spinner } from '@/components/ui/spinner'
import { RootContainer as router } from '@/containers'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </>
  )
}

export default App
