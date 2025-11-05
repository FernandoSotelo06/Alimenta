import axios from "axios"

const API_URL = "http://localhost:3001/api"

export interface Category {
  categoria_id: number
  nombre: string
  descripcion: string
  icono: string
  activa: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}/categories`)
    return response.data
  } catch (error: any) {
    console.error("Error al obtener las categorías:", error)
    throw new Error(error.response?.data?.message || "No se pudieron cargar las categorías")
  }
}