import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Heart, Zap, Shield, Apple, Fish, Wheat, Milk } from "lucide-react"

export default function IngredientsPage() {
  const ingredientCategories = [
    {
      icon: Apple,
      title: "Frutas y Verduras",
      color: "text-green-600",
      bgColor: "bg-green-100",
      ingredients: [
        {
          name: "Aguacate",
          image: "/ripe-avocado-halves.png",
          benefits: ["Rico en grasas saludables", "Alto en fibra", "Potasio"],
          nutrition: { calories: 160, protein: 2, carbs: 9, fat: 15 },
        },
        {
          name: "Espinaca",
          image: "/fresh-spinach.png",
          benefits: ["Alto en hierro", "Vitamina K", "Antioxidantes"],
          nutrition: { calories: 23, protein: 3, carbs: 4, fat: 0 },
        },
        {
          name: "Arándanos",
          image: "/blueberries.png",
          benefits: ["Antioxidantes", "Vitamina C", "Fibra"],
          nutrition: { calories: 84, protein: 1, carbs: 21, fat: 0 },
        },
      ],
    },
    {
      icon: Wheat,
      title: "Granos y Cereales",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      ingredients: [
        {
          name: "Quinoa",
          image: "/bowl-of-quinoa.png",
          benefits: ["Proteína completa", "Sin gluten", "Fibra"],
          nutrition: { calories: 222, protein: 8, carbs: 39, fat: 4 },
        },
        {
          name: "Avena",
          image: "/bowl-of-oats.png",
          benefits: ["Beta-glucano", "Fibra soluble", "Proteína"],
          nutrition: { calories: 389, protein: 17, carbs: 66, fat: 7 },
        },
        {
          name: "Arroz Integral",
          image: "/bowl-of-brown-rice.png",
          benefits: ["Fibra", "Vitaminas B", "Magnesio"],
          nutrition: { calories: 216, protein: 5, carbs: 45, fat: 2 },
        },
      ],
    },
    {
      icon: Fish,
      title: "Proteínas",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      ingredients: [
        {
          name: "Salmón",
          image: "/fresh-salmon-fillet.png",
          benefits: ["Omega-3", "Proteína de calidad", "Vitamina D"],
          nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13 },
        },
        {
          name: "Lentejas",
          image: "/lentils-bowl.png",
          benefits: ["Proteína vegetal", "Hierro", "Folato"],
          nutrition: { calories: 230, protein: 18, carbs: 40, fat: 1 },
        },
        {
          name: "Huevos",
          image: "/assorted-eggs.png",
          benefits: ["Proteína completa", "Colina", "Vitamina B12"],
          nutrition: { calories: 155, protein: 13, carbs: 1, fat: 11 },
        },
      ],
    },
    {
      icon: Milk,
      title: "Lácteos y Alternativas",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      ingredients: [
        {
          name: "Yogur Griego",
          image: "/greek-yogurt-bowl.png",
          benefits: ["Probióticos", "Proteína", "Calcio"],
          nutrition: { calories: 100, protein: 17, carbs: 6, fat: 0 },
        },
        {
          name: "Leche de Almendras",
          image: "/almond-milk-pouring.png",
          benefits: ["Baja en calorías", "Vitamina E", "Sin lactosa"],
          nutrition: { calories: 39, protein: 1, carbs: 4, fat: 3 },
        },
        {
          name: "Queso Cottage",
          image: "/cottage-cheese.png",
          benefits: ["Alto en proteína", "Bajo en grasa", "Calcio"],
          nutrition: { calories: 98, protein: 11, carbs: 4, fat: 4 },
        },
      ],
    },
  ]

  const nutritionTips = [
    {
      icon: Heart,
      title: "Salud Cardiovascular",
      tip: "Incluye grasas saludables como aguacate, nueces y pescado graso para mantener un corazón sano.",
    },
    {
      icon: Zap,
      title: "Energía Sostenible",
      tip: "Combina carbohidratos complejos con proteínas para mantener niveles estables de energía.",
    },
    {
      icon: Shield,
      title: "Sistema Inmune",
      tip: "Consume una variedad de frutas y verduras coloridas para obtener antioxidantes y vitaminas.",
    },
    {
      icon: Leaf,
      title: "Digestión Saludable",
      tip: "Incluye alimentos ricos en fibra como legumbres, frutas y verduras para una buena digestión.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Ingredientes Saludables</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre los ingredientes más nutritivos y aprende sobre sus beneficios para crear recetas deliciosas y
              saludables que nutran tu cuerpo y mente.
            </p>
          </div>

          {/* Nutrition Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {nutritionTips.map((tip, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <tip.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ingredient Categories */}
          <div className="space-y-12">
            {ingredientCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.ingredients.map((ingredient, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                          <img
                            src={ingredient.image || "/placeholder.svg"}
                            alt={ingredient.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                            <CardDescription>{ingredient.nutrition.calories} cal por 100g</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Benefits */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Beneficios:</h4>
                          <div className="flex flex-wrap gap-1">
                            {ingredient.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Nutrition */}
                        <div>
                          <h4 className="font-medium text-sm mb-3">Nutrición por 100g:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Proteína</span>
                              <span className="text-xs font-medium">{ingredient.nutrition.protein}g</span>
                            </div>
                            <Progress value={(ingredient.nutrition.protein / 30) * 100} className="h-1" />

                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Carbohidratos</span>
                              <span className="text-xs font-medium">{ingredient.nutrition.carbs}g</span>
                            </div>
                            <Progress value={(ingredient.nutrition.carbs / 50) * 100} className="h-1" />

                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Grasas</span>
                              <span className="text-xs font-medium">{ingredient.nutrition.fat}g</span>
                            </div>
                            <Progress value={(ingredient.nutrition.fat / 20) * 100} className="h-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardContent className="py-12 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Quieres aprender más sobre nutrición?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Únete a nuestra comunidad y descubre cómo incorporar estos ingredientes saludables en deliciosas recetas
                que transformarán tu alimentación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  🥗 500+ Recetas Saludables
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  📊 Cálculo Nutricional Automático
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  👥 Comunidad Activa
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
