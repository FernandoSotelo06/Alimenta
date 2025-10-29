import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Heart, Star } from "lucide-react"

interface RecipeCardProps {
  title: string
  description: string
  image: string
  cookTime: string
  servings: number
  calories: number
  difficulty: "Fácil" | "Intermedio" | "Avanzado"
  rating: number
  tags: string[]
  isLiked?: boolean
}

export function RecipeCard({
  title,
  description,
  image,
  cookTime,
  servings,
  calories,
  difficulty,
  rating,
  tags,
  isLiked = false,
}: RecipeCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Fácil":
        return "bg-primary/10 text-primary"
      case "Intermedio":
        return "bg-accent/10 text-accent"
      case "Avanzado":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            Ver Receta
          </Button>
        </div>

        {/* Like button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>

        {/* Difficulty badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>

        {/* Recipe stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cookTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{servings} porciones</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-medium text-primary">{calories} kcal</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({rating})</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
