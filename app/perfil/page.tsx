"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Mail, Edit3, Save, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedBio, setEditedBio] = useState("")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
      return
    }
    if (user) {
      setEditedName(user.name)
      setEditedBio(user.bio || "")
    }
  }, [isAuthenticated, user, router, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSave = () => {
    // In a real app, this would update the user data
    console.log("Saving profile:", { name: editedName, bio: editedBio })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user.name)
    setEditedBio(user.bio || "")
    setIsEditing(false)
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
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-center"
                      />
                    </div>
                  ) : (
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                  )}
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      Miembro desde{" "}
                      {new Date(user.joinedDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Biografía</Label>
                    {isEditing ? (
                      <Textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        placeholder="Cuéntanos sobre ti..."
                        className="mt-2"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">{user.bio || "No hay biografía disponible."}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} size="sm" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1 bg-transparent">
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="w-full">
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Recetas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">48</div>
                      <div className="text-sm text-muted-foreground">Me gusta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">156</div>
                      <div className="text-sm text-muted-foreground">Seguidores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">89</div>
                      <div className="text-sm text-muted-foreground">Siguiendo</div>
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
                  <div className="space-y-4">
                    {[
                      { name: "Quinoa con Verduras al Vapor", date: "2024-03-15", likes: 23 },
                      { name: "Smoothie Verde Energizante", date: "2024-03-12", likes: 18 },
                      { name: "Ensalada de Lentejas y Aguacate", date: "2024-03-10", likes: 31 },
                    ].map((recipe, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{recipe.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(recipe.date).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                        <Badge variant="secondary">{recipe.likes} ❤️</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
