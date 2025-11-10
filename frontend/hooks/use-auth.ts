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
      // Redirigir al dashboard después del login
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
    }
    return result
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await AuthService.register(name, email, password)
    if (result.success && result.user) {
      setUser(result.user)
      // Redirigir al dashboard después del registro
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
    }
    return result
  }, [])

  const logout = useCallback(async () => {
    console.log("[useAuth] Logout iniciado");
    // Actualizar estado inmediatamente
    setUser(null)
    console.log("[useAuth] Estado user actualizado a null");
    // Limpiar localStorage y llamar al backend
    await AuthService.logout()
    console.log("[useAuth] AuthService.logout completado");
    // Forzar recarga completa de la página
    if (typeof window !== 'undefined') {
      console.log("[useAuth] Recargando página...");
      window.location.href = '/'
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
