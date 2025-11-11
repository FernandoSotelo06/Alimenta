"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, BookOpen, Calculator, Leaf } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Right Content - Hero Image - appears first on mobile due to grid reordering */}
          <div className="relative animate-scale-in order-first lg:order-last">
            <div className="relative">
              <img
                src="/healthy-colorful-salad-bowl-with-fresh-vegetables-.jpg"
                alt="Plato saludable con vegetales frescos"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-bounce hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">320 kcal</span>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-bounce hidden sm:block"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Rica en fibra</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-last lg:order-first">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                Bienvenido a Alimenta
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
                Descubre el poder de la <span className="text-primary">alimentación saludable</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                Únete a nuestra comunidad y comparte recetas nutritivas con cálculo automático de valores nutricionales.
                Transforma tu alimentación, transforma tu vida.
              </p>
            </div>

            {/* Stats - stacked on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">1,200+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Usuarios activos</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-foreground">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Recetas saludables</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">100%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Cálculo automático</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/recetas" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Explorar Recetas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent w-full sm:w-auto"
                onClick={() => {
                  const element = document.getElementById("como-funciona")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
