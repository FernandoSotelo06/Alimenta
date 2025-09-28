import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Zap, Shield } from "lucide-react"
import Link from "next/link"

const healthyIngredients = [
  {
    name: "Quinoa",
    description: "Pseudocereal rico en proteínas completas y fibra",
    benefits: ["Alto en proteína", "Sin gluten", "Rico en minerales"],
    icon: Leaf,
    color: "primary",
    image: "/placeholder.svg?key=quinoa",
  },
  {
    name: "Aguacate",
    description: "Fuente de grasas saludables y potasio",
    benefits: ["Grasas monoinsaturadas", "Rico en potasio", "Antioxidantes"],
    icon: Heart,
    color: "accent",
    image: "/placeholder.svg?key=avocado",
  },
  {
    name: "Espinacas",
    description: "Verdura de hoja verde rica en hierro y vitaminas",
    benefits: ["Alto en hierro", "Vitamina K", "Folato"],
    icon: Zap,
    color: "primary",
    image: "/placeholder.svg?key=spinach",
  },
  {
    name: "Salmón",
    description: "Pescado graso rico en omega-3 y proteínas",
    benefits: ["Omega-3", "Proteína completa", "Vitamina D"],
    icon: Shield,
    color: "accent",
    image: "/placeholder.svg?key=salmon",
  },
  {
    name: "Chía",
    description: "Semillas ricas en fibra y ácidos grasos esenciales",
    benefits: ["Rico en fibra", "Omega-3 vegetal", "Calcio"],
    icon: Leaf,
    color: "primary",
    image: "/placeholder.svg?key=chia",
  },
  {
    name: "Arándanos",
    description: "Frutos del bosque con alto contenido antioxidante",
    benefits: ["Antioxidantes", "Vitamina C", "Bajo en calorías"],
    icon: Heart,
    color: "accent",
    image: "/placeholder.svg?key=blueberries",
  },
]

export function IngredientsSection() {
  return (
    <section id="ingredientes" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ingredientes <span className="text-primary">Saludables</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre los superalimentos que transformarán tus recetas en opciones nutritivas y deliciosas
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthyIngredients.map((ingredient, index) => (
            <Card
              key={ingredient.name}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Icon and Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      ingredient.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    <ingredient.icon
                      className={`w-6 h-6 ${ingredient.color === "primary" ? "text-primary" : "text-accent"}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{ingredient.name}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{ingredient.description}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2">
                  {ingredient.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Visual indicator */}
                <div
                  className={`h-1 w-full rounded-full ${
                    ingredient.color === "primary" ? "bg-primary/20" : "bg-accent/20"
                  } group-hover:${ingredient.color === "primary" ? "bg-primary/40" : "bg-accent/40"} transition-colors duration-300`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">¿Quieres aprender más sobre nutrición y alimentación saludable?</p>
          <Link href="/contacto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">
              <Leaf className="w-4 h-4" />
              Consulta con nuestros nutricionistas
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
