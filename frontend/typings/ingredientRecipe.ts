export default interface ingredientRecipe {
    receta_ingrediente_id: number
    receta_id: number
    ingrediente_id: number
    cantidad: number
    ingrediente: {
        ingrediente_id: number
        nombre: string
    }
    unidad: string
}