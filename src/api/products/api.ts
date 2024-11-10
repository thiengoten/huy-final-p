import { supabase } from '@/services'
import { QueryData } from '@supabase/supabase-js';

export const getAllProducts = supabase.from('Products').select('*')


export type ProductResponse = QueryData<typeof getAllProducts>;