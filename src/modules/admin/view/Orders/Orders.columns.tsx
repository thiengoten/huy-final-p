import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { OrderResponse } from "@/queries/orders/orders.types"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"

export type Order = OrderResponse

const ActionCell = ({
  row,
  handleEdit,
  handleDelete,
  handleViewDetail,
}: {
  row: any
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
  handleViewDetail: (id: string) => void
}) => {
  const order = row.original

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
          onClick={() => navigator.clipboard.writeText(order.id.toString())}
        >
          Copy order ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewDetail(order.id.toString())}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(order.id.toString())}>
          <Pencil className="mr-2 h-4 w-4" />
          Change Order Status
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(order.id.toString())}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const allColumns = (
  handleEdit: (orderId: string) => void,
  handleDelete: (orderId: string) => void,
  handleViewDetail: (orderId: string) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{dayjs(row.original.created_at).format("YYYY-MM-DD")}</div>
    },
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.order_status}</Badge>
    },
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => <div>{row.getValue("user_id") || "—"}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total") || "0")
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell
        row={row}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleViewDetail={handleViewDetail}
      />
    ),
  },
]
