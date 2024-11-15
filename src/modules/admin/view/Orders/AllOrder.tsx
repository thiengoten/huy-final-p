"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, MoreHorizontal, Package } from "lucide-react"
import { useState } from "react"

// Sample order data
const orders = [
  {
    id: "ORD001",
    customerName: "Alice Johnson",
    date: "2023-11-15",
    status: "Delivered",
    total: 150.99,
    products: ["Product A", "Product B", "Product C"],
  },
  {
    id: "ORD002",
    customerName: "Bob Smith",
    date: "2023-11-16",
    status: "Processing",
    total: 89.99,
    products: ["Product D", "Product E"],
  },
  {
    id: "ORD003",
    customerName: "Charlie Brown",
    date: "2023-11-17",
    status: "Shipped",
    total: 210.5,
    products: ["Product A", "Product F", "Product G", "Product H"],
  },
  {
    id: "ORD004",
    customerName: "Diana Prince",
    date: "2023-11-18",
    status: "Pending",
    total: 75.0,
    products: ["Product B", "Product C"],
  },
  {
    id: "ORD005",
    customerName: "Ethan Hunt",
    date: "2023-11-19",
    status: "Delivered",
    total: 300.25,
    products: ["Product I", "Product J", "Product K", "Product L", "Product M"],
  },
]
export default function AllOrder() {
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<string>("asc")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const sortedOrders = [...orders]
    .sort((a: any, b: any) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })
    .filter(
      (order) =>
        Object.values(order).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        order.products.some((product) =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleEditOrder = (order: any) => {
    setEditingOrder({ ...order })
    setIsDrawerOpen(true)
  }

  const handleSaveOrder = () => {
    // Here you would typically make an API call to update the order
    console.log("Saving order:", editingOrder)
    setIsDrawerOpen(false)
    setEditingOrder(null)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-yellow-500"
      case "pending":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="pt-0 p-6 w-full min-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="mb-4">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("customerName")}
                >
                  Customer Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("date")}>
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")}>
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("total")}>
                  Total <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(order.status)} text-white`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {order.products.map((product: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
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
                        onClick={() => navigator.clipboard.writeText(order.id)}
                      >
                        Copy order ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                        Edit order
                      </DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Order</DrawerTitle>
            <DrawerDescription>
              Make changes to the order here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          {editingOrder && (
            <div className="p-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input id="orderId" value={editingOrder.id} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={editingOrder.customerName}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingOrder.date}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={editingOrder.status}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        status: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="total">Total</Label>
                  <Input
                    id="total"
                    type="number"
                    value={editingOrder.total}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        total: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="products">Products</Label>
                  <div className="flex flex-wrap gap-2">
                    {editingOrder.products.map(
                      (product: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm"
                        >
                          {product}
                          <button
                            className="ml-1 text-red-500 hover:text-red-700"
                            onClick={() => {
                              const newProducts = [...editingOrder.products]
                              newProducts.splice(index, 1)
                              setEditingOrder({
                                ...editingOrder,
                                products: newProducts,
                              })
                            }}
                          >
                            ×
                          </button>
                        </Badge>
                      )
                    )}
                  </div>
                  <div className="flex mt-2">
                    <Input
                      id="newProduct"
                      placeholder="Add new product"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const newProduct = (
                            e.target as HTMLInputElement
                          ).value.trim()
                          if (newProduct) {
                            if (typeof setEditingOrder === "function") {
                              setEditingOrder({
                                ...editingOrder,
                                products: [
                                  ...editingOrder.products,
                                  newProduct,
                                ],
                              })
                            }
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const input = document.getElementById(
                          "newProduct"
                        ) as HTMLInputElement
                        const newProduct = input.value.trim()
                        if (newProduct) {
                          setEditingOrder({
                            ...editingOrder,
                            products: [...editingOrder.products, newProduct],
                          })
                          input.value = ""
                        }
                      }}
                    >
                      <Package className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DrawerFooter>
            <Button onClick={handleSaveOrder}>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
