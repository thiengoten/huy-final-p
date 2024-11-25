
import { OrderDetailPayload, OrderPayload } from "@/queries/orders/orders.types"
import { supabase } from "@/services"

export const createOrder = async (order: OrderPayload) => {
  return await supabase.from("orders").insert(order).select().single()
}

export const createOrderDetail = async (orderDetail: OrderDetailPayload[]) => {
  return await supabase.from("order_detail").insert(orderDetail)
}
