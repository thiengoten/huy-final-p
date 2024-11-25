
import { createOrder, createOrderDetail } from "@/api/orders"
import { OrderDetailPayload, OrderPayload, OrderResponse } from "@/queries/orders/orders.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query"


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


