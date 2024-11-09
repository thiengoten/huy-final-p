import { Button } from '@/components/ui/button'
import { PATHS } from '@/config'
import { useNavigate } from 'react-router-dom'

type Props = {}

const UserHomeContainer = ({}: Props) => {
  const navigate = useNavigate()
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
