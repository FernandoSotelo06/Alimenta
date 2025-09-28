"use client"

import { useState, useEffect, useCallback } from "react"
import { AuthService, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    // Small delay to ensure localStorage is available
    setTimeout(initializeAuth, 50)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await AuthService.login(email, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await AuthService.register(name, email, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }, [])

  const logout = useCallback(() => {
    AuthService.logout()
    setUser(null)
  }, [])

  const isAuthenticated = !!user && !loading

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  }
}
