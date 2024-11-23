import { deleteProduct, getAllProducts, updateProduct, addProduct } from '@/api/products'
import { ProductPayload } from '@/api/products/helpers'
import { ProductResponse } from '@/queries/products/products.types'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
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
  const { data: productsData, isLoading } = useQuery<
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

  const queryClient = useQueryClient();

  const handleInvalidateProducts = (id?: string) => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
    if (id) {
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    }
  }

  return {
    productsData,
    isLoading,
    handleInvalidateProducts,
  }
}

type DeleteProductPayload = {
  id: string
}
export const useDeleteProduct = (options?: UseMutationOptions<PostgrestSingleResponse<null>,Error, DeleteProductPayload>) => {
  const { mutate: onDeleteProduct } = useMutation<PostgrestSingleResponse<null>, Error, DeleteProductPayload>({
    mutationFn: (payload) => deleteProduct(payload.id),
    ...options,
  })

  return {
    onDeleteProduct,
  }
}

type UpdateProductPayload = {
  id: string
  product: ProductPayload
}

export const useUpdateProduct = (options?: UseMutationOptions<PostgrestSingleResponse<null>, Error, UpdateProductPayload>) => {
  const { mutate: onUpdateProduct } = useMutation<PostgrestSingleResponse<null>, Error, { id: string, product: ProductPayload }>({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    ...options,
  })

  return {
    onUpdateProduct,
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
    mutate: onAddNewProduct,
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
    onAddNewProduct,
    isPending,
    error,
  }
}
