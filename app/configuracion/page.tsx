"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Globe, Save, Upload, Trash2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    location: "",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    recipeComments: true,
    newFollowers: true,
    recipeLikes: false,
    weeklyDigest: true,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showRecipeStats: true,
    allowMessages: true,
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "system",
    language: "es",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        website: "",
        location: "",
      })
    }
  }, [isAuthenticated, user, router])

  if (!user) {
    return <div>Cargando...</div>
  }

  const handleProfileSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Profile updated:", profileData)
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleNotificationSave = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Notifications updated:", notifications)
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handlePrivacySave = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Privacy updated:", privacy)
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleAppearanceSave = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Appearance updated:", appearance)
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
            <p className="text-muted-foreground">Personaliza tu experiencia en Alimenta y gestiona tu cuenta</p>
          </div>

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">Configuración guardada exitosamente</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacidad
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Apariencia
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                  <CardDescription>Actualiza tu información personal y profesional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Cambiar Foto
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      placeholder="Cuéntanos sobre ti, tu experiencia culinaria y pasiones..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio web</Label>
                      <Input
                        id="website"
                        placeholder="https://tu-sitio.com"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        placeholder="Lima, Perú"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleProfileSave} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Controla qué notificaciones quieres recibir y cómo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificaciones por email</h3>
                        <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificaciones push</h3>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones en tiempo real en tu navegador
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Comentarios en recetas</h3>
                        <p className="text-sm text-muted-foreground">Cuando alguien comenta en tus recetas</p>
                      </div>
                      <Switch
                        checked={notifications.recipeComments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, recipeComments: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Nuevos seguidores</h3>
                        <p className="text-sm text-muted-foreground">Cuando alguien comience a seguirte</p>
                      </div>
                      <Switch
                        checked={notifications.newFollowers}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newFollowers: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Me gusta en recetas</h3>
                        <p className="text-sm text-muted-foreground">Cuando alguien le da me gusta a tus recetas</p>
                      </div>
                      <Switch
                        checked={notifications.recipeLikes}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, recipeLikes: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Resumen semanal</h3>
                        <p className="text-sm text-muted-foreground">Recibe un resumen de tu actividad cada semana</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleNotificationSave} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Guardando..." : "Guardar Preferencias"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Privacidad</CardTitle>
                  <CardDescription>Controla quién puede ver tu información y contenido</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Perfil público</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que otros usuarios vean tu perfil completo
                        </p>
                      </div>
                      <Switch
                        checked={privacy.profilePublic}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mostrar email</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que otros usuarios vean tu dirección de email
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mostrar estadísticas de recetas</h3>
                        <p className="text-sm text-muted-foreground">
                          Muestra likes, vistas y comentarios en tus recetas
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showRecipeStats}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showRecipeStats: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Permitir mensajes</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que otros usuarios te envíen mensajes privados
                        </p>
                      </div>
                      <Switch
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={handlePrivacySave} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Guardando..." : "Guardar Configuración"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apariencia y Idioma</CardTitle>
                  <CardDescription>Personaliza cómo se ve y se comporta la aplicación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Tema</Label>
                      <p className="text-sm text-muted-foreground mb-3">Elige el tema de color para la aplicación</p>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant={appearance.theme === "light" ? "default" : "outline"}
                          onClick={() => setAppearance({ ...appearance, theme: "light" })}
                          className="justify-start"
                        >
                          <div className="w-4 h-4 bg-white border rounded mr-2"></div>
                          Claro
                        </Button>
                        <Button
                          variant={appearance.theme === "dark" ? "default" : "outline"}
                          onClick={() => setAppearance({ ...appearance, theme: "dark" })}
                          className="justify-start"
                        >
                          <div className="w-4 h-4 bg-gray-900 rounded mr-2"></div>
                          Oscuro
                        </Button>
                        <Button
                          variant={appearance.theme === "system" ? "default" : "outline"}
                          onClick={() => setAppearance({ ...appearance, theme: "system" })}
                          className="justify-start"
                        >
                          <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-900 rounded mr-2"></div>
                          Sistema
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Idioma</Label>
                      <p className="text-sm text-muted-foreground mb-3">Selecciona el idioma de la interfaz</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={appearance.language === "es" ? "default" : "outline"}
                          onClick={() => setAppearance({ ...appearance, language: "es" })}
                          className="justify-start"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Español
                        </Button>
                        <Button
                          variant={appearance.language === "en" ? "default" : "outline"}
                          onClick={() => setAppearance({ ...appearance, language: "en" })}
                          className="justify-start"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          English
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleAppearanceSave} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Guardando..." : "Guardar Preferencias"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
