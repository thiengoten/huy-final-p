import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "../../../../components/ui/button"

// Define the structure of a product
interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Air Jordan 1 High OG Chicago Reimagined Lost and Found",
    price: 79.99,
    rating: 4.5,
    image:
      "https://i.pinimg.com/736x/b3/f2/a2/b3f2a21dda6f97bc8a3f6e50317d4c6d.jpg",
  },
  {
    id: 2,
    name: "Nike Air Max 1 'Big Bubble'",
    price: 129.99,
    rating: 4.8,
    image:
      "https://i.pinimg.com/736x/98/1b/31/981b3141681e59ccca66977485f8fed7.jpg",
  },
  {
    id: 3,
    name: "air max 1",
    price: 199.99,
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "superstar",
    price: 49.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "yeezy 350",
    price: 249.99,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "yeezy 700",
    price: 189.99,
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AllProduct() {
  return (
    <div className="mx-auto py-8 pl-20 ">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <Badge variant="secondary" className="mb-2">
                ${product.price.toFixed(2)}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Edit</Button>
              <Button className="w-full" variant="secondary">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
