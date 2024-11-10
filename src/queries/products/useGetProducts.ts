import { getAllProducts } from '@/api/products'
import { ProductResponse } from '@/queries/products/products.types'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'



export const useGetAllProducts = (
  options?: UseQueryOptions<PostgrestSingleResponse<ProductResponse[]>, Error, ProductResponse[]>
) => {
  const {data: productsData} = useQuery<PostgrestSingleResponse<ProductResponse[]>, Error, ProductResponse[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
    select(data) {
      return data.data || []
    },
    ...options,
  })

  return {
    productsData,
  }
}

