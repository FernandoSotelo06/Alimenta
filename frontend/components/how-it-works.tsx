import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calculator, Share2, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Crea tu Receta",
    description: "Comparte tus ingredientes, pasos de preparación y una foto apetitosa de tu creación culinaria.",
    features: ["Lista de ingredientes", "Pasos detallados", "Foto de la receta", "Tiempo de preparación"],
    color: "primary",
  },
  {
    number: "02",
    icon: Calculator,
    title: "Cálculo Automático",
    description:
      "Nuestro sistema calcula automáticamente los valores nutricionales basados en los ingredientes que agregaste.",
    features: ["Calorías por porción", "Macronutrientes", "Vitaminas y minerales", "Información dietética"],
    color: "accent",
  },
  {
    number: "03",
    icon: Share2,
    title: "Comparte y Conecta",
    description:
      "Publica tu receta en la comunidad y descubre creaciones de otros usuarios apasionados por la alimentación saludable.",
    features: ["Comunidad activa", "Comentarios y valoraciones", "Favoritos personales", "Seguir usuarios"],
    color: "primary",
  },
]

const benefits = [
  "Cálculo nutricional preciso y automático",
  "Comunidad de usuarios comprometidos con la salud",
  "Recetas verificadas por nutricionistas",
  "Interfaz intuitiva y fácil de usar",
  "Filtros avanzados por tipo de dieta",
  "Planificación de menús semanales",
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            ¿Cómo Funciona <span className="text-primary">Alimenta</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres simples pasos para transformar tu forma de cocinar y compartir recetas saludables
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-full w-px h-12 bg-border transform -translate-x-1/2 mt-8" />
              )}

              <div
                className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                      }`}
                    >
                      <step.icon className={`w-6 h-6 ${step.color === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">Paso {step.number}</div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{step.description}</p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {step.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={`w-full ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div
                        className={`h-48 sm:h-64 flex items-center justify-center ${
                          step.color === "primary"
                            ? "bg-gradient-to-br from-primary/10 to-primary/5"
                            : "bg-gradient-to-br from-accent/10 to-accent/5"
                        }`}
                      >
                        <step.icon
                          className={`w-16 sm:w-20 h-16 sm:h-20 ${
                            step.color === "primary" ? "text-primary" : "text-accent"
                          } opacity-80`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-muted/50 rounded-2xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                ¿Por qué elegir <span className="text-primary">Alimenta</span>?
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Más que una plataforma de recetas, somos una comunidad comprometida con promover hábitos alimenticios
                saludables y sostenibles.
              </p>

              <div className="grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href="/registro" className="inline-block">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Comenzar Ahora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <Card className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-xs sm:text-sm font-medium">Proteínas</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">25g</div>
                  </Card>

                  <Card className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-xs sm:text-sm font-medium">Fibra</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-accent">8g</div>
                  </Card>
                </div>

                <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-8">
                  <Card className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-medium">Usuarios</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">1.2k</div>
                  </Card>

                  <Card className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-xs sm:text-sm font-medium">Calorías</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">320</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
