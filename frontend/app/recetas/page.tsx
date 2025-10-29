"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, Users, Heart, Plus, SlidersHorizontal } from "lucide-react"
import { RecipeService, type Recipe } from "@/lib/recipes"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [sortBy, setSortBy] = useState("recent")
  const { isAuthenticated } = useAuth()

  const recipes = RecipeService.getAllRecipes()
  const categories = ["Todas", ...RecipeService.getCategories()]

  const filteredRecipes = useMemo(() => {
    let filtered = recipes

    if (searchQuery) {
      filtered = RecipeService.searchRecipes(searchQuery)
    }

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory)
    }

    switch (sortBy) {
      case "popular":
        filtered = filtered.sort((a, b) => b.likes - a.likes)
        break
      case "recent":
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "time":
        filtered = filtered.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, recipes])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Recetas Saludables</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre deliciosas recetas nutritivas creadas por nuestra comunidad de amantes de la cocina saludable
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{recipes.length} recetas disponibles</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Comunidad activa</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar recetas, ingredientes..."
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

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count and Active Filters */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredRecipes.length} receta{filteredRecipes.length !== 1 ? "s" : ""} encontrada
              {filteredRecipes.length !== 1 ? "s" : ""}
              {searchQuery && (
                <span className="ml-1">
                  para "<span className="font-medium text-foreground">{searchQuery}</span>"
                </span>
              )}
            </p>
            {(searchQuery || selectedCategory !== "Todas") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Todas")
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No se encontraron recetas</h3>
              <p className="text-muted-foreground mb-4">No hay recetas que coincidan con tu búsqueda actual.</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Limpiar búsqueda
                </Button>
                {isAuthenticated && (
                  <Button asChild>
                    <Link href="/crear-receta">
                      <Plus className="w-4 h-4 mr-2" />
                      Crear primera receta
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
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
