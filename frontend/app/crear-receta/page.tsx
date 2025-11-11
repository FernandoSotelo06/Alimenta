"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const INGREDIENT_OPTIONS = [
  "Aguacate",
  "Ajo",
  "Almendras",
  "Arroz integral",
  "Avena",
  "Banana",
  "Berenjenas",
  "Brocoli",
  "Camote",
  "Carne de res",
  "Cebolla",
  "Champiñones",
  "Chiles",
  "Cilantro",
  "Coliflor",
  "Crema de cacahuate",
  "Curcuma",
  "Dátiles",
  "Espagueti integral",
  "Espinaca",
  "Fresas",
  "Garbanzos",
  "Germen de trigo",
  "Girasol",
  "Gotas de chocolate negro",
  "Granos de café",
  "Granola",
  "Guisantes",
  "Harina de almendras",
  "Harina de avena",
  "Harina integral",
  "Huevo",
  "Jícama",
  "Jugo de limón",
  "Jugo de naranja",
  "Kale",
  "Lentejas",
  "Levadura nutricional",
  "Lima",
  "Limón",
  "Linaza",
  "Macarela",
  "Maíz",
  "Manzana",
  "Miel",
  "Mijo",
  "Naranja",
  "Nueces",
  "Aceite de coco",
  "Aceite de oliva",
  "Okra",
  "Orégano",
  "Papa",
  "Papaya",
  "Pargo",
  "Pasas",
  "Pasta integral",
  "Pate de hígado",
  "Pavo",
  "Perejil",
  "Pera",
  "Pescado blanco",
  "Pimienta",
  "Piña",
  "Piñones",
  "Pistachos",
  "Plátano",
  "Pollo",
  "Polvo de té matcha",
  "Pomelo",
  "Poro",
  "Portobello",
  "Probióticos",
  "Queso",
  "Queso de cabra",
  "Quinoa",
  "Rábanos",
  "Raíces de jengibre",
  "Remolacha",
  "Repollo",
  "Romero",
  "Sal del Himalaya",
  "Salmón",
  "Salsa de soja baja en sodio",
  "Salvia",
  "Sandía",
  "Sardinas",
  "Semillas de calabaza",
  "Semillas de chía",
  "Semillas de cilantro",
  "Semillas de comino",
  "Semillas de amapola",
  "Semillas de sésamo",
  "Semillas de zanahorias",
  "Setas shiitake",
  "Siete especias",
  "Soja",
  "Sopa miso",
  "Sorgo",
  "Té verde",
  "Tomate",
  "Tomate deshidratado",
  "Tomate seco",
  "Tomillo",
  "Toranja",
  "Tortillas",
  "Trigo sarraceno",
  "Trigo",
  "Trucha",
  "Turmeric",
  "Uvas",
  "Vainilla",
  "Vegetales mixtos congelados",
  "Verdolaga",
  "Verduras",
  "Verduras de hoja oscura",
  "Verduras de raíz",
  "Vermouth",
  "Vinagre balsámico",
  "Vinagre de manzana",
  "Vinagre de vino tinto",
  "Vino blanco",
  "Vino rojo",
  "Yogur",
  "Yuca",
  "Zanahoria",
  "Zarzamora",
  "Zucchini",
]

const UNIT_OPTIONS = [
  "g (gramos)",
  "kg (kilogramos)",
  "ml (mililitros)",
  "l (litros)",
  "taza",
  "tazas",
  "cucharada",
  "cucharadas",
  "cucharadita",
  "cucharaditas",
  "trocito",
  "trozo",
  "trozos",
  "pieza",
  "piezas",
  "unidad",
  "unidades",
  "puñado",
  "puñados",
  "rama",
  "ramas",
  "filete",
  "filetes",
  "pizca",
  "pizas",
  "mano",
  "manos",
]

interface Ingredient {
  id: string
  amount: string
  unit: string
  name: string
}

export default function CreateRecipePage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [servings, setServings] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: "1", amount: "", unit: "", name: "" }])
  const [instructions, setInstructions] = useState<string[]>([""])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    console.log("[v0] Create recipe auth check:", { isAuthenticated, loading })

    if (!loading && !isAuthenticated) {
      console.log("[v0] Redirecting to login - user not authenticated")
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  const addIngredient = () => {
    const newId = String(Math.max(...ingredients.map((i) => Number.parseInt(i.id) || 0), 0) + 1)
    setIngredients([...ingredients, { id: newId, amount: "", unit: "", name: "" }])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id))
  }

  const updateIngredient = (id: string, field: "amount" | "unit" | "name", value: string) => {
    setIngredients(ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  // ... existing code for instructions, tags, etc ...

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions]
    updated[index] = value
    setInstructions(updated)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Recipe created:", {
      title,
      description,
      category,
      difficulty,
      prepTime: Number.parseInt(prepTime),
      cookTime: Number.parseInt(cookTime),
      servings: Number.parseInt(servings),
      ingredients: ingredients.filter((i) => i.amount && i.unit && i.name),
      instructions: instructions.filter((i) => i.trim()),
      tags,
      imagePreview,
    })

    router.push("/recetas")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirigiendo al login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Crear Nueva Receta</h1>
            <p className="text-muted-foreground mb-4">Comparte tu receta saludable con la comunidad</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Información básica</span>
              </div>
              <div className="w-4 h-px bg-muted"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>Ingredientes</span>
              </div>
              <div className="w-4 h-px bg-muted"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>Instrucciones</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ... existing code for Basic Information ... */}

            {/* Ingredients - IMPROVED */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredientes</CardTitle>
                <CardDescription>Lista todos los ingredientes con cantidades específicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 font-medium mb-1">💡 Consejo</p>
                  <p className="text-sm text-blue-700">
                    Especifica la cantidad, unidad y nombre del ingrediente. Ej: 2 tazas de quinoa cocida
                  </p>
                </div>

                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium text-sm mt-1">
                      {index + 1}
                    </div>

                    {/* Cantidad */}
                    <div className="flex-1">
                      <Input
                        placeholder="Cantidad (ej: 2, 1/2)"
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(ingredient.id, "amount", e.target.value)}
                        className="flex-1"
                      />
                    </div>

                    {/* Unidad */}
                    <div className="flex-1">
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => updateIngredient(ingredient.id, "unit", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_OPTIONS.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ingrediente */}
                    <div className="flex-1">
                      <Select
                        value={ingredient.name}
                        onValueChange={(value) => updateIngredient(ingredient.id, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Ingrediente" />
                        </SelectTrigger>
                        <SelectContent>
                          {INGREDIENT_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {ingredients.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeIngredient(ingredient.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addIngredient} className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ingrediente
                </Button>
              </CardContent>
            </Card>

            {/* ... existing code for Instructions, Tags, and Submit ... */}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="button" variant="outline">
                Guardar Borrador
              </Button>
              <Button type="submit" disabled={loading} className="min-w-[140px]">
                {loading ? "Publicando..." : "Publicar Receta"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
