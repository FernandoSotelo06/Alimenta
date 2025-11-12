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

// GET /api/recetas/me - Obtener todas las recetas del usuario autenticado
export const getMisRecetas = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;
    const { estado } = req.query; // 'publicadas', 'borradores', o sin filtro

    // Construir condiciones de búsqueda
    const whereConditions = {
      usuario_id: usuarioId
    };

    // Filtrar por estado si se especifica
    if (estado === 'publicadas') {
      whereConditions.activa = true;
    } else if (estado === 'borradores') {
      whereConditions.activa = false;
    }

    // Obtener recetas con contador de likes
    const recetas = await models.Receta.findAll({
      where: whereConditions,
      attributes: [
        'receta_id',
        'titulo',
        'descripcion',
        'imagen_principal',
        'fecha_creacion',
        'activa',
        'tiempo_preparacion',
        'porciones',
        'dificultad'
      ],
      include: [{
        model: models.Like,
        as: 'likes',
        attributes: []
      }],
      order: [['fecha_creacion', 'DESC']],
      group: ['Receta.receta_id'],
      subQuery: false
    });

    // Para cada receta, contar sus likes y vistas (simuladas por ahora)
    const recetasConEstadisticas = await Promise.all(
      recetas.map(async (receta) => {
        const likesCount = await models.Like.count({
          where: { receta_id: receta.receta_id }
        });

        return {
          id: receta.receta_id,
          titulo: receta.titulo,
          descripcion: receta.descripcion,
          imagen: receta.imagen_principal,
          fecha: receta.fecha_creacion,
          estado: receta.activa ? 'publicada' : 'borrador',
          likes: likesCount,
          vistas: 0, // TODO: Implementar sistema de vistas
          tiempoPreparacion: receta.tiempo_preparacion,
          porciones: receta.porciones,
          dificultad: receta.dificultad
        };
      })
    );

    res.status(200).json({
      success: true,
      data: recetasConEstadisticas
    });

  } catch (error) {
    console.error('Error en getMisRecetas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tus recetas'
    });
  }
};

// PUT /api/recetas/:id/estado - Cambiar estado de una receta (publicar/borrador)
export const cambiarEstadoReceta = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.usuario_id;
    const { activa } = req.body;

    // Validar que el campo activa sea booleano
    if (typeof activa !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'El campo "activa" debe ser true o false'
      });
    }

    // Buscar la receta
    const receta = await models.Receta.findByPk(id);

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    // Verificar que el usuario es el dueño de la receta
    if (receta.usuario_id !== usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para modificar esta receta'
      });
    }

    // Actualizar estado
    await receta.update({ activa });

    res.status(200).json({
      success: true,
      message: activa ? 'Receta publicada' : 'Receta marcada como borrador',
      data: {
        id: receta.receta_id,
        activa: receta.activa
      }
    });

  } catch (error) {
    console.error('Error en cambiarEstadoReceta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al cambiar el estado de la receta'
    });
  }
};

// DELETE /api/recetas/:id - Eliminar una receta
export const eliminarReceta = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.usuario_id;

    // Buscar la receta
    const receta = await models.Receta.findByPk(id);

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    // Verificar que el usuario es el dueño de la receta
    if (receta.usuario_id !== usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para eliminar esta receta'
      });
    }

    // Eliminar la receta (CASCADE eliminará likes, favoritos, comentarios, etc.)
    await receta.destroy();

    res.status(200).json({
      success: true,
      message: 'Receta eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en eliminarReceta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la receta'
    });
  }
};
