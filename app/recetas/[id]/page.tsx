"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Heart, Share2, Bookmark, ArrowLeft, Timer, Utensils, CheckCircle2 } from "lucide-react"
import { RecipeService } from "@/lib/recipes"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([])
  const [checkedInstructions, setCheckedInstructions] = useState<boolean[]>([])

  const recipe = RecipeService.getRecipeById(params.id as string)

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Receta no encontrada</h1>
          <Button asChild>
            <Link href="/recetas">Volver a Recetas</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (checkedIngredients.length === 0) {
    setCheckedIngredients(new Array(recipe.ingredients.length).fill(false))
  }
  if (checkedInstructions.length === 0) {
    setCheckedInstructions(new Array(recipe.instructions.length).fill(false))
  }

  const handleLike = () => {
    if (isAuthenticated) {
      setIsLiked(!isLiked)
      toast({
        title: isLiked ? "Removido de favoritos" : "Agregado a favoritos",
        description: isLiked ? "La receta fue removida de tus favoritos" : "La receta fue agregada a tus favoritos",
      })
    } else {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para dar me gusta a las recetas",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    if (isAuthenticated) {
      setIsSaved(!isSaved)
      toast({
        title: isSaved ? "Removido de guardados" : "Guardado",
        description: isSaved ? "La receta fue removida de tus guardados" : "La receta fue guardada para más tarde",
      })
    } else {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para guardar recetas",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Enlace copiado",
        description: "El enlace de la receta fue copiado al portapapeles",
      })
    }
  }

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients]
    newChecked[index] = !newChecked[index]
    setCheckedIngredients(newChecked)
  }

  const toggleInstruction = (index: number) => {
    const newChecked = [...checkedInstructions]
    newChecked[index] = !newChecked[index]
    setCheckedInstructions(newChecked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          {/* Recipe Header */}
          <div className="mb-8">
            <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
              <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant={isLiked ? "default" : "secondary"}
                  size="sm"
                  onClick={handleLike}
                  className="backdrop-blur-sm bg-background/80"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant={isSaved ? "default" : "secondary"}
                  size="sm"
                  onClick={handleSave}
                  className="backdrop-blur-sm bg-background/80"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShare}
                  className="backdrop-blur-sm bg-background/80"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{recipe.category}</Badge>
                  <Badge variant="secondary">{recipe.difficulty}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">{recipe.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{recipe.description}</p>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={recipe.author.avatar || "/placeholder.svg"} alt={recipe.author.name} />
                    <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{recipe.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Publicado el {new Date(recipe.createdAt).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <Timer className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Preparación</p>
                  <p className="font-bold text-lg">{recipe.prepTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Cocción</p>
                  <p className="font-bold text-lg">{recipe.cookTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Porciones</p>
                  <p className="font-bold text-lg">{recipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <Heart className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Me gusta</p>
                  <p className="font-bold text-lg">{recipe.likes + (isLiked ? 1 : 0)}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    Ingredientes
                  </CardTitle>
                  <CardDescription>Para {recipe.servings} porciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <button
                          onClick={() => toggleIngredient(index)}
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                            checkedIngredients[index]
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-muted-foreground hover:border-primary"
                          }`}
                        >
                          {checkedIngredients[index] && <CheckCircle2 className="w-3 h-3" />}
                        </button>
                        <span
                          className={`text-sm ${checkedIngredients[index] ? "line-through text-muted-foreground" : ""}`}
                        >
                          {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Nutrition Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Información Nutricional</CardTitle>
                  <CardDescription>Por porción</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{recipe.nutrition.calories}</div>
                    <div className="text-sm text-muted-foreground">Calorías</div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Proteína</span>
                      <span className="font-medium">{recipe.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Carbohidratos</span>
                      <span className="font-medium">{recipe.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Grasas</span>
                      <span className="font-medium">{recipe.nutrition.fat}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fibra</span>
                      <span className="font-medium">{recipe.nutrition.fiber}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Instrucciones</CardTitle>
                  <CardDescription>Sigue estos pasos para preparar la receta</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                              checkedInstructions[index]
                                ? "bg-green-500 text-white"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {checkedInstructions[index] ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                          </div>
                          <button
                            onClick={() => toggleInstruction(index)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                              checkedInstructions[index]
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-muted-foreground hover:border-green-500"
                            }`}
                          >
                            {checkedInstructions[index] && <CheckCircle2 className="w-3 h-3" />}
                          </button>
                        </div>
                        <p
                          className={`text-sm leading-relaxed pt-1 ${checkedInstructions[index] ? "line-through text-muted-foreground" : ""}`}
                        >
                          {instruction}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
