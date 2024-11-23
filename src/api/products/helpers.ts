import { Tables } from '@/types/database.types'

//Implement type or interface here: example
export type ProductPayload = Omit<Tables<'Products'>, 'id' | 'created_at'>
