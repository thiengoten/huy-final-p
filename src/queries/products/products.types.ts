import { Tables } from "@/types/database.types"

export type ProductResponse = Tables<"Products">

export type ProductPayload = Omit<ProductResponse, "id" | "created_at" >
