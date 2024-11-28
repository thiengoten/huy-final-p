import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetOrderByUserId } from "@/queries/orders/useOrders"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export function UserOrders() {
  const [openItems, setOpenItems] = useState<string[]>([])

  let param = useParams()

  const { orderData } = useGetOrderByUserId(param.id as string)

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }
  return (
    <Card className="w-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {orderData?.data?.map((order) => (
            <Collapsible
              key={order.id}
              open={openItems.includes(order.id.toString())}
              onOpenChange={() => toggleItem(order.id.toString())}
            >
              <div className="mb-3 border rounded-lg p-4">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        Order {order.id}
                      </h3>
                      {openItems.includes(order.id.toString()) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    <Badge
                      variant={
                        order.order_status === "Delivered"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {order.order_status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Order Date: {order.created_at}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {order.order_status === "Delivered" ? (
                        <Package className="mr-2 h-4 w-4" />
                      ) : (
                        <Truck className="mr-2 h-4 w-4" />
                      )}
                      <span>
                        {order.order_status === "Delivered"
                          ? `Delivered on ${order.created_at}`
                          : `Estimated delivery: ${order.created_at}`}
                      </span>
                    </div>
                    <div className="font-semibold">
                      Total: ${order.total ? order.total.toFixed(2) : "N/A"}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4 pl-4 border-l-2 border-muted">
                    <h4 className="font-medium mb-2">Products:</h4>
                    <ul className="space-y-2">
                      {order.order_detail.map((item: any) => (
                        <li className="text-sm">
                          <div className="flex justify-between items-center">
                            <span>
                              {item.product_id.title} x{item.quantity}
                            </span>
                            <span className="text-muted-foreground">
                              ${parseFloat(item.product_id.price).toFixed(2)}
                            </span>
                          </div>
                          <div className="text-right text-muted-foreground">
                            Subtotal: $
                            {(item.product_id.price * item.quantity).toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
