import { Button } from '@/components/ui/button'
import { PATHS } from '@/config'
import { useGetAllProducts } from '@/queries/products'
import { useNavigate } from 'react-router-dom'

type Props = {}

const UserHomeContainer = ({}: Props) => {
  const navigate = useNavigate()
  const data = useGetAllProducts()
  console.log('🚀 ~ UserHomeContainer ~ data:', data)
  return (
    <div>
      <Button
        onClick={() => {
          navigate(PATHS.login)
        }}
      >
        Login
      </Button>
    </div>
  )
}

export default UserHomeContainer
