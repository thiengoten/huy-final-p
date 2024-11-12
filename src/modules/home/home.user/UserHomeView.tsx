import { useGetAllProducts } from '@/queries/products'

type Props = {}

const UserHomeContainer = ({}: Props) => {
  const data = useGetAllProducts()
  console.log('🚀 ~ UserHomeContainer ~ data:', data)
  return <div>Hello</div>
}

export default UserHomeContainer
