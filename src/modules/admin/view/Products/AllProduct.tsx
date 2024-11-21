import { deleteProduct, getAllProducts, updateProduct } from "@/api/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React, { useEffect } from "react" // Add import for React
import { z } from "zod"
import { EditProductDialog } from "./EditProduct"

const productSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string().min(3),
  price: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  createdAt: z.string().optional(),
})

type Product = z.infer<typeof productSchema>

export default function AllProduct() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts()
        console.log("🚀 ~ fetchProducts ~ data:", data)
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])
  console.log("🚀 ~ AllProduct ~ products:", products)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const handleSave = async (updatedProduct: Product) => {
    try {
      const { data, error } = await updateProduct(
        updatedProduct.id,
        updatedProduct
      )
      console.log("🚀 ~ handleSave ~ data:", data)
      if (error) {
        throw error
      }

      // If the update was successful, update the local state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      )
      setEditingProduct(null)

      // Optionally, you can show a success message to the user
      console.log("Product updated successfully")
    } catch (error) {
      // Handle any errors that occurred during the update
      console.error("Error updating product:", error)
      // Optionally, you can show an error message to the user
      // For example: setErrorMessage('Failed to update product. Please try again.')
    }
  }
  const handleDelete = async (productId: string) => {
    try {
      // Show a confirmation dialog before deleting
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return
      }

      const { error } = await deleteProduct(productId)

      if (error) {
        throw error
      }

      // If the deletion was successful, update the local state
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      )
      console.log("Product deleted successfully")
    } catch (error) {
      // Handle any errors that occurred during the deletion
      console.error("Error deleting product:", error)
      // Optionally, you can show an error message to the user
      // For example: setErrorMessage('Failed to delete product. Please try again.')
    }
  }

  return (
    <div className="mx-auto py-8 pl-20 ">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              {product.images &&
                product.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ))}
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
              <Badge variant="secondary" className="mb-2">
                ${product.price ? Number(product.price).toFixed(2) : ""}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full mr-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <EditProductDialog
        product={editingProduct as Product} // Add type assertion to ensure the object has all required properties
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={(updatedProduct: {
          id: string
          title: string
          description: string
          price?: string | undefined
          images?: string[] | undefined
          brand?: string | undefined
          size?: string | undefined
        }) => handleSave(updatedProduct)}
      />
    </div>
  )
}
