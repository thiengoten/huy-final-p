import { UseQueryOptions } from '@tanstack/react-query'

export const useGetProducts = (
  options?: UseQueryOptions<any, Error>
) => {
  console.log(options);
}

