// Authentication system with backend API integration
const API_URL = 'http://localhost:4000/api/auth';

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  joinedDate: string
}

export class AuthService {
  private static currentUser: User | null = null

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log("[AuthService] Login attempt for:", email)

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante: envía cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.currentUser = data.user;
        // Guardar solo usuario en localStorage (el token está en cookies)
        localStorage.setItem("alimenta_user", JSON.stringify(data.user));
        console.log("[AuthService] Login successful:", data.user.name);
        return { success: true, user: data.user };
      }

      console.log("[AuthService] Login failed:", data.error);
      return { success: false, error: data.error || "Credenciales inválidas" };
    } catch (error) {
      console.error("[AuthService] Login error:", error);
      return { success: false, error: "Error de conexión con el servidor" };
    }
  }

  static async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log("[AuthService] Register attempt for:", email);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante: envía cookies
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.currentUser = data.user;
        // Guardar solo usuario en localStorage (el token está en cookies)
        localStorage.setItem("alimenta_user", JSON.stringify(data.user));
        console.log("[AuthService] Registration successful:", data.user.name);
        return { success: true, user: data.user };
      }

      console.log("[AuthService] Registration failed:", data.error);
      return { success: false, error: data.error || "Error al crear la cuenta" };
    } catch (error) {
      console.error("[AuthService] Registration error:", error);
      return { success: false, error: "Error de conexión con el servidor" };
    }
  }

  static async logout(): Promise<void> {
    // Limpiar estado local PRIMERO
    this.currentUser = null;
    localStorage.removeItem("alimenta_user");
    console.log("[AuthService] User logged out - localStorage cleared");
    
    try {
      // Llamar al backend para eliminar la cookie
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      console.log("[AuthService] Logout request sent to backend");
    } catch (err) {
      console.error("Error en logout:", err);
    }
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      console.log("[AuthService] Returning cached user:", this.currentUser.name)
      return this.currentUser
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("alimenta_user")
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          console.log("[AuthService] User loaded from localStorage:", this.currentUser?.name)
          return this.currentUser
        } catch (error) {
          console.log("[AuthService] Error parsing stored user data:", error)
          localStorage.removeItem("alimenta_user")
        }
      }
    }

    console.log("[AuthService] No user found in storage")
    return null
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}
