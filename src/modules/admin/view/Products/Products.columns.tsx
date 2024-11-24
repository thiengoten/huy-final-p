import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProductResponse } from "@/queries/products/products.types"

export type Product = ProductResponse

export const allColumns = (
  handleEdit: (productId: string) => void,
  handleDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.original.images as string[] | null
      const firstImage =
        images && images.length > 0 ? images[0] : "https://placehold.co/600x400"
      return (
        <img
          src={firstImage}
          alt={row.original.title || ""}
          className="w-12 h-12 object-cover rounded-md"
        />
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => <div>{row.getValue("brand") || "—"}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0")
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: "Stock",
    cell: ({ row }) => {
      const quantity = parseInt(row.getValue("quantity") || "0")
      return (
        <Badge variant={quantity > 0 ? "default" : "destructive"}>
          {quantity}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(product.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(product)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
