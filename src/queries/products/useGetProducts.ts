import { GetProductsResponse } from '@/queries/products/types'
import { UseQueryOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useGetProducts = (
  options?: UseQueryOptions<AxiosResponse<GetProductsResponse>, Error>
) => {
  console.log('🚀 ~ options:', options)
}
