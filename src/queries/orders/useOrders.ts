
import { createOrder, createOrderDetail, getOrderByUserId, getOrderDetailByOrderId, getOrders } from "@/api/orders"
import { OrderDetailPayload, OrderPayload, OrderResponse } from "@/queries/orders/orders.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { DefaultError, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"


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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    ...options,
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export const useGetOrderByUserId = (userId: string, options?: UseQueryOptions<PostgrestSingleResponse<OrderResponse[]>, DefaultError>) => {
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrderByUserId(userId),
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
  