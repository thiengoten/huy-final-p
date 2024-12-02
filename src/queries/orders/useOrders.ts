
import { createOrder, createOrderDetail, getOrderById, getOrderByUserId, getOrderDetailByOrderId, getOrders, updateOrderStatus } from "@/api/orders"
import { OrderDetailPayload, OrderPayload, OrderResponse } from "@/queries/orders/orders.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { DefaultError, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"


export const useCreateOrder = (options?: UseMutationOptions<PostgrestSingleResponse<OrderResponse>, DefaultError, OrderPayload>) => {
  const { mutateAsync: onAddNewOrder } = useMutation({
    mutationFn: (payload) => createOrder(payload),
    ...options,
  })

  return {
    onAddNewOrder,

  }
}

export const useCreateOrderDetail = (options?: UseMutationOptions<PostgrestSingleResponse<null>, DefaultError, OrderDetailPayload[]>) => {
  const { mutateAsync: onAddNewOrderDetail } = useMutation({
    mutationFn: (payload) => createOrderDetail(payload),
    ...options,
  })

  return {
    onAddNewOrderDetail,
  }
}

export const useGetOrders = (options?: UseQueryOptions<PostgrestSingleResponse<OrderResponse[]>, DefaultError>) => {
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders() as any,
    ...options,
  })

  return {
    orderData,
    isLoading,
    isError,
  }
}

export const useGetOrderByUserId = (userId: string, options?: UseQueryOptions<PostgrestSingleResponse<OrderResponse[]>, DefaultError>) => {
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrderByUserId(userId) as any,
    ...options,
  })

  return {
    orderData,
    isLoading,
    isError,
  }
}

export const useGetOrderDetailByOrderId = (orderId: string, options?: UseQueryOptions<PostgrestSingleResponse<OrderDetailPayload[]>, DefaultError>) => {
  const { data: orderDetailData, isLoading, isError } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderDetailByOrderId(orderId) as any,
    ...options,
  })

  return {
    orderDetailData,
    isLoading,
    isError,
  }
}
  
export const useGetOrderById = (id: string, options?: UseQueryOptions<PostgrestSingleResponse<OrderResponse>, DefaultError>) => {
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id) as any,
    ...options,
    select: (data) => data.data,
  })

  return {
    orderData,
    isLoading,
    isError,
  }
}
export const useUpdateOrderStatus = (options?: UseMutationOptions<PostgrestSingleResponse<null>, DefaultError, { id: string; status: string }>) => {
  const { mutate: onUpdateOrderStatus } = useMutation({
    mutationFn: (payload) => updateOrderStatus(payload.id, payload.status),
    ...options,
  })

  const queryClient = useQueryClient()

  const handleInvalidateOrders = (id?: string) => {
    queryClient.invalidateQueries({ queryKey: ["orders"] })
    if (id) {
      queryClient.invalidateQueries({ queryKey: ["order", id] })
    }
  }

  return {
    onUpdateOrderStatus,
    handleInvalidateOrders,
  }
}
