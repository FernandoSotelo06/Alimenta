// RecipeGallery.jsx
// (Este es el código FINAL Y CORRECTO)

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "./recipe-card"
import { Search, Filter, TrendingUp } from "lucide-react"
import Link from "next/link"

// URL de tu API de backend
const API_URL = "http://localhost:3001/api";

// --- Definición de Tipos (Interfaces) ---

interface Etiqueta {
  etiqueta_id: number;
  nombre: string;
  color: string;
}

// El tipo que espera tu RecipeCard (con "Avanzado")
type DifficultyType = "Fácil" | "Intermedio" | "Avanzado";

interface FormattedReceta {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number; 
  calories: number; 
  difficulty: DifficultyType; // <-- Usa el tipo correcto
  rating: number;
  tags: string[]; 
  isLiked: boolean; 
  [key: string]: any; 
}


export function RecipeGallery() {
  // --- Estados para los datos de la API ---
  const [recipes, setRecipes] = useState<FormattedReceta[]>([]);
  const [categories, setCategories] = useState<Etiqueta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Estados para los filtros ---
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); 
  const [searchQuery, setSearchQuery] = useState("");


  // ✅ ¡ESTA ES LA FUNCIÓN CORREGIDA!
  // Compara con minúsculas ("difícil")
  const translateDifficulty = (apiDifficulty: string): DifficultyType => {
    if (apiDifficulty === "difícil") { // <-- Corregido a minúscula
      return "Avanzado"; // Y traduce a "Avanzado"
    }
    if (apiDifficulty === "intermedio") { // <-- Corregido a minúscula
      return "Intermedio";
    }
    return "Fácil"; // "fácil" o cualquier otro valor
  };


  // --- 1. EFECTO PARA CARGAR LAS CATEGORÍAS (ETIQUETAS) ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/etiquetas`);
        if (!res.ok) throw new Error('Error al cargar etiquetas');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategories();
  }, []); 


  // --- 2. EFECTO PARA CARGAR LAS RECETAS (CON FILTRO Y DEBOUNCE) ---
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true); 
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append("titulo", searchQuery);
        }
        if (selectedCategory) {
          params.append("etiquetaId", String(selectedCategory));
        }

        const res = await fetch(`${API_URL}/recetas?${params.toString()}`);
        if (!res.ok) throw new Error('Error al cargar recetas');
        
        const data = await res.json();
        
        // --- Traducción de datos de API -> Props de Componente ---
        const formattedData = data.map((recipe: any) => ({
          ...recipe, 
          
          id: recipe.receta_id,
          title: recipe.titulo,
          description: recipe.descripcion, 
          image: recipe.imagen_principal || "/placeholder.jpg",
          cookTime: `${recipe.tiempo_preparacion} min`,
          rating: recipe.calificacion_promedio, 
          servings: recipe.porciones, 
          calories: recipe.total_calorias || 0, 
          isLiked: false, 
          tags: recipe.etiquetas.map((etiqueta: Etiqueta) => etiqueta.nombre),

          // Usamos la función traductora (ahora corregida)
          difficulty: translateDifficulty(recipe.dificultad),
        }));

        setRecipes(formattedData);
      } catch (error) {
        console.error("Error cargando recetas:", error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Lógica de "Debounce"
    const timerId = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(timerId);
    
  }, [searchQuery, selectedCategory]); 

  
  // --- 3. Lógica para manejar el click en los filtros ---
  const handleCategoryClick = (etiquetaId: number | null) => {
    if (selectedCategory === etiquetaId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(etiquetaId);
    }
  };
  

  return (
    <section id="recetas" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (sin cambios) */}
        <div className="text-center space-y-4 mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />Recetas Destacadas
          </div>
           <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
             Descubre Recetas <span className="text-primary">Saludables</span>
           </h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
Explora nuestra colección de recetas nutritivas con información nutricional detallada y pasos fáciles de seguir.
          </p>
        </div>

        {/* Search and Filters (sin cambios) */}
        <div className="space-y-6 mb-12">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar recetas por título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(null)}
              className={selectedCategory === null ? "bg-primary hover:bg-primary/90" : ""}
            >
              Todas
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.etiqueta_id}
                variant={selectedCategory === category.etiqueta_id ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category.etiqueta_id)}
                className={selectedCategory === category.etiqueta_id ? "bg-primary hover:bg-primary/90" : ""}
              >
                {category.nombre}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid (sin cambios, ahora funciona) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            <p className="text-center col-span-3 text-muted-foreground">Cargando recetas...</p>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={recipe.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <RecipeCard {...recipe} />
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-12 col-span-3">
              <p>No se encontraron recetas con esos filtros. ¡Intenta de nuevo!</p>
            </div>
          )}
        </div>
        
        {/* Load More (sin cambios) */}
        <div className="text-center">
          <Link href="/recetas">
            <Button variant="outline" size="lg" className="group bg-transparent">
              <Filter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Ver Más Recetas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}