import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/providers/CardProvider/CardProvider"
import { useGetAllProducts } from "@/queries/products"
import { Link } from "react-router-dom"

type Props = {}

const UserHomeContainer = ({}: Props) => {
  const { addToCart } = useCart()
  const { productsData, isLoading } = useGetAllProducts()

  return isLoading ? (
    <div className="flex items-center justify-center">
      <div className="w-45 h-40 bg-gradient-to-b from-transparent via-white to-transparent animate-matrix" />
    </div>
  ) : (
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
                <Link className="w-full" to={`/product/${product.id}`}>
                  Detail
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UserHomeContainer

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader" />
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .loader {
//     width: 45px;
//     height: 40px;
//     background: linear-gradient(#0000 calc(1*100%/6),#fff 0 calc(3*100%/6),#0000 0),
//               linear-gradient(#0000 calc(2*100%/6),#fff 0 calc(4*100%/6),#0000 0),
//               linear-gradient(#0000 calc(3*100%/6),#fff 0 calc(5*100%/6),#0000 0);
//     background-size: 10px 400%;
//     background-repeat: no-repeat;
//     animation: matrix 1s infinite linear;
//   }

//   @keyframes matrix {
//     0% {
//       background-position: 0% 100%, 50% 100%, 100% 100%
//     }

//     100% {
//       background-position: 0% 0%, 50% 0%, 100% 0%
//     }
//   }`;
