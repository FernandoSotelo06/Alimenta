"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "./recipe-card"
import { Search, Filter, TrendingUp } from "lucide-react"
import Link from "next/link"

const featuredRecipes = [
  {
    title: "Ensalada de Quinoa con Aguacate",
    description: "Una deliciosa ensalada rica en proteínas y grasas saludables, perfecta para el almuerzo.",
    image: "/quinoa-avocado-salad-healthy-colorful.jpg",
    cookTime: "15 min",
    servings: 2,
    calories: 320,
    difficulty: "Fácil" as const,
    rating: 4.8,
    tags: ["Vegetariano", "Sin Gluten", "Alto en Proteína", "Bajo en Carbohidratos"],
    isLiked: true,
  },
  {
    title: "Salmón al Horno con Vegetales",
    description: "Salmón jugoso acompañado de vegetales de temporada, rico en omega-3 y antioxidantes.",
    image: "/baked-salmon-vegetables-healthy-dinner.jpg",
    cookTime: "25 min",
    servings: 4,
    calories: 420,
    difficulty: "Intermedio" as const,
    rating: 4.9,
    tags: ["Alto en Proteína", "Omega-3", "Bajo en Carbohidratos"],
    isLiked: false,
  },
  {
    title: "Smoothie Verde Energizante",
    description: "Batido nutritivo con espinacas, plátano y semillas de chía para comenzar el día con energía.",
    image: "/green-smoothie-spinach-banana-healthy-drink.jpg",
    cookTime: "5 min",
    servings: 1,
    calories: 180,
    difficulty: "Fácil" as const,
    rating: 4.6,
    tags: ["Vegano", "Detox", "Energizante", "Rico en Fibra"],
    isLiked: true,
  },
  {
    title: "Bowl de Açaí con Granola",
    description: "Desayuno antioxidante con açaí, frutas frescas y granola casera sin azúcar añadido.",
    image: "/acai-bowl-granola-berries-healthy-breakfast.jpg",
    cookTime: "10 min",
    servings: 1,
    calories: 280,
    difficulty: "Fácil" as const,
    rating: 4.7,
    tags: ["Antioxidante", "Sin Azúcar Añadido", "Rico en Fibra"],
    isLiked: false,
  },
  {
    title: "Curry de Lentejas con Coco",
    description: "Plato reconfortante y nutritivo con lentejas, leche de coco y especias aromáticas.",
    image: "/lentil-coconut-curry-healthy-vegetarian.jpg",
    cookTime: "30 min",
    servings: 4,
    calories: 350,
    difficulty: "Intermedio" as const,
    rating: 4.5,
    tags: ["Vegetariano", "Alto en Proteína", "Rico en Fibra", "Especiado"],
    isLiked: true,
  },
  {
    title: "Tacos de Pescado con Salsa Verde",
    description: "Tacos ligeros con pescado blanco y salsa verde casera, perfectos para la cena.",
    image: "/fish-tacos-green-salsa-healthy-mexican.jpg",
    cookTime: "20 min",
    servings: 3,
    calories: 290,
    difficulty: "Intermedio" as const,
    rating: 4.4,
    tags: ["Alto en Proteína", "Bajo en Grasa", "Mexicano"],
    isLiked: false,
  },
]

const categories = ["Todas", "Desayuno", "Almuerzo", "Cena", "Snacks", "Vegetariano", "Vegano", "Sin Gluten"]

export function RecipeGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section id="recetas" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Recetas Destacadas
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Descubre Recetas <span className="text-primary">Saludables</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección de recetas nutritivas con información nutricional detallada y pasos fáciles de
            seguir.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar recetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredRecipes.map((recipe, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <RecipeCard {...recipe} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Link href="/recetas">
            <Button variant="outline" size="lg" className="group bg-transparent">
              <Filter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Ver Más Recetas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
