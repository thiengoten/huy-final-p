import { signUp } from "@/api/auths"
import { useMutation, UseMutationOptions,DefaultError } from "@tanstack/react-query"
import { AuthResponse } from '@supabase/supabase-js'
import { SignupPayload } from "@/queries/signup/signup.types"

export const useSignup = (options?: UseMutationOptions<AuthResponse,DefaultError, SignupPayload>) => {
  const {data: loginData, error, isPending, mutate: onSignupUser} = useMutation<AuthResponse, DefaultError, SignupPayload>({
    mutationFn: (data: SignupPayload ) => {
      const {email, password} = data
      return signUp(email, password)
    },
    ...options
  })
  return {loginData, error, isPending, onSignupUser}
}