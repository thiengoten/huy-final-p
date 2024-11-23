import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import ProductImageCarousel from "./ProductImageCarousel "

export default function ProductDetails() {
  const { id } = useParams()
  const productData = {
    title: "Nike Air Max 2024",
    brand: "Nike",
    description:
      "The Nike Air Max 2024 combines cutting-edge technology with timeless style for an unbeatable sneaker experience.",
    price: 199.99,
    images: [
      "https://i.pinimg.com/enabled_lo_mid/736x/81/e7/0f/81e70fc7a9fece69255237f7fdbccbcf.jpg",
      "https://i.pinimg.com/736x/77/2d/2a/772d2ac7e5f993987c4cf935fde7afee.jpg",
      "https://i.pinimg.com/736x/b3/f2/a2/b3f2a21dda6f97bc8a3f6e50317d4c6d.jpg",
    ],
  }
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="relative">
          <ProductImageCarousel images={productData.images} />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{productData.title}</h1>
          <p className="text-sm text-gray-500">Brand: {productData.brand}</p>
          <p className="text-xl font-semibold text-green-600">
            ${productData.price.toFixed(2)}
          </p>
          <p className="text-gray-700">{productData.description}</p>
          <Button className="mt-4">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
