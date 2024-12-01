import { ProductPayload } from "@/queries/products"
import { supabase } from "@/services"

export const getAllProducts = async () => {
  return await supabase.from("Products").select("*")
}

export const addProduct = async (product: ProductPayload) => {
  return await supabase.from("Products").insert(product).select()
}

export const getProductById = async (id: string) => {
  return await supabase.from('Products').select('*').eq('id', id).single()
}

export const updateProduct = async (id: string, product: ProductPayload) => {
  return await supabase.from('Products').update(product).eq('id', id)
}

export const deleteProduct = async (id: string) => {
  return await supabase.from('Products').delete().eq('id', id)
}
export const textSearch = async (text: string) => {
  return await supabase.from('Products').select('*').textSearch('title', text)
}