import axios from "axios"
import Ingredient from "@/typings/ingredient"

const API_URL = "http://localhost:4000/api"

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await axios.get<Ingredient[]>(`${API_URL}/ingredientes`)
    return response.data
  } catch (error: any) {
    console.error("Error al obtener los ingredientes:", error)
    throw new Error(error.response?.data?.message || "No se pudieron cargar los ingredientes")
  }
}