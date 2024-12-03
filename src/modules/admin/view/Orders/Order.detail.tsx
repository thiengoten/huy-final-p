"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetOrderDetailByOrderId } from "@/queries/orders"
import dayjs from "dayjs"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function OrderDetailsDialog({
  isOpen,
  onClose,
  orderId,
}: {
  orderId: string
  isOpen: boolean
  onClose: () => void
}) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const { orderDetailData } = useGetOrderDetailByOrderId(orderId)
  console.log("🚀 ~ orderDetailData:", orderDetailData)

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  if (!orderId) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          {orderDetailData?.data?.map((order: any) => (
            <Collapsible
              key={order.id}
              open={openItems.includes(order.id.toString())}
              onOpenChange={() => toggleItem(order.id.toString())}
            >
              <div className="mb-3 border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        Order #{order.id}
                      </h3>
                      {openItems.includes(order.id.toString()) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Order Date: {dayjs(order.created_at).format("YYYY-MM-DD")}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4 pl-4 border-l-2 border-muted">
                    <h4 className="font-medium mb-2">Products:</h4>
                    <ul className="space-y-2">
                      <li key={order.product_id.id} className="text-sm">
                        <div className="flex justify-between items-center">
                          <span>
                            {order.product_id.title} x{order.quantity}
                          </span>
                          <span className="text-muted-foreground">
                            ${parseFloat(order.product_id.price).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right text-muted-foreground">
                          Subtotal: $
                          {(order.product_id.price * order.quantity).toFixed(2)}
                        </div>
                      </li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
