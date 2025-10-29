"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Clock, Users, ChefHat } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

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
  const [ingredients, setIngredients] = useState<string[]>([""])
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
    setIngredients([...ingredients, ""])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients]
    updated[index] = value
    setIngredients(updated)
  }

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
    // setLoading(true)

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
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim()),
      tags,
      imagePreview,
    })

    // setLoading(false)
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
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Detalles principales de tu receta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Imagen de la receta</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 border-2 border-dashed border-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Subir imagen</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Formatos: JPG, PNG, WebP. Tamaño máximo: 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título de la receta *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Ensalada de quinoa con aguacate"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Un título atractivo ayuda a que más personas encuentren tu receta
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu receta, sus beneficios y por qué es especial..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Cuenta la historia de tu receta y sus beneficios nutricionales
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoría *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desayunos">Desayunos</SelectItem>
                        <SelectItem value="Ensaladas">Ensaladas</SelectItem>
                        <SelectItem value="Platos Principales">Platos Principales</SelectItem>
                        <SelectItem value="Bebidas">Bebidas</SelectItem>
                        <SelectItem value="Postres">Postres</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dificultad *</Label>
                    <Select value={difficulty} onValueChange={setDifficulty} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Nivel de dificultad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fácil">Fácil</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Difícil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prepTime" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Tiempo de prep (min) *
                    </Label>
                    <Input
                      id="prepTime"
                      type="number"
                      placeholder="15"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cookTime" className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4" />
                      Tiempo de cocción (min)
                    </Label>
                    <Input
                      id="cookTime"
                      type="number"
                      placeholder="20"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Porciones *
                    </Label>
                    <Input
                      id="servings"
                      type="number"
                      placeholder="4"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredientes</CardTitle>
                <CardDescription>Lista todos los ingredientes con cantidades específicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 font-medium mb-1">💡 Consejo</p>
                  <p className="text-sm text-blue-700">
                    Incluye cantidades específicas (ej: "2 tazas de quinoa cocida", "1 aguacate maduro")
                  </p>
                </div>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium text-sm mt-1">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Ej: 2 tazas de quinoa cocida`}
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1"
                    />
                    {ingredients.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeIngredient(index)}>
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

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instrucciones</CardTitle>
                <CardDescription>Pasos detallados y claros para preparar la receta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800 font-medium mb-1">✨ Tip de chef</p>
                  <p className="text-sm text-green-700">
                    Sé específico con tiempos y temperaturas. Incluye consejos útiles para cada paso.
                  </p>
                </div>
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Paso ${index + 1}: Describe claramente qué hacer...`}
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        className="flex-1"
                        rows={3}
                      />
                    </div>
                    {instructions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeInstruction(index)}
                        className="mt-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addInstruction} className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Paso
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Agrega etiquetas para ayudar a otros a encontrar tu receta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: Vegano, Sin Gluten, Proteína"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

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
