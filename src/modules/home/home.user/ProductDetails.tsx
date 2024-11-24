import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { useGetProductById } from "@/queries/products"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductImageCarousel from "./ProductImageCarousel "

export default function ProductDetails() {
  const { id } = useParams()
  const [isDelayedLoading, setIsDelayedLoading] = useState(true)
  const { productData, isLoading } = useGetProductById(id as string)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return isLoading || isDelayedLoading ? (
    <Loader className="text-white bg-black bg-opacity-30" />
  ) : (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <ProductImageCarousel images={productData?.images ?? []} />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{productData?.title}</h1>
          <p className="text-sm text-gray-500">Brand: {productData?.brand}</p>
          <p className="text-xl font-semibold text-green-600">
            ${Number(productData?.price).toFixed(2)}
          </p>
          <p className="text-gray-700">{productData?.description}</p>
          <Button className="mt-4">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
