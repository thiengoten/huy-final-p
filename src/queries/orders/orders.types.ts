import { Tables } from "@/types/database.types"

export type OrderResponse = Tables<"orders">
export type OrderDetailResponse = Tables<"order_detail">
export type OrderPayload = Omit<OrderResponse, "id" | "created_at">
export type OrderDetailPayload = Omit<OrderDetailResponse, "id" | "created_at">