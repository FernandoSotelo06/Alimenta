import axios from "axios"

const API_URL = "http://localhost:4000/api"

interface LikeData {
    userId: number;
    recipeId: number;
}

export const setLike = async (data: LikeData): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/likes`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error: any) {
        console.error("Error al setear el like:", error)
        throw new Error(error.response?.data?.message || "No se pudo setear el like")
    }
}