// Mock recipe data and types
export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  author: {
    id: string
    name: string
    avatar: string
  }
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "Fácil" | "Intermedio" | "Avanzado"
  category: string
  tags: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  likes: number
  createdAt: string
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Ensalada de Quinoa y Aguacate",
    description:
      "Una ensalada nutritiva y deliciosa, perfecta para el almuerzo. Rica en proteínas y grasas saludables.",
    image: "/quinoa-avocado-salad-healthy-colorful.jpg",
    author: {
      id: "1",
      name: "María González",
      avatar: "/woman-nutritionist.png",
    },
    ingredients: [
      "1 taza de quinoa cocida",
      "2 aguacates maduros",
      "1 taza de tomates cherry",
      "1/2 taza de pepino picado",
      "1/4 taza de cebolla morada",
      "2 cucharadas de aceite de oliva",
      "Jugo de 1 limón",
      "Sal y pimienta al gusto",
      "Cilantro fresco",
    ],
    instructions: [
      "Cocina la quinoa según las instrucciones del paquete y deja enfriar.",
      "Corta los aguacates en cubos medianos.",
      "Corta los tomates cherry por la mitad.",
      "Pica finamente el pepino y la cebolla morada.",
      "En un bowl grande, mezcla la quinoa con todos los vegetales.",
      "Prepara el aderezo mezclando aceite de oliva, jugo de limón, sal y pimienta.",
      "Vierte el aderezo sobre la ensalada y mezcla suavemente.",
      "Decora con cilantro fresco y sirve inmediatamente.",
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Fácil",
    category: "Ensaladas",
    tags: ["Vegetariano", "Sin Gluten", "Proteína Vegetal", "Saludable"],
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 35,
      fat: 18,
      fiber: 12,
    },
    likes: 45,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Salmón al Horno con Verduras",
    description: "Salmón jugoso horneado con una mezcla colorida de verduras de temporada. Alto en omega-3.",
    image: "/baked-salmon-vegetables-healthy-dinner.jpg",
    author: {
      id: "2",
      name: "Carlos Mendoza",
      avatar: "/man-cooking.png",
    },
    ingredients: [
      "4 filetes de salmón",
      "2 zucchinis en rodajas",
      "1 pimiento rojo",
      "1 pimiento amarillo",
      "200g de brócoli",
      "2 cucharadas de aceite de oliva",
      "2 dientes de ajo picados",
      "Jugo de 1 limón",
      "Hierbas frescas (tomillo, romero)",
      "Sal y pimienta",
    ],
    instructions: [
      "Precalienta el horno a 200°C.",
      "Corta todas las verduras en trozos uniformes.",
      "En una bandeja para horno, coloca las verduras y rocía con aceite de oliva.",
      "Sazona las verduras con sal, pimienta y ajo.",
      "Hornea las verduras por 15 minutos.",
      "Sazona los filetes de salmón con sal, pimienta y hierbas.",
      "Agrega el salmón a la bandeja con las verduras.",
      "Hornea por 12-15 minutos más hasta que el salmón esté cocido.",
      "Rocía con jugo de limón antes de servir.",
    ],
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: "Intermedio",
    category: "Platos Principales",
    tags: ["Alto en Proteína", "Omega-3", "Sin Gluten", "Keto"],
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 12,
      fat: 22,
      fiber: 5,
    },
    likes: 67,
    createdAt: "2024-03-12",
  },
  {
    id: "3",
    title: "Smoothie Verde Energizante",
    description: "Batido verde lleno de nutrientes para comenzar el día con energía. Perfecto para el desayuno.",
    image: "/green-smoothie-spinach-banana-healthy-drink.jpg",
    author: {
      id: "3",
      name: "Ana Ruiz",
      avatar: "/woman-chef-preparing-food.png",
    },
    ingredients: [
      "2 tazas de espinacas frescas",
      "1 plátano maduro",
      "1/2 manzana verde",
      "1 cucharada de mantequilla de almendras",
      "1 taza de leche de almendras",
      "1 cucharadita de miel",
      "1/2 cucharadita de jengibre fresco",
      "Hielo al gusto",
    ],
    instructions: [
      "Lava bien las espinacas y retira los tallos gruesos.",
      "Pela y corta el plátano en trozos.",
      "Corta la manzana en trozos, sin pelar.",
      "Agrega todos los ingredientes a la licuadora.",
      "Licúa a alta velocidad por 60-90 segundos.",
      "Si está muy espeso, agrega más leche de almendras.",
      "Prueba y ajusta la dulzura con más miel si es necesario.",
      "Sirve inmediatamente en vasos fríos.",
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Fácil",
    category: "Bebidas",
    tags: ["Vegano", "Sin Gluten", "Detox", "Energizante"],
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 28,
      fat: 8,
      fiber: 6,
    },
    likes: 89,
    createdAt: "2024-03-10",
  },
]

export class RecipeService {
  static getAllRecipes(): Recipe[] {
    return mockRecipes
  }

  static getRecipeById(id: string): Recipe | undefined {
    return mockRecipes.find((recipe) => recipe.id === id)
  }

  static getRecipesByCategory(category: string): Recipe[] {
    return mockRecipes.filter((recipe) => recipe.category === category)
  }

  static searchRecipes(query: string): Recipe[] {
    const lowercaseQuery = query.toLowerCase()
    return mockRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.description.toLowerCase().includes(lowercaseQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(lowercaseQuery)),
    )
  }

  static getCategories(): string[] {
    return [...new Set(mockRecipes.map((recipe) => recipe.category))]
  }
}
