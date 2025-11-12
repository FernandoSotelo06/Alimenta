"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Mail, Edit3, Save, X, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { UsuarioService, type PerfilUsuario } from "@/lib/usuario"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
  const [loadingPerfil, setLoadingPerfil] = useState(true)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedAvatar, setEditedAvatar] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
      return
    }
  }, [isAuthenticated, loading, router])

  // Cargar perfil del usuario
  useEffect(() => {
    const cargarPerfil = async () => {
      if (isAuthenticated && user) {
        setLoadingPerfil(true)
        const result = await UsuarioService.getMiPerfil()
        if (result.success && result.data) {
          setPerfil(result.data)
          setEditedName(result.data.usuario.nombre)
          setEditedAvatar(result.data.usuario.avatar || "")
        } else {
          toast({
            title: "Error",
            description: result.error || "No se pudo cargar el perfil",
            variant: "destructive"
          })
        }
        setLoadingPerfil(false)
      }
    }

    cargarPerfil()
  }, [isAuthenticated, user, toast])

  const handleSave = async () => {
    if (!editedName.trim()) {
      toast({
        title: "Error",
        description: "El nombre no puede estar vacío",
        variant: "destructive"
      })
      return
    }

    setSaving(true)
    const result = await UsuarioService.actualizarMiPerfil({
      nombre: editedName.trim(),
      avatar: editedAvatar.trim() || null
    })

    if (result.success && result.data) {
      // Actualizar estado del perfil
      setPerfil(prev => prev ? {
        ...prev,
        usuario: result.data.usuario
      } : null)
      
      // ACTUALIZAR LOCALSTORAGE para sincronizar con useAuth
      const userActualizado = {
        id: result.data.usuario.id.toString(),
        name: result.data.usuario.nombre,
        email: result.data.usuario.email,
        avatar: result.data.usuario.avatar,
        joinedDate: result.data.usuario.fechaRegistro
      }
      localStorage.setItem("alimenta_user", JSON.stringify(userActualizado))
      
      // Disparar eventos para que useAuth se actualice
      window.dispatchEvent(new CustomEvent("authChange", { detail: { user: userActualizado } }))
      
      setIsEditing(false)
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios se guardaron correctamente"
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "No se pudo actualizar el perfil",
        variant: "destructive"
      })
    }
    setSaving(false)
  }

  const handleCancel = () => {
    if (perfil) {
      setEditedName(perfil.usuario.nombre)
      setEditedAvatar(perfil.usuario.avatar || "")
    }
    setIsEditing(false)
  }

  if (loading || loadingPerfil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!user || !perfil) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage 
                        src={isEditing ? editedAvatar : perfil.usuario.avatar || "/placeholder.svg"} 
                        alt={perfil.usuario.nombre} 
                      />
                      <AvatarFallback className="text-2xl">
                        {perfil.usuario.nombre.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-left block mb-1">Nombre</Label>
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder="Tu nombre"
                          className="text-center"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-left block mb-1">URL del Avatar</Label>
                        <Input
                          value={editedAvatar}
                          onChange={(e) => setEditedAvatar(e.target.value)}
                          placeholder="https://..."
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-xl">{perfil.usuario.nombre}</CardTitle>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{perfil.usuario.email}</span>
                      </div>
                    </>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      Miembro desde{" "}
                      {new Date(perfil.usuario.fechaRegistro).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button 
                          onClick={handleSave} 
                          size="sm" 
                          className="flex-1"
                          disabled={saving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button 
                          onClick={handleCancel} 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          disabled={saving}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Activity */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                  <CardDescription>Tu actividad en Alimenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-3xl font-bold text-primary">{perfil.estadisticas.recetas}</div>
                      <div className="text-sm text-muted-foreground mt-1">Recetas</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/5 rounded-lg">
                      <div className="text-3xl font-bold text-red-500">{perfil.estadisticas.meGusta}</div>
                      <div className="text-sm text-muted-foreground mt-1">Me gusta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mis Recetas Recientes</CardTitle>
                  <CardDescription>Tus últimas creaciones culinarias</CardDescription>
                </CardHeader>
                <CardContent>
                  {perfil.recetasRecientes.length > 0 ? (
                    <div className="space-y-3">
                      {perfil.recetasRecientes.map((receta) => (
                        <Link 
                          key={receta.id} 
                          href={`/recetas/${receta.id}`}
                          className="block"
                        >
                          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                            <div className="flex-1">
                              <h4 className="font-medium">{receta.titulo}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(receta.fecha).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric"
                                })}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              {receta.likes} <Heart className="w-3 h-3 ml-1 fill-current" />
                            </Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aún no tienes recetas publicadas</p>
                      <Button asChild className="mt-4" size="sm">
                        <Link href="/crear-receta">Crear tu primera receta</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
