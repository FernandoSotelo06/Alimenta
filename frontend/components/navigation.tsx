"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf, User, LogOut, ChefHat, BookOpen, Settings, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Recetas", href: "/recetas" },
    { name: "Ingredientes", href: "/ingredientes" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Alimenta</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
              {isAuthenticated && user && (
                <Link
                  href="/crear-receta"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium relative group flex items-center gap-1"
                >
                  <ChefHat className="w-4 h-4" />
                  Crear Receta
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/crear-receta">
                    <ChefHat className="w-4 h-4 mr-2" />
                    Crear Receta
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent transition-colors">
                      <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72" align="end" forceMount>
                    {/* User info header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg border-b border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-primary text-white text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="my-1" />

                    {/* Main actions */}
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs uppercase font-semibold text-muted-foreground px-2 py-1.5">
                        Mi Espacio
                      </DropdownMenuLabel>
                      <DropdownMenuItem  className="cursor-pointer">
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem  className="cursor-pointer">
                        <Link href="/perfil" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Mi Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1" />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" >
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" >
                  <Link href="/registro">Crear Cuenta</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-3 pt-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border">
                      <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary text-white text-xs">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm"  className="justify-start">
                      <Link href="/dashboard">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm"  className="justify-start">
                      <Link href="/perfil">
                        <User className="w-4 h-4 mr-2" />
                        Mi Perfil
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm"  className="justify-start">
                      <Link href="/crear-receta">
                        <ChefHat className="w-4 h-4 mr-2" />
                        Crear Receta
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm"  className="justify-start">
                      <Link href="/favoritos">
                        <Heart className="w-4 h-4 mr-2" />
                        Recetas Guardadas
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm"  className="justify-start">
                      <Link href="/configuracion">
                        <Settings className="w-4 h-4 mr-2" />
                        Configuración
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="justify-start text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/20 bg-transparent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" >
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" >
                      <Link href="/registro">Crear Cuenta</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
