// RecipesPage.jsx
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, Users, Heart, Plus, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const API_URL = "https://alimenta-backend.onrender.com/api"

interface ApiEtiqueta {
  etiqueta_id: number
  nombre: string
}

interface ApiReceta {
  receta_id: number
  titulo: string
  descripcion: string
  imagen_principal: string
  tiempo_preparacion: number
  porciones: number
  dificultad: "fácil" | "intermedio" | "difícil"
  calificacion_promedio: number
  etiquetas: ApiEtiqueta[]
  likes: number
  usuario: {
    nombre: string
    avatar: string
  }
  fecha_creacion: string
}

interface Recipe {
  id: number
  title: string
  description: string
  image: string
  difficulty: string
  category: string
  author: {
    name: string
    avatar: string
  }
  createdAt: string
  prepTime: number
  cookTime: number
  servings: number
  likes: number
  tags: string[]
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<ApiReceta[]>([])
  const [categories, setCategories] = useState<ApiEtiqueta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("recent")
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/etiquetas`)
        if (!res.ok) throw new Error('Error al cargar etiquetas')
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Error cargando categorías:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        
        if (searchQuery) params.append("titulo", searchQuery)
        if (selectedCategory) params.append("etiquetaId", String(selectedCategory))
        params.append("sortBy", sortBy)

        const res = await fetch(`${API_URL}/recetas?${params.toString()}`)
        if (!res.ok) throw new Error('Error al cargar recetas')
        
        const data = await res.json()
        setRecipes(data)
      } catch (error) {
        console.error("Error cargando recetas:", error)
        setRecipes([])
      } finally {
        setIsLoading(false)
      }
    }
    
    const timerId = setTimeout(() => {
      fetchRecipes()
    }, 300)

    return () => clearTimeout(timerId)
  }, [searchQuery, selectedCategory, sortBy])

  const handleCategoryClick = (etiquetaId: number | null) => {
    setSelectedCategory(selectedCategory === etiquetaId ? null : etiquetaId)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSortBy("recent")
  }

  const formatRecipe = (recipe: ApiReceta): Recipe => ({
    id: recipe.receta_id,
    title: recipe.titulo,
    description: recipe.descripcion,
    image: recipe.imagen_principal || "/placeholder.svg",
    difficulty: recipe.dificultad.charAt(0).toUpperCase() + recipe.dificultad.slice(1),
    category: recipe.etiquetas[0]?.nombre || "General",
    author: {
      name: recipe.usuario?.nombre || "Anónimo",
      avatar: recipe.usuario?.avatar || "/placeholder.svg"
    },
    createdAt: recipe.fecha_creacion,
    prepTime: 0,
    cookTime: recipe.tiempo_preparacion,
    servings: recipe.porciones,
    likes: recipe.likes,
    tags: recipe.etiquetas.map(e => e.nombre)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Recetas Saludables</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre deliciosas recetas nutritivas creadas por nuestra comunidad
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar recetas por título..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[140px] bg-transparent">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Ordenar por
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>Más recientes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>Más populares</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("time")}>Tiempo de preparación</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated && (
                <Button asChild>
                  <Link href="/crear-receta">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Receta
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(null)}
              >
                Todas
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.etiqueta_id}
                  variant={selectedCategory === category.etiqueta_id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category.etiqueta_id)}
                >
                  {category.nombre}
                </Button>
              ))}
            </div>

            {(searchQuery || selectedCategory) && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {recipes.length} receta{recipes.length !== 1 ? 's' : ''} encontrada{recipes.length !== 1 ? 's' : ''}
                </p>
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="col-span-3 text-center text-muted-foreground">Cargando recetas...</p>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.receta_id} recipe={formatRecipe(recipe)} />
              ))
            ) : (
              <div className="text-center py-12 col-span-3">
                <p>No se encontraron recetas con esos filtros.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
            {recipe.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={recipe.author.avatar || "/placeholder.svg"} alt={recipe.author.name} />
            <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{recipe.author.name}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            {new Date(recipe.createdAt).toLocaleDateString("es-ES")}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight">
          <Link href={`/recetas/${recipe.id}`} className="hover:text-primary transition-colors">
            {recipe.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} porciones</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{recipe.likes}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}