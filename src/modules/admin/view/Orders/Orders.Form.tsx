import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useGetOrderById, useUpdateOrderStatus } from "@/queries/orders"
import { useState } from "react"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  orderId: string
}

const OrdersForm = ({ open, setOpen, orderId }: Props) => {
  const [orderStatus, setOrderStatus] = useState("")
  const { toast } = useToast()
  const { orderData } = useGetOrderById(orderId)
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
  const handleUpdateOrder = () => {
    onUpdateOrderStatus({ id: orderId, status: orderStatus })
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Order</DrawerTitle>
          <DrawerDescription>
            Make changes to the order here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="orderId">Order ID</Label>
              <Input id="orderId" value={orderId} disabled readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="orderStatus">Order Status</Label>
              <Select
                value={orderStatus || orderData?.order_status || ""}
                onValueChange={setOrderStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select order status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleUpdateOrder}>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default OrdersForm
