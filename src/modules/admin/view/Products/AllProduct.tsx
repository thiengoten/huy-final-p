import { DataTable } from "@/components/DataTable"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { allColumns } from "@/modules/admin/view/Products/Products.columns"
import EditProductForm from "@/modules/admin/view/Products/Propducts.EditForm"

import { useDialog } from "@/providers/DialogProvider/DialogProvider"
import {
  ProductResponse,
  useDeleteProduct,
  useGetAllProducts,
} from "@/queries/products"
import { useMemo } from "react"

export default function AllProduct() {
  const { toast } = useToast()
  const { openDialog } = useDialog()

  const { productsData, isLoading, handleInvalidateProducts } =
    useGetAllProducts()

  const { onDeleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast({
        title: "Product deleted successfully",
      })
      handleInvalidateProducts()
    },
  })

  const handleDelete = (product: ProductResponse) => {
    onDeleteProduct({
      id: product.id,
    })
  }
  const handleEdit = (productId: string) => {
    openDialog({
      title: "Edit Product",
      content: <EditProductForm productId={productId} />,
    })
  }

  const columns = useMemo(() => allColumns(handleEdit, handleDelete), [])

  if (isLoading) return <Spinner />

  return (
    <div className="mx-auto py-6 px-6 min-w-[80vw]">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <DataTable columns={columns} data={productsData || []} />
    </div>
  )
}
