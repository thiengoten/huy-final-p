import { ProductPayload } from "@/queries/products"
import { supabase } from "@/services"

export const getAllProducts = async () => {
  return await supabase.from("Products").select("*")
}

export const addProduct = async (product: ProductPayload) => {
  return await supabase.from("Products").insert(product).select()
}
