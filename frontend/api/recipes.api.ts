import axios from "axios"

const API_URL = "https://alimenta-backend.onrender.com/api"

export const createRecipe = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/recetas`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error: any) {
        console.error("Error al crear la receta:", error)
        throw new Error(error.response?.data?.message || "No se pudo crear la receta")
    }
}

export const getRecipeById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/recetas/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error al obtener la receta:", error);
    throw new Error(error.response?.data?.message || "No se pudo obtener la receta");
  }
};
