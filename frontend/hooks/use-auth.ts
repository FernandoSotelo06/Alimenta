"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { AuthService, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const initializeRef = useRef(false)

  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    // Listen for storage changes (when user logs in/out from another tab or page)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (initializeRef.current) return
    initializeRef.current = true

    const initializeAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await AuthService.login(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      window.dispatchEvent(new CustomEvent("authChange", { detail: { user: result.user } }))
    }
    return result
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await AuthService.register(name, email, password)
    if (result.success && result.user) {
      setUser(result.user)
      window.dispatchEvent(new CustomEvent("authChange", { detail: { user: result.user } }))
    }
    return result
  }, [])

  const logout = useCallback(() => {
    AuthService.logout()
    setUser(null)
    window.dispatchEvent(new CustomEvent("authChange", { detail: { user: null } }))
  }, [])

  useEffect(() => {
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setUser(customEvent.detail.user)
    }

    window.addEventListener("authChange", handleAuthChange)
    return () => {
      window.removeEventListener("authChange", handleAuthChange)
    }
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
