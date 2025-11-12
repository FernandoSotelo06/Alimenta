"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { AuthService, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const initializeRef = useRef(false)

  // Inicializar autenticación al cargar
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

  const logout = useCallback(async () => {
    console.log("[useAuth] Logout iniciado");
    
    // Llamar al servicio de autenticación para limpiar localStorage y cookie
    await AuthService.logout()
    
    // Actualizar estado inmediatamente
    setUser(null)
    window.dispatchEvent(new CustomEvent("authChange", { detail: { user: null } }))
  }, [])

  useEffect(() => {
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setUser(customEvent.detail.user)
    }

    const handleStorageChange = () => {
      // Recargar usuario desde localStorage cuando cambia
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
    }

    // Escuchar eventos personalizados de autenticación
    window.addEventListener("authChange", handleAuthChange)
    
    // Escuchar cambios en storage (incluye cambios de la misma pestaña)
    window.addEventListener("storage", handleStorageChange)
    
    // Escuchar cambios de visibilidad de la página (cuando vuelves a la pestaña)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentUser = AuthService.getCurrentUser()
        setUser(currentUser)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener("authChange", handleAuthChange)
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
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
