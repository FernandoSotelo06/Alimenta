// IngredientsPage.jsx
// (CÓDIGO COMPLETO, LIMPIO Y SIN SECCIÓN "DESTACADOS")

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
// Importamos 'LucideIcon' para definir el tipo
import { Leaf, Heart, Zap, Shield, Apple, Fish, Wheat, Milk, Star, type LucideIcon } from "lucide-react"

// --- Conexión a la API ---
const API_URL = "http://localhost:3001/api";

// --- Tipos de datos de la API ---
interface ApiIngrediente {
  ingrediente_id: number;
  nombre: string;
  imagen: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface ApiCategoria {
  categoria_id: number;
  nombre: string;
  // Los ingredientes ya vienen ordenados desde el backend
  ingredientes: ApiIngrediente[]; 
}

// --- Mapeo de Iconos (CON TIPOS CORRECTOS) ---
const categoryIcons: { [key: string]: LucideIcon } = {
  "Frutas y Verduras": Apple,
  "Granos y Cereales": Wheat,
  "Proteínas": Fish,
  "Lácteos y Alternativas": Milk,
  // (Añade más mapeos si tus categorías de BD tienen otros nombres)
};

const categoryColors: { [key: string]: { color: string, bgColor: string } } = {
  "Frutas y Verduras": { color: "text-green-600", bgColor: "bg-green-100" },
  "Granos y Cereales": { color: "text-amber-600", bgColor: "bg-amber-100" },
  "Proteínas": { color: "text-blue-600", bgColor: "bg-blue-100" },
  "Lácteos y Alternativas": { color: "text-purple-600", bgColor: "bg-purple-100" },
};


export default function IngredientsPage() {
  
  // --- Estados para los datos de la API ---
  const [ingredientCategories, setIngredientCategories] = useState<ApiCategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Tus Tips (los dejamos estáticos) ---
  const nutritionTips = [
    { icon: Heart, title: "Salud Cardiovascular", tip: "Incluye grasas saludables como aguacate, nueces y pescado graso." },
    { icon: Zap, title: "Energía Sostenible", tip: "Combina carbohidratos complejos con proteínas para energía estable." },
    { icon: Shield, title: "Sistema Inmune", tip: "Consume una variedad de frutas y verduras coloridas para antioxidantes." },
    { icon: Leaf, title: "Digestión Saludable", tip: "Incluye alimentos ricos en fibra como legumbres, frutas y verduras." },
  ];

  // --- EFECTO: Cargar los datos agrupados ---
  useEffect(() => {
    const fetchGroupedData = async () => {
      setIsLoading(true);
      try {
        // 1. Carga los ingredientes agrupados por categoría
        // (El backend ya los manda ordenados por popularidad)
        const res = await fetch(`${API_URL}/ingredientes/agrupados-por-categoria`);
        if (!res.ok) throw new Error('Error al cargar categorías');
        const data = await res.json();
        setIngredientCategories(data);

      } catch (error) {
        console.error("Error cargando datos de ingredientes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGroupedData();
  }, []); // El array vacío [] significa "ejecutar solo 1 vez"


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Ingredientes Saludables</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre los ingredientes más nutritivos y aprende sobre sus beneficios para crear recetas deliciosas.
            </p>
          </div>
          
          {/* Nutrition Tips (sin cambios) */}
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

          {/* Ingredient Categories (Conectado a la API) */}
          {/* Esta es la sección principal que querías */}
          <div className="space-y-12">
            {isLoading ? (
              <p className="text-center">Cargando categorías de ingredientes...</p>
            ) : (
              ingredientCategories.map((category) => {
                
                // Asignamos icono y color
                const Icon = categoryIcons[category.nombre] || Leaf; 
                const colors = categoryColors[category.nombre] || { color: 'text-gray-600', bgColor: 'bg-gray-100' };

                return (
                  <div key={category.categoria_id}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`w-10 h-10 ${colors.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{category.nombre}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Los ingredientes aquí ya vienen ordenados por popularidad desde el backend */}
                      {category.ingredientes.map((ingredient) => (
                        <Card key={ingredient.ingrediente_id} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-4">
                              <img
                                src={ingredient.imagen || "/placeholder.svg"}
                                alt={ingredient.nombre}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <CardTitle className="text-lg">{ingredient.nombre}</CardTitle>
                                <CardDescription>{ingredient.calorias || 0} cal por 100g</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Benefits (Simulado) */}
                            <div>
                              <h4 className="font-medium text-sm mb-2">Beneficios:</h4>
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="outline" className="text-xs">
                                  Nutritivo
                                </Badge>
                              </div>
                            </div>

                            {/* Nutrition (Traducido de la API) */}
                            <div>
                              <h4 className="font-medium text-sm mb-3">Nutrición por 100g:</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-muted-foreground">Proteína</span>
                                  <span className="text-xs font-medium">{ingredient.proteinas || 0}g</span>
                                </div>
                                <Progress value={((ingredient.proteinas || 0) / 30) * 100} className="h-1" />

                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-muted-foreground">Carbohidratos</span>
                                  <span className="text-xs font-medium">{ingredient.carbohidratos || 0}g</span>
                                </div>
                                <Progress value={((ingredient.carbohidratos || 0) / 50) * 100} className="h-1" />

                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-muted-foreground">Grasas</span>
                                  <span className="text-xs font-medium">{ingredient.grasas || 0}g</span>
                                </div>
                                <Progress value={((ingredient.grasas || 0) / 20) * 100} className="h-1" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Call to Action (sin cambios) */}
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