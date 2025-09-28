// Simple authentication system with mock data for demonstration
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  joinedDate: string
}

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "María González",
    email: "maria@example.com",
    avatar: "/woman-chef-preparing-food.png",
    bio: "Nutricionista especializada en cocina peruana saludable",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos@example.com",
    avatar: "/man-cooking.png",
    bio: "Chef apasionado por la alimentación consciente",
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Ana Ruiz",
    email: "ana@example.com",
    avatar: "/woman-nutritionist.png",
    bio: "Amante de la cocina vegana y sostenible",
    joinedDate: "2024-03-10",
  },
]

export class AuthService {
  private static currentUser: User | null = null

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log("[v0] AuthService.login called for:", email)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)

    if (user && password === "password123") {
      this.currentUser = user
      localStorage.setItem("alimenta_user", JSON.stringify(user))
      console.log("[v0] Login successful, user stored in localStorage:", user.name)
      return { success: true, user }
    }

    console.log("[v0] Login failed - invalid credentials")
    return { success: false, error: "Credenciales inválidas" }
  }

  static async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      return { success: false, error: "El email ya está registrado" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "/diverse-user-avatars.png",
      bio: "",
      joinedDate: new Date().toISOString().split("T")[0],
    }

    mockUsers.push(newUser)
    this.currentUser = newUser
    localStorage.setItem("alimenta_user", JSON.stringify(newUser))

    return { success: true, user: newUser }
  }

  static logout(): void {
    this.currentUser = null
    localStorage.removeItem("alimenta_user")
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      console.log("[v0] Returning cached user:", this.currentUser.name)
      return this.currentUser
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("alimenta_user")
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          console.log("[v0] User loaded from localStorage:", this.currentUser?.name)
          return this.currentUser
        } catch (error) {
          console.log("[v0] Error parsing stored user data:", error)
          localStorage.removeItem("alimenta_user")
        }
      }
    }

    console.log("[v0] No user found in storage")
    return null
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}
