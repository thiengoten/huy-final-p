import { Product } from '@/api/products/helpers'
import axiosInstance from '@/services/axiosConfig'
import { BASE_URL } from '@/utils'

export const getAllProducts = async () => {
  return await axiosInstance.get<Product>(`${BASE_URL}/products`)
}
