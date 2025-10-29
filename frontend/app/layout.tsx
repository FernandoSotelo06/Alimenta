import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alimenta - Recetas Saludables ",
  description:
    "Descubre y comparte recetas saludables con cálculo nutricional automático. La plataforma de alimentación sana de Alimenta.",
  generator: "v0.app",
  keywords: "recetas saludables, nutrición, alimentación, Perú, cocina saludable",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Navigation />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
