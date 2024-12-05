import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetOrderByUserId } from "@/queries/orders/useOrders"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default" // Green
    case "shipping":
      return "secondary" // Blue
    case "pending":
      return "secondary" // Yellow
    case "cancelled":
      return "destructive" // Red
    default:
      return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <Package className="mr-2 h-4 w-4" />
    case "shipping":
      return <Truck className="mr-2 h-4 w-4" />
    case "pending":
      return <Clock className="mr-2 h-4 w-4" />
    case "cancelled":
      return <XCircle className="mr-2 h-4 w-4" />
    default:
      return <Package className="mr-2 h-4 w-4" />
  }
}

const getStatusMessage = (status: string, date: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return `Delivered on ${date}`
    case "shipping":
      return `In transit - Estimated delivery: ${date}`
    case "pending":
      return `Processing - Estimated shipping: ${date}`
    case "cancelled":
      return `Cancelled on ${date}`
    default:
      return `Updated on ${date}`
  }
}

export function UserOrders() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const param = useParams()
  const { orderData } = useGetOrderByUserId(param.id as string)

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  dayjs.extend(utc)
  const formattedOrders = (orderData?.data || []).map((order: any) => {
    return {
      ...order,
      formatted_date: dayjs(order.created_at).format("YYYY-MM-DD"),
    }
  })

  return (
    <Card className="w-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {formattedOrders?.map((order: any) => (
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
                    <Badge variant={getStatusColor(order.order_status)}>
                      {order.order_status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Order Date: {order.formatted_date}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {getStatusIcon(order.order_status)}
                      <span>
                        {getStatusMessage(
                          order.order_status,
                          order.formatted_date
                        )}
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
                        <li key={item.id} className="text-sm">
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
