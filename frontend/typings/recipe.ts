import ingredientRecipe from "./ingredientRecipe"
import Tag from "./tag"

export default interface Recipe {
    receta_id: number
    usuario_id: number
    titulo: string
    descripcion: string
    instrucciones: string[]
    tiempo_preparacion: number
    porciones: number
    dificultad: 'facil' | 'intermedio' | 'dificil'
    imagen_principal: string
    activa: boolean
    fecha_creacion: string
    fecha_actualizacion: string
    total_calorias: number
    total_proteinas: number
    total_carbohidratos: number
    total_grasas: number
    total_fibra: number
    calificacion_promedio: number
    usuario: userRecipe
    receta_ingredientes: ingredientRecipe[]
    etiquetas: Tag[]
}

interface userRecipe {
    usuario_id: number
    nombre: string
    avatar: string
}