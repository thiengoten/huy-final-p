import { getUser } from "@/api/auths"
import { DefaultError, useQuery, UseQueryOptions } from "@tanstack/react-query"


export const useGetUsers = (options?: UseQueryOptions<any, DefaultError, any>) => {
  const { data: userData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUser(),
    select: (data) => data.data.users,
    ...options,
  })

  return {
    userData,
    isLoadingUsers,
  }
}
