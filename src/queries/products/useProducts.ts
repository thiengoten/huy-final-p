import { addProduct, getAllProducts } from "@/api/products"
import { ProductPayload, ProductResponse } from "@/queries/products/products.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import {
  DefaultError,
  InvalidateQueryFilters,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

export const useGetAllProducts = (
  options?: UseQueryOptions<
    PostgrestSingleResponse<ProductResponse[]>,
    Error,
    ProductResponse[]
  >
) => {
  const { data: productsData } = useQuery<
    PostgrestSingleResponse<ProductResponse[]>,
    Error,
    ProductResponse[]
  >({
    queryKey: ["products"],
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

export const useAddProduct = (
  options?: UseMutationOptions<
    PostgrestSingleResponse<ProductResponse[]>,
    DefaultError,
    ProductPayload
  >
) => {
  const queryClient = useQueryClient()

  const {
    mutate: onAddNewProduct,
    isPending,
    error,
  } = useMutation<
    PostgrestSingleResponse<ProductResponse[]>,
    DefaultError,
    ProductPayload
  >({
    mutationFn: (data: ProductPayload) => {
      console.log("🚀 ~ data:", data)
      return addProduct(data)
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries(["products"] as InvalidateQueryFilters)
    },
    ...options,
  })

  return {
    onAddNewProduct,
    isPending,
    error,
  }
}
