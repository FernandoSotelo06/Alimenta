"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Clock, Users, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getAllIngredients, Ingredient } from "@/api/ingredients.api";
import RecipeSubmit from "@/typings/RecipeSubmit";
import { ingredientItem } from "@/typings/RecipeSubmit";
import { createRecipe } from "@/api/recipes.api";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateRecipePage() {
  const { isAuthenticated, loading, user: currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Estados del formulario
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredientItems, setIngredientItems] = useState<ingredientItem[]>([
    { ingrediente_id: 0, cantidad: "", unidad: "" },
  ]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [ingredientError, setIngredientError] = useState("");
  const [instructionError, setInstructionError] = useState("");
  
  // Estados de carga y error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Verificar autenticación
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Cargar ingredientes
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setAllIngredients(data);
      } catch (error) {
        console.error("Error al cargar ingredientes:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los ingredientes",
          variant: "destructive",
        });
      }
    };
    fetchIngredients();
  }, [toast]);

  // Manejadores de ingredientes
  const updateIngredient = (
    index: number,
    field: keyof ingredientItem,
    value: string | number
  ) => {
    const updated = [...ingredientItems];
    if (field === "ingrediente_id") {
      const selected = allIngredients.find((i) => i.ingrediente_id === value);
      updated[index].ingrediente_id = value as number;
      updated[index].unidad = selected?.unidad || "";
    } else {
      updated[index][field] = value as any;
    }
    setIngredientItems(updated);
    if (ingredientError) setIngredientError("");
  };

  const addIngredient = () => {
    setIngredientItems([
      ...ingredientItems,
      { ingrediente_id: 0, cantidad: "", unidad: "" },
    ]);
  };

  const removeIngredient = (index: number) => {
    setIngredientItems(ingredientItems.filter((_, i) => i !== index));
  };

  const getAvailableIngredients = (currentIndex: number) => {
    const selectedIds = ingredientItems
      .map((item, idx) => (idx !== currentIndex ? item.ingrediente_id : null))
      .filter((id) => id && id > 0);

    return allIngredients.filter(
      (ing) => !selectedIds.includes(ing.ingrediente_id)
    );
  };

  const canAddMoreIngredients = () => {
    return ingredientItems.length < allIngredients.length;
  };

  // Manejadores de instrucciones
  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
    if (value.trim() !== "" && instructionError) {
      setInstructionError("");
    }
  };

  const addInstruction = () => {
    const lastInstruction = instructions[instructions.length - 1];
    if (lastInstruction.trim() === "") {
      setInstructionError("Completa el paso actual antes de agregar uno nuevo");
      return;
    }
    setInstructionError("");
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructionError("");
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Manejadores de tags
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  // Manejador de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiar errores previos
    setIngredientError("");
    setInstructionError("");
    setSubmitError("");

    // Validar ingredientes
    const validIngredients = ingredientItems.filter(
      (item) =>
        item.ingrediente_id > 0 &&
        item.cantidad.trim() !== "" &&
        item.unidad.trim() !== ""
    );

    if (validIngredients.length === 0) {
      setIngredientError(
        "Debes agregar al menos un ingrediente completo (cantidad, unidad e ingrediente)"
      );
      return;
    }

    // Validar instrucciones
    const validInstructions = instructions.filter((i) => i.trim() !== "");

    if (validInstructions.length === 0) {
      setInstructionError(
        "Debes agregar al menos un paso de instrucción con texto"
      );
      return;
    }

    // Iniciar proceso de envío
    setIsSubmitting(true);

    try {
      // Preparar FormData
      const formData = new FormData();

      // Agregar imagen si existe
      if (imagePreview) {
        const imageInput = document.getElementById("image") as HTMLInputElement;
        const file = imageInput?.files?.[0];
        if (file) {
          formData.append("image", file);
        }
      }

      // Agregar datos del formulario
      formData.append(
        "data",
        JSON.stringify({
          userId: currentUser?.id,
          title,
          description,
          difficulty,
          prepTime: Number(prepTime),
          servings: Number(servings),
          ingredients: validIngredients,
          instructions: validInstructions,
          tags,
        })
      );

      // Enviar datos
      await createRecipe(formData);

      // Mostrar mensaje de éxito
      toast({
        title: "¡Receta creada!",
        description: "Tu receta ha sido publicada exitosamente",
      });

      // Redirigir a la página de recetas
      router.push("/recetas");
    } catch (error: any) {
      console.error("Error al crear receta:", error);
      
      // Manejar diferentes tipos de errores
      let errorMessage = "No se pudo crear la receta. Por favor, intenta nuevamente.";
      
      if (error.response) {
        // Error del servidor con respuesta
        if (error.response.status === 400) {
          errorMessage = "Hay errores en los datos enviados. Verifica el formulario.";
        } else if (error.response.status === 401) {
          errorMessage = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
        } else if (error.response.status === 500) {
          errorMessage = "Error en el servidor. Intenta más tarde.";
        }
      } else if (error.request) {
        // No se recibió respuesta
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión.";
      }

      setSubmitError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estados de carga
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            {loading
              ? "Verificando autenticación..."
              : "Redirigiendo al login..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Crear Nueva Receta</h1>
            <p className="text-muted-foreground">
              Comparte tu receta saludable con la comunidad
            </p>
          </div>

          {/* Error general */}
          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* INFORMACIÓN BÁSICA */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Detalles principales de tu receta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Imagen */}
                <div className="space-y-2">
                  <Label htmlFor="image">Imagen de la receta</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 border-2 border-dashed border-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Subir imagen
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, WebP. Máx: 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la receta *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Ensalada de quinoa con aguacate"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu receta, sus beneficios y por qué es especial..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Dificultad, tiempo y porciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 w-full">
                    <Label>Dificultad *</Label>
                    <Select
                      value={difficulty}
                      onValueChange={setDifficulty}
                      disabled={isSubmitting}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="intermedio">Intermedio</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prepTime" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Tiempo (min) *
                    </Label>
                    <Input
                      id="prepTime"
                      type="number"
                      placeholder="15"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      disabled={isSubmitting}
                      required
                      min={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings" className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Porciones *
                    </Label>
                    <Input
                      id="servings"
                      type="number"
                      placeholder="4"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      disabled={isSubmitting}
                      required
                      min={1}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* INGREDIENTES */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredientes</CardTitle>
                <CardDescription>
                  Lista todos los ingredientes con cantidades específicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ingredientItems.map((item, index) => {
                  const availableIngredients = getAvailableIngredients(index);
                  return (
                    <div
                      key={item.ingrediente_id ?? `temp-${index}`}
                      className="grid grid-cols-12 gap-3 items-center"
                    >
                      <Input
                        placeholder="Cantidad"
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={(e) =>
                          updateIngredient(index, "cantidad", e.target.value)
                        }
                        disabled={isSubmitting}
                        className="col-span-2"
                      />
                      <Input
                        placeholder="Unidad"
                        value={item.unidad}
                        onChange={(e) =>
                          updateIngredient(index, "unidad", e.target.value)
                        }
                        disabled={isSubmitting}
                        className="col-span-3"
                      />
                      <Select
                        value={item.ingrediente_id?.toString() || ""}
                        onValueChange={(value) =>
                          updateIngredient(
                            index,
                            "ingrediente_id",
                            parseInt(value)
                          )
                        }
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="col-span-6 w-full">
                          <SelectValue placeholder="Ingrediente" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIngredients.map((ing) => (
                            <SelectItem
                              key={ing.ingrediente_id}
                              value={ing.ingrediente_id.toString()}
                            >
                              {ing.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {ingredientItems.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeIngredient(index)}
                          disabled={isSubmitting}
                          className="col-span-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addIngredient}
                  className="w-full"
                  disabled={!canAddMoreIngredients() || isSubmitting}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {canAddMoreIngredients()
                    ? "Agregar Ingrediente"
                    : "No hay más ingredientes disponibles"}
                </Button>

                {ingredientError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{ingredientError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* INSTRUCCIONES */}
            <Card>
              <CardHeader>
                <CardTitle>Instrucciones</CardTitle>
                <CardDescription>
                  Pasos detallados para preparar la receta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm mt-1">
                      {index + 1}
                    </div>
                    <Textarea
                      placeholder={`Paso ${index + 1}: Describe claramente qué hacer...`}
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      rows={3}
                      disabled={isSubmitting}
                      className="flex-1"
                    />
                    {instructions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeInstruction(index)}
                        disabled={isSubmitting}
                        className="mt-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addInstruction}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" /> Agregar Paso
                </Button>

                {instructionError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{instructionError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* ETIQUETAS */}
            <Card>
              <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>
                  Agrega etiquetas para facilitar la búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: Vegano, Sin Gluten"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    disabled={isSubmitting}
                  />
                  <Button type="button" onClick={addTag} disabled={isSubmitting}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => !isSubmitting && removeTag(tag)}
                      >
                        {tag} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="min-w-[140px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  "Publicar Receta"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}