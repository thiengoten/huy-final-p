
import { OrderDetailPayload, OrderPayload } from "@/queries/orders/orders.types"
import { supabase } from "@/services"

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
    .select("*")
    .eq("user_id", userId)
}
