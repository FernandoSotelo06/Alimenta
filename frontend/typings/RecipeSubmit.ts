import ingredientRecipe from "./ingredientRecipe";
import Tag from "./tag";

export default interface RecipeSubmit {
    userId: number,
    title: string,
    description?: string,
    difficulty: 'facil' | 'intermedio' | 'dificil',
    prepTime: number,
    servings: number,
    ingredients: ingredientItem[],
    instructions: Record<string, any> | any[],
    tags: string[],
    imagePreview: string | null,
}

export interface ingredientItem {
  ingrediente_id: number;
  cantidad: string;
  unidad: string;
}