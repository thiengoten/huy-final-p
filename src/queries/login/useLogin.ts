import { signIn } from "@/api/auths"
import { useMutation, UseMutationOptions,DefaultError } from "@tanstack/react-query"
import { AuthTokenResponsePassword } from '@supabase/supabase-js'
import { LoginPayload } from "@/queries/login/login.types"




export const useLogin = (options?: UseMutationOptions<AuthTokenResponsePassword,DefaultError, LoginPayload>) => {
  const {data: loginData, error, isPending} = useMutation<AuthTokenResponsePassword, DefaultError, LoginPayload>({
    mutationFn: (data: LoginPayload ) => {
      const {email, password} = data
      return signIn(email, password)
    },
    ...options
  })
  return {loginData, error, isPending}
}