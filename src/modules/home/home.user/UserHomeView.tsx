import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/context/CardContext"
import { useGetAllProducts } from "@/queries/products"
import { Link } from "react-router-dom"

type Props = {}

const UserHomeContainer = ({}: Props) => {
  const { addToCart } = useCart()
  const { productsData } = useGetAllProducts()
  console.log("🚀 ~ UserHomeContainer ~ productsData:", productsData)

  return (
    <div className="mx-auto py-8 pl-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData?.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              {product.images && (
                <img
                  src={product.images[0]}
                  alt={product.title ? String(product.title) : "product"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
              <Badge variant="secondary" className="mb-2">
                ${product.price ? Number(product.price).toFixed(2) : ""}
              </Badge>
            </CardContent>
            <CardFooter className="grid-cols-2 gap-2">
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Card
              </Button>
              <Button className="w-full" variant="secondary">
                <Link to={`/product/${product.id}`}>Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UserHomeContainer
