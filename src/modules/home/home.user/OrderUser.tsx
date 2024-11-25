import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react"
import { useState } from "react"

interface Product {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  products: Product[]
  date: string
  status: string
  deliveryDate: string
  total: number
}

const orders: Order[] = [
  {
    id: "1",
    products: [
      { name: "Wireless Earbuds", quantity: 1, price: 79.99 },
      { name: "Charging Case", quantity: 1, price: 29.99 },
      { name: "USB-C Cable", quantity: 2, price: 9.99 },
    ],
    date: "2023-04-15",
    status: "Delivered",
    deliveryDate: "2023-04-18",
    total: 129.96,
  },
  {
    id: "2",
    products: [
      { name: "Smart Watch", quantity: 1, price: 199.99 },
      { name: "Charging Dock", quantity: 1, price: 39.99 },
      { name: "Screen Protector", quantity: 2, price: 9.99 },
    ],
    date: "2023-05-02",
    status: "In Transit",
    deliveryDate: "2023-05-07",
    total: 259.96,
  },
  {
    id: "3",
    products: [
      { name: "Laptop Stand", quantity: 1, price: 49.99 },
      { name: "Ergonomic Mouse", quantity: 1, price: 29.99 },
      { name: "Wrist Rest", quantity: 1, price: 19.99 },
    ],
    date: "2023-05-10",
    status: "Processing",
    deliveryDate: "2023-05-15",
    total: 99.97,
  },
]

export function UserOrders() {
  const [openItems, setOpenItems] = useState<string[]>([])

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
          {orders.map((order) => (
            <Collapsible
              key={order.id}
              open={openItems.includes(order.id)}
              onOpenChange={() => toggleItem(order.id)}
            >
              <div className="mb-3 border rounded-lg p-4">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        Order {order.id}
                      </h3>
                      {openItems.includes(order.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Order Date: {order.date}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {order.status === "Delivered" ? (
                        <Package className="mr-2 h-4 w-4" />
                      ) : (
                        <Truck className="mr-2 h-4 w-4" />
                      )}
                      <span>
                        {order.status === "Delivered"
                          ? `Delivered on ${order.deliveryDate}`
                          : `Estimated delivery: ${order.deliveryDate}`}
                      </span>
                    </div>
                    <div className="font-semibold">
                      Total: ${order.total.toFixed(2)}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4 pl-4 border-l-2 border-muted">
                    <h4 className="font-medium mb-2">Products:</h4>
                    <ul className="space-y-2">
                      {order.products.map((product, index) => (
                        <li key={index} className="text-sm">
                          <div className="flex justify-between items-center">
                            <span>{product.name}</span>
                            <span className="text-muted-foreground">
                              {product.quantity} x ${product.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-right text-muted-foreground">
                            Subtotal: $
                            {(product.quantity * product.price).toFixed(2)}
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
