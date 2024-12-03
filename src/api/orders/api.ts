import { OrderDetailPayload, OrderPayload } from "@/queries/orders/orders.types"
import { axiosInstance, supabase } from "@/services"

export const createOrder = async (order: OrderPayload) => {
  return await supabase.from("orders").insert(order).select().single()
}

export const createOrderDetail = async (orderDetail: OrderDetailPayload[]) => {
  return await supabase.from("order_detail").insert(orderDetail)
}

export const getOrders = async () => {
  return await supabase.from("orders").select("*")
}

export const getOrderDetailByOrderId = async (orderId: string) => {
  return await supabase
    .from("order_detail")
    .select("id, created_at, product_id(id, title, price, images), quantity")
    .eq("order_id", orderId)
}

export const updateOrder = async (id: string, order: OrderPayload) => {
  return await supabase.from("orders").update(order).eq("id", id)
}

export const deleteOrder = async (id: string) => {
  return await supabase.from("orders").delete().eq("id", id)
}

export const getOrderByUserId = async (userId: string) => {
  return await supabase
    .from("orders")
    .select(
      "id, created_at, order_status, total, order_detail(id, quantity, product_id(id, title, price, images))"
    )
    .eq("user_id", userId)
}

export const updateOrderStatus = async (id: string, status: string) => {
  return await supabase.from("orders").update({ order_status: status }).eq("id", id)
}

export const getOrderById = async (id: string) => {
  return await supabase.from("orders").select("*").eq("id", id).single()
}

export const testApi = async (data: any) => {
  return await axiosInstance.post("/checkout", data)
}
