import { DataTable } from "@/components/DataTable"
import { Spinner } from "@/components/ui/spinner"
import { allColumns } from "@/modules/admin/view/Products/Products.columns"
import { useGetAllProducts } from "@/queries/products"
import { useMemo } from "react"

export default function AllProduct() {
  // const { onDeleteProduct } = useDeleteProduct()
  const { productsData, isLoading } = useGetAllProducts()

  const handleDelete = (product: any) => {
    console.log("Delete product:", product)
    // onDeleteProduct({
    //   id: product.id.toString(),
    // })
  }
  const handleEdit = (product: any) => {
    console.log("Edit product:", product)
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
