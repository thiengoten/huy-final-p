// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react"

import { User } from "@supabase/supabase-js"
import { supabase } from "@/services"

const AuthContext = createContext<{
  user: User | null
  isLoading: boolean
  isNewLogin: boolean
}>({
  user: null,
  isLoading: true,
  isNewLogin: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewLogin, setIsNewLogin] = useState(false)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🚀 ~ useEffect ~ event:", event)
      if (event === "SIGNED_IN") {
        setIsNewLogin(true)
      }

      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isNewLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
