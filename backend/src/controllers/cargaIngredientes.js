import { uploadLocalImageToCloudinary } from "./cloudinaryControllers.js";
import models from "../models/index.js";
import {ingredientes} from "./ingredientes.js"; // tu archivo con el arreglo

export async function uploadBulkIngredientes() {
  try {
    for (const ingrediente of ingredientes) {
      // Subir imagen a Cloudinary
      const imagenResult = await uploadLocalImageToCloudinary(
        ingrediente.imagen,
        "ingredientes" // carpeta opcional
      );

      // Reemplazar ruta local con la URL de Cloudinary
      ingrediente.imagen = imagenResult.url;

      // Crear el ingrediente en la BD
      await models.Ingrediente.create(ingrediente);

      console.log(`✅ Ingrediente cargado: ${ingrediente.nombre}`);
    }

    console.log("🚀 Carga masiva completada correctamente.");
  } catch (error) {
    console.error("❌ ERROR EN CARGA MASIVA DE INGREDIENTES:", error);
  }
}

uploadBulkIngredientes();