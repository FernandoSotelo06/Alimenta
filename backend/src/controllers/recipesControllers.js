import { json } from "sequelize";
import models from "../models/index.js";
import { uploadImageToCloudinary } from "./cloudinaryControllers.js";

export const createRecipe = async (req, res) => {
  try {
    // Parsear el JSON que viene en req.body.data
    const data = JSON.parse(req.body.data);

    const {
      userId,
      title,
      description,
      instructions,
      difficulty,
      prepTime,
      servings,
      ingredients,
      tags,
    } = data;

    // Subir imagen a Cloudinary (si hay)
    let imageUrl = null;
    if (req.file) {
      const { url } = await uploadImageToCloudinary(req.file, "recipes");
      imageUrl = url;
    }

    // Crear la receta base
    const newRecipe = await models.Receta.create({
      usuario_id: userId,
      titulo: title,
      descripcion: description,
      instrucciones: JSON.stringify(instructions),
      tiempo_preparacion: prepTime,
      porciones: servings,
      dificultad: difficulty,
      imagen_principal: imageUrl,
      total_calorias: 0,
      total_proteinas: 0,
      total_carbohidratos: 0,
      total_grasas: 0,
      total_fibra: 0,
    });

    // Crear ingredientes relacionados
    if (ingredients && ingredients.length > 0) {
      await models.RecetaIngrediente.bulkCreate(
        ingredients.map((ing) => ({
          receta_id: newRecipe.receta_id,
          ingrediente_id: ing.ingrediente_id,
          cantidad: ing.cantidad,
          unidad: ing.unidad,
        }))
      );
    }

    // Crear ingredientes relacionados
    if (ingredients && ingredients.length > 0) {
      // Crear los ingredientes relacionados (una sola vez)
      const recetaIngredientes = ingredients.map((ing) => ({
        receta_id: newRecipe.receta_id,
        ingrediente_id: ing.ingrediente_id,
        cantidad: ing.cantidad,
        unidad: ing.unidad,
      }));

      await models.RecetaIngrediente.bulkCreate(recetaIngredientes, {
        ignoreDuplicates: true,
      });

      let totals = {
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        fibra: 0,
      };

      for (const ing of ingredients) {
        const ingrediente = await models.Ingrediente.findByPk(
          ing.ingrediente_id
        );
        if (ingrediente) {
          totals.calorias += Number(ingrediente.calorias) || 0;
          totals.proteinas += Number(ingrediente.proteinas) || 0;
          totals.carbohidratos += Number(ingrediente.carbohidratos) || 0;
          totals.grasas += Number(ingrediente.grasas) || 0;
          totals.fibra += Number(ingrediente.fibra) || 0;
        }
      }

      await newRecipe.update({
        total_calorias: totals.calorias,
        total_proteinas: totals.proteinas,
        total_carbohidratos: totals.carbohidratos,
        total_grasas: totals.grasas,
        total_fibra: totals.fibra,
      });
    }

    // Crear tags relacionados
    if (tags && tags.length > 0) {
      const recetaTags = [];

      for (const tagName of tags) {
        const [tagInstance] = await models.Etiqueta.findOrCreate({
          where: { nombre: tagName.trim() },
          defaults: { nombre: tagName.trim() },
        });

        recetaTags.push({
          receta_id: newRecipe.receta_id,
          etiqueta_id: tagInstance.etiqueta_id,
        });
      }

      await models.RecetaEtiqueta.bulkCreate(recetaTags);
    }

    return res.status(201).json({
      message: "Receta creada exitosamente",
      recipe: newRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la receta",
      error: error.message,
    });
  }
};

export const findRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await models.Receta.findByPk(id, {
      include: [
        {
          model: models.Usuario,
          as: "usuario",
          attributes: ["usuario_id", "nombre", "avatar"],
        },
        {
          model: models.RecetaIngrediente,
          as: "receta_ingredientes",
          required: false,
          include: [
            {
              model: models.Ingrediente,
              as: "ingrediente", // alias definido en RecetaIngrediente.belongsTo(Ingrediente)
              attributes: ["ingrediente_id", "nombre"], // solo campos que quieres
            },
          ],
        },
        {
          model: models.Etiqueta,
          as: "etiquetas",
          attributes: ["etiqueta_id", "nombre"],
          through: { attributes: [] },
          where: { activa: true },
          required: false,
        },
        {
          model: models.Like,
          as: "likes",
          attributes: ["usuario_id"]
        }
      ],
    });
    
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    if (recipe && recipe.instrucciones) {
      recipe.instrucciones = JSON.parse(recipe.instrucciones);
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar la receta",
      error: error.message,
    });
  }
};
