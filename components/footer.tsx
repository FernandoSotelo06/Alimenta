import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"

const footerLinks = {
  platform: [
    { name: "Explorar Recetas", href: "#recetas" },
    { name: "Crear Receta", href: "#crear" },
    { name: "Comunidad", href: "#comunidad" },
    { name: "Ingredientes", href: "#ingredientes" },
  ],
  company: [
    { name: "Sobre NutresPerú", href: "#nosotros" },
    { name: "Nuestro Equipo", href: "#equipo" },
    { name: "Misión y Visión", href: "#mision" },
    { name: "Contacto", href: "#contacto" },
  ],
  resources: [
    { name: "Blog de Nutrición", href: "#blog" },
    { name: "Guías Alimentarias", href: "#guias" },
    { name: "Calculadora Nutricional", href: "#calculadora" },
    { name: "Preguntas Frecuentes", href: "#faq" },
  ],
  legal: [
    { name: "Términos de Uso", href: "#terminos" },
    { name: "Política de Privacidad", href: "#privacidad" },
    { name: "Cookies", href: "#cookies" },
    { name: "Soporte", href: "#soporte" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Alimenta</span>
            </div>

            <p className="text-muted-foreground max-w-sm">
              La plataforma de recetas saludables de NutresPerú. Transformamos la forma en que cocinas y compartes
              alimentación nutritiva.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contacto@nutresperu.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+51 1 234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Lima, Perú</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Plataforma</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Mantente al día con nuestras recetas</h3>
              <p className="text-muted-foreground text-sm">
                Recibe las mejores recetas saludables y consejos nutricionales directamente en tu correo.
              </p>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Tu correo electrónico" className="flex-1" />
              <Button className="bg-primary hover:bg-primary/90">Suscribirse</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 NutresPerú. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>en Perú</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
