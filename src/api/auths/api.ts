import supabaseAdmin, { supabase } from "@/services"
import { VITE_LOCAL } from "@/utils"

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: VITE_LOCAL,
    },
  })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}
export const signInWithProvider = async () => {
  const data = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })
  return data
}
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    localStorage.removeItem("sb-pvjdxfbdmrapnnfsrfyr-auth-token")
    return { success: true }
  } catch (error) {
    console.error("Error during sign-out:", error)
    throw error
  }
}

export const getUser = async () => {
  return await supabaseAdmin.auth.admin.listUsers()
}
