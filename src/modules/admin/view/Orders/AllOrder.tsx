import { DataTable } from "@/components/DataTable"
import { useToast } from "@/hooks/use-toast"

import { allColumns } from "@/modules/admin/view/Orders/Orders.columns"
import OrdersForm from "@/modules/admin/view/Orders/Orders.Form"
import { useGetOrders, useUpdateOrderStatus } from "@/queries/orders"
import { useMemo, useState } from "react"
import { OrderDetailsDialog } from "./Order.detail"

export default function AllOrder() {
  const { orderData } = useGetOrders()
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState("")
  const { toast } = useToast()
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState("")

  const { onUpdateOrderStatus, handleInvalidateOrders } = useUpdateOrderStatus({
    onSuccess: () => {
      toast({
        title: "Order status updated successfully",
      })
      handleInvalidateOrders(orderId)
      handleInvalidateOrders()
      setOpen(false)
    },
  })

  const handleEditOrder = (orderId: string) => {
    setOrderId(orderId)
    setOpen(true)
  }

  const handleDeleteOrder = (orderId: string) => {
    onUpdateOrderStatus({ id: orderId, status: "cancelled" })
  }

  const handleViewDetail = (orderId: string) => {
    setSelectedOrderId(orderId)
    setIsDetailOpen(true)
  }

  const columns = useMemo(
    () => allColumns(handleEditOrder, handleDeleteOrder, handleViewDetail),
    []
  )

  return (
    <div className="pt-0 p-6 w-full min-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <DataTable columns={columns} data={orderData?.data || []} />
      <OrdersForm open={open} setOpen={setOpen} orderId={orderId} />
      <OrderDetailsDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        orderId={selectedOrderId}
      />
    </div>
  )
}
