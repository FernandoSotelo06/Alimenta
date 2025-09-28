import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Target, Eye, Users, Award, Leaf } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. María González",
      role: "Directora de Nutrición",
      image: "/woman-nutritionist.png",
      bio: "Nutricionista con 15 años de experiencia en alimentación saludable y medicina preventiva.",
    },
    {
      name: "Carlos Mendoza",
      role: "Chef Ejecutivo",
      image: "/man-cooking.png",
      bio: "Chef especializado en cocina peruana saludable con enfoque en ingredientes locales.",
    },
    {
      name: "Ana Ruiz",
      role: "Especialista en Nutrición Vegetal",
      image: "/woman-chef-preparing-food.png",
      bio: "Experta en alimentación basada en plantas y sostenibilidad alimentaria.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Salud Integral",
      description: "Promovemos una alimentación que nutre el cuerpo, mente y espíritu de manera holística.",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Fomentamos prácticas alimentarias que respetan el medio ambiente y las comunidades locales.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Creamos espacios de intercambio y aprendizaje mutuo entre amantes de la cocina saludable.",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Nos comprometemos con la calidad y precisión en cada receta y consejo nutricional.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-foreground">NutresPerú</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Transformando vidas a través de la alimentación saludable
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Somos una consultora peruana especializada en nutrición que busca consolidar su presencia digital para
              promover una alimentación saludable a través de herramientas digitales innovadoras.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Contribuir al arraigo de la alimentación sana, accesible y funcional mediante estrategias dietéticas
                  motivantes y prácticas, desarrollando servicios de asesoría nutricional y contenidos digitales que
                  promuevan el cambio en los hábitos alimenticios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconocida a nivel Latinoamericano como la consultora digital de nutrición motivacional, basada en
                  la ciencia, innovación tecnológica y cercanía social que contribuya a la salud y bienestar de las
                  personas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Valores</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían nuestro trabajo y compromiso con la comunidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nuestro Equipo</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profesionales apasionados por la nutrición y la cocina saludable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{member.role}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Recetas Saludables</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Usuarios Activos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15</div>
                  <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
