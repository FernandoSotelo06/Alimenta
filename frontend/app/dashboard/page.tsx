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
import { LogrosService, type LogrosResponse } from "@/lib/logros"
import { RecetaService, type MiReceta } from "@/lib/recipes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [estadisticas, setEstadisticas] = useState<EstadisticasUsuario | null>(null)
  const [loadingEstadisticas, setLoadingEstadisticas] = useState(true)
  const [logros, setLogros] = useState<LogrosResponse | null>(null)
  const [loadingLogros, setLoadingLogros] = useState(true)
  const [recetas, setRecetas] = useState<MiReceta[]>([])
  const [loadingRecetas, setLoadingRecetas] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState<"todas" | "publicadas" | "borradores">("todas")
  const [recetaAEliminar, setRecetaAEliminar] = useState<number | null>(null)

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

  // Cargar logros del usuario
  useEffect(() => {
    const cargarLogros = async () => {
      if (isAuthenticated && user) {
        setLoadingLogros(true)
        const result = await LogrosService.getMisLogros()
        if (result.success && result.data) {
          setLogros(result.data)
          console.log("[Dashboard] Logros cargados:", result.data)
        } else {
          console.error("[Dashboard] Error al cargar logros:", result.error)
        }
        setLoadingLogros(false)
      }
    }

    cargarLogros()
  }, [isAuthenticated, user])

  // Cargar recetas del usuario
  useEffect(() => {
    const cargarRecetas = async () => {
      if (isAuthenticated && user) {
        setLoadingRecetas(true)
        const estado = filtroEstado === "todas" ? undefined : filtroEstado
        const result = await RecetaService.getMisRecetas(estado)
        if (result.success && result.data) {
          setRecetas(result.data)
          console.log("[Dashboard] Recetas cargadas:", result.data)
        } else {
          console.error("[Dashboard] Error al cargar recetas:", result.error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudieron cargar tus recetas",
          })
        }
        setLoadingRecetas(false)
      }
    }

    cargarRecetas()
  }, [isAuthenticated, user, filtroEstado, toast])

  const handleCambiarEstado = async (recetaId: number, activa: boolean) => {
    const result = await RecetaService.cambiarEstado(recetaId, activa)
    if (result.success) {
      // Actualizar estado local
      setRecetas((prev) =>
        prev.map((r) => (r.id === recetaId ? { ...r, estado: activa ? "publicada" : "borrador" } : r))
      )
      toast({
        title: "Estado actualizado",
        description: `Receta ${activa ? "publicada" : "guardada como borrador"} exitosamente`,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo actualizar el estado",
      })
    }
  }

  const handleEliminarReceta = async () => {
    if (!recetaAEliminar) return

    const result = await RecetaService.eliminarReceta(recetaAEliminar)
    if (result.success) {
      setRecetas((prev) => prev.filter((r) => r.id !== recetaAEliminar))
      toast({
        title: "Receta eliminada",
        description: "La receta ha sido eliminada exitosamente",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo eliminar la receta",
      })
    }
    setRecetaAEliminar(null)
  }

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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
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
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="recipes">Mis Recetas</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
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
                  {/* Filtros */}
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant={filtroEstado === "todas" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroEstado("todas")}
                    >
                      Todas
                    </Button>
                    <Button
                      variant={filtroEstado === "publicadas" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroEstado("publicadas")}
                    >
                      Publicadas
                    </Button>
                    <Button
                      variant={filtroEstado === "borradores" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroEstado("borradores")}
                    >
                      Borradores
                    </Button>
                  </div>

                  {/* Loading state */}
                  {loadingRecetas && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Cargando recetas...</p>
                    </div>
                  )}

                  {/* Empty state */}
                  {!loadingRecetas && recetas.length === 0 && (
                    <div className="text-center py-12">
                      <ChefHat className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No hay recetas</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {filtroEstado === "todas"
                          ? "Aún no has creado ninguna receta"
                          : `No tienes recetas ${filtroEstado}`}
                      </p>
                      {filtroEstado === "todas" && (
                        <Button asChild>
                          <Link href="/crear-receta">
                            <Plus className="w-4 h-4 mr-2" />
                            Crear mi primera receta
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Recipes list */}
                  {!loadingRecetas && recetas.length > 0 && (
                    <div className="space-y-4">
                      {recetas.map((receta) => (
                        <div
                          key={receta.id}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <img
                            src={receta.imagen || "/placeholder.svg"}
                            alt={receta.titulo}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{receta.titulo}</h3>
                            {receta.descripcion && (
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                {receta.descripcion}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                {receta.likes} me gusta
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Eye className="w-4 h-4 text-blue-500" />
                                {receta.vistas} vistas
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(receta.fecha).toLocaleDateString("es-ES")}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={receta.estado === "publicada" ? "default" : "secondary"}>
                              {receta.estado === "publicada" ? "Publicada" : "Borrador"}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/recetas/${receta.id}`}>Ver</Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleCambiarEstado(receta.id, receta.estado === "borrador")
                                }
                              >
                                {receta.estado === "publicada" ? "Ocultar" : "Publicar"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setRecetaAEliminar(receta.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Logros Desbloqueados</span>
                    {logros && (
                      <Badge variant="secondary" className="text-sm">
                        {logros.resumen.desbloqueados} / {logros.resumen.total}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Tus logros y progreso en la plataforma
                    {logros && ` - ${logros.resumen.porcentaje}% completado`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingLogros ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Cargando logros...</p>
                    </div>
                  ) : logros ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {logros.logros.map((logro) => (
                        <div
                          key={logro.id}
                          className={`p-4 border rounded-lg transition-all ${
                            logro.desbloqueado
                              ? "bg-primary/5 border-primary/20 shadow-sm"
                              : "bg-muted/30 border-muted"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                logro.desbloqueado
                                  ? "bg-primary/10 ring-2 ring-primary/20"
                                  : "bg-muted text-muted-foreground grayscale"
                              }`}
                            >
                              {logro.icono}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3
                                  className={`font-semibold ${
                                    logro.desbloqueado ? "text-foreground" : "text-muted-foreground"
                                  }`}
                                >
                                  {logro.nombre}
                                </h3>
                                {logro.desbloqueado && (
                                  <Badge variant="default" className="bg-green-500 shrink-0">
                                    ✓
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{logro.descripcion}</p>
                              
                              {/* Mostrar progreso */}
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                  <span>Progreso</span>
                                  <span className="font-medium">
                                    {logro.progreso} / {logro.meta}
                                  </span>
                                </div>
                                <Progress 
                                  value={(logro.progreso / logro.meta) * 100} 
                                  className={logro.desbloqueado ? "bg-primary/10" : ""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No se pudieron cargar los logros</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Alert Dialog for delete confirmation */}
      <AlertDialog open={recetaAEliminar !== null} onOpenChange={() => setRecetaAEliminar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La receta será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEliminarReceta} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
