import { HeroSection } from "@/components/hero-section"
import { RecipeGallery } from "@/components/recipe-gallery"
import { HowItWorks } from "@/components/how-it-works"
import { IngredientsSection } from "@/components/ingredients-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RecipeGallery />
      <HowItWorks />
      <IngredientsSection />
      <Footer />
    </main>
  )
}
