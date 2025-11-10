"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Heart, Eye, Users, TrendingUp, Calendar, ChefHat, BookOpen, Settings, Award } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { UsuarioService, type EstadisticasUsuario } from "@/lib/usuario"

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [estadisticas, setEstadisticas] = useState<EstadisticasUsuario | null>(null)
  const [loadingEstadisticas, setLoadingEstadisticas] = useState(true)

  useEffect(() => {
    console.log("[Dashboard] Auth state:", { isAuthenticated, loading, user: user?.name })

    if (!loading && !isAuthenticated) {
      console.log("[Dashboard] Not authenticated, redirecting to login")
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  // Cargar estadísticas del usuario
  useEffect(() => {
    const cargarEstadisticas = async () => {
      if (isAuthenticated && user) {
        setLoadingEstadisticas(true)
        const result = await UsuarioService.getMisEstadisticas()
        if (result.success && result.data) {
          setEstadisticas(result.data)
          console.log("[Dashboard] Estadísticas cargadas:", result.data)
        } else {
          console.error("[Dashboard] Error al cargar estadísticas:", result.error)
        }
        setLoadingEstadisticas(false)
      }
    }

    cargarEstadisticas()
  }, [isAuthenticated, user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  const stats = {
    recipes: estadisticas?.recetas || 0,
    likes: estadisticas?.meGusta || 0,
    views: 1420, // TODO: Agregar endpoint para vistas
    followers: 156, // TODO: Agregar endpoint para seguidores
  }

  const recentRecipes = [
    {
      id: "1",
      title: "Quinoa con Verduras al Vapor",
      image: "/quinoa-avocado-salad-healthy-colorful.jpg",
      likes: 23,
      views: 145,
      date: "2024-03-15",
      status: "Publicada",
    },
    {
      id: "2",
      title: "Smoothie Verde Energizante",
      image: "/green-smoothie-spinach-banana-healthy-drink.jpg",
      likes: 18,
      views: 89,
      date: "2024-03-12",
      status: "Publicada",
    },
    {
      id: "3",
      title: "Ensalada de Lentejas y Aguacate",
      image: "/lentil-coconut-curry-healthy-vegetarian.jpg",
      likes: 31,
      views: 203,
      date: "2024-03-10",
      status: "Borrador",
    },
  ]

  const achievements = [
    { name: "Primera Receta", description: "Publicaste tu primera receta", earned: true },
    { name: "Chef Popular", description: "Obtuviste 100 likes", earned: true },
    { name: "Inspirador", description: "Tus recetas fueron vistas 1000 veces", earned: true },
    { name: "Comunidad", description: "Tienes 100 seguidores", earned: true },
    { name: "Experto", description: "Publica 50 recetas", earned: false },
    { name: "Influencer", description: "Alcanza 1000 seguidores", earned: false },
  ]

  const weeklyGoals = [
    { name: "Publicar 2 recetas nuevas", progress: 50, target: 2, current: 1 },
    { name: "Obtener 50 likes", progress: 80, target: 50, current: 40 },
    { name: "Interactuar con la comunidad", progress: 30, target: 10, current: 3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">¡Hola, {user.name.split(" ")[0]}!</h1>
                  <p className="text-muted-foreground">
                    Tienes {stats.recipes} recetas publicadas y {stats.likes} me gusta totales
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline">
                <Link href="/recetas">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explorar Recetas
                </Link>
              </Button>
              <Button asChild>
                <Link href="/crear-receta">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Receta
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stats.recipes}</p>
                    <p className="text-sm text-muted-foreground">Recetas</p>
                  </div>
                  <ChefHat className="w-8 h-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-500">{stats.likes}</p>
                    <p className="text-sm text-muted-foreground">Me gusta</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-500">{stats.views}</p>
                    <p className="text-sm text-muted-foreground">Vistas</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-500">{stats.followers}</p>
                    <p className="text-sm text-muted-foreground">Seguidores</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="recipes">Mis Recetas</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
              <TabsTrigger value="goals">Objetivos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Actividad Reciente
                    </CardTitle>
                    <CardDescription>Tus últimas interacciones en la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Nueva receta publicada</p>
                        <p className="text-xs text-green-600">Quinoa con Verduras - hace 2 días</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Nuevo
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-800">Nuevo seguidor</p>
                        <p className="text-xs text-blue-600">@carlos_chef te siguió - hace 3 días</p>
                      </div>
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">Receta popular</p>
                        <p className="text-xs text-red-600">Smoothie Verde alcanzó 50 likes - hace 5 días</p>
                      </div>
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                    <CardDescription>Tareas comunes para gestionar tu perfil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <Button asChild className="w-full justify-start h-12">
                        <Link href="/crear-receta">
                          <Plus className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">Crear Nueva Receta</div>
                            <div className="text-xs opacity-70">Comparte tu próxima creación</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start h-12 bg-transparent">
                        <Link href="/perfil">
                          <Settings className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">Editar Perfil</div>
                            <div className="text-xs opacity-70">Actualiza tu información</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start h-12 bg-transparent">
                        <Link href="/recetas">
                          <BookOpen className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">Explorar Recetas</div>
                            <div className="text-xs opacity-70">Descubre nuevas ideas</div>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recipes" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Mis Recetas</CardTitle>
                      <CardDescription>Gestiona todas tus recetas publicadas y borradores</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/crear-receta">
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Receta
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <img
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{recipe.title}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              {recipe.likes} me gusta
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Eye className="w-4 h-4 text-blue-500" />
                              {recipe.views} vistas
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(recipe.date).toLocaleDateString("es-ES")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={recipe.status === "Publicada" ? "default" : "secondary"}>
                            {recipe.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/recetas/${recipe.id}`}>Ver</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Logros Desbloqueados
                  </CardTitle>
                  <CardDescription>Tus logros y progreso en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${
                          achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.earned
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-medium ${
                                achievement.earned ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {achievement.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          {achievement.earned && (
                            <Badge variant="default" className="bg-green-500">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos Semanales</CardTitle>
                  <CardDescription>Metas para esta semana y tu progreso actual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{goal.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{goal.progress}% completado</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
