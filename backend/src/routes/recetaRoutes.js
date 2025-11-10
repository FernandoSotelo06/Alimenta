// src/routes/recetaRoutes.js
// (ACTUALIZADO para 'sortBy')

import { Router } from 'express';
import models from '../models/index.js';
import { Op } from 'sequelize';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // 1. Obtenemos TODOS los filtros de la URL
    const { titulo, etiquetaId, sortBy } = req.query;

    const whereClause = { activa: true };
    if (titulo) {
      whereClause.titulo = { [Op.iLike]: `%${titulo}%` };
    }

    // 2. Definimos el orden (¡NUEVO!)
    let orderClause;
    switch (sortBy) {
      case 'popular':
        // Usamos 'calificacion_promedio' para "popular"
        orderClause = [['calificacion_promedio', 'DESC']];
        break;
      case 'time':
        orderClause = [['tiempo_preparacion', 'ASC']];
        break;
      case 'recent':
      default:
        orderClause = [['fecha_creacion', 'DESC']];
        break;
    }

    // 3. Preparamos los 'includes' (igual que antes)
    const includeClause = [
      {
        model: models.Usuario,
        as: 'usuario',
        attributes: ['nombre', 'avatar'],
      },
      {
        model: models.Etiqueta,
        as: 'etiquetas',
        attributes: ['etiqueta_id', 'nombre', 'color'],
        required: false,
        through: { attributes: [] } 
      },
    ];

    if (etiquetaId) {
      includeClause[1].where = { etiqueta_id: etiquetaId };
      includeClause[1].required = true;
    }

    // 4. La consulta final (ahora usa el 'orderClause')
    const recetas = await models.Receta.findAll({
      where: whereClause,
      include: includeClause,
      order: orderClause, // <-- ¡AQUÍ!
      limit: 50, // Traemos más recetas en esta página
    });

    res.json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;