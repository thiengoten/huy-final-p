import { supabase  } from "@/services"
import { BASE_URL } from "@/utils"

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password, options: {
    emailRedirectTo: BASE_URL,
  } })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}