import { supabase  } from "@/services"
import { VITE_LOCAL } from "@/utils"

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password, options: {
    emailRedirectTo: VITE_LOCAL,
  } })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}