import { ProductPayload } from "@/queries/products"
import { supabase } from "@/services"

export const getAllProducts = async () => {
  return await supabase.from("Products").select("*")
}

export const addProduct = async (product: ProductPayload) => {
  return await supabase.from("Products").insert(product).select()
}

export const updateProduct = async (
  productId: string,
  product: ProductPayload
) => {
  return await supabase.from("Products").update(product).eq("id", productId)
}
export const deleteProduct = async (productId: string) => {
  return await supabase.from("Products").delete().eq("id", productId)
}
