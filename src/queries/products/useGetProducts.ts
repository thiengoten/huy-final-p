import { addProduct, getAllProducts } from "@/api/products"
import { ProductResponse } from "@/queries/products/products.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import {
  DefaultError,
  InvalidateQueryFilters,
  MutationFunction,
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
    PostgrestSingleResponse<ProductResponse>,
    DefaultError,
    ProductResponse
  >
) => {
  const queryClient = useQueryClient()

  const {
    mutate: addNewProduct,
    isPending,
    error,
  } = useMutation<
    PostgrestSingleResponse<ProductResponse>,
    DefaultError,
    ProductResponse
  >({
    mutationFn: addProduct as MutationFunction<
      PostgrestSingleResponse<ProductResponse>,
      ProductResponse
    >,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"] as InvalidateQueryFilters)
    },
    ...options,
  })

  return {
    addNewProduct,
    isPending,
    error,
  }
}
