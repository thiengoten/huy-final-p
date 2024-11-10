import { supabase } from '@/services'

export const getAllProducts = async () => {
  return await supabase.from('Products').select('*')
}
