"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", formData)
    setSuccess(true)
    setLoading(false)

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      details: ["Av. Javier Prado Este 4200", "San Borja, Lima - Perú"],
    },
    {
      icon: Phone,
      title: "Teléfono",
      details: ["+51 1 234-5678", "+51 987-654-321"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@Alimenta.com", "consultas@Alimentaperu.com"],
    },
    {
      icon: Clock,
      title: "Horarios",
      details: ["Lun - Vie: 9:00 AM - 6:00 PM", "Sáb: 9:00 AM - 2:00 PM"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes preguntas sobre nutrición o necesitas ayuda con nuestras recetas? Estamos aquí para ayudarte en tu
              camino hacia una alimentación más saludable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>Múltiples formas de ponerte en contacto con nosotros</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                  <CardDescription>Encuentra respuestas rápidas a consultas comunes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">¿Cómo calcular las calorías?</h4>
                    <p className="text-muted-foreground">
                      Nuestro sistema calcula automáticamente los valores nutricionales.
                    </p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">¿Puedo modificar las recetas?</h4>
                    <p className="text-muted-foreground">
                      Sí, puedes adaptar las recetas según tus necesidades dietéticas.
                    </p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">¿Ofrecen consultas personalizadas?</h4>
                    <p className="text-muted-foreground">
                      Contáctanos para conocer nuestros servicios de asesoría nutricional.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un Mensaje</CardTitle>
                  <CardDescription>Completa el formulario y te responderemos en menos de 24 horas</CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                      <AlertDescription className="text-green-800">
                        ¡Gracias por tu mensaje! Te responderemos pronto.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto *</Label>
                      <Input
                        id="subject"
                        placeholder="¿En qué podemos ayudarte?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        placeholder="Cuéntanos más detalles sobre tu consulta..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Nuestra Ubicación</CardTitle>
              <CardDescription>Visítanos en nuestras oficinas en San Borja, Lima</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Mapa interactivo disponible próximamente</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Av. Javier Prado Este 4200, San Borja, Lima - Perú
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
