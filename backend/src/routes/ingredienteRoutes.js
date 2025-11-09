// src/routes/ingredienteRoutes.js

import { Router } from 'express';
import models from '../models/index.js'; // Importa tus modelos
import { Op } from 'sequelize'; // Importa los Operadores de Sequelize

const router = Router();

// GET /api/ingredientes
// Esta ruta filtrará por nombre y/o por categoria_id
router.get('/', async (req, res) => {
  try {
    // 1. Obtenemos los filtros de la URL (query params)
    // Ej: /api/ingredientes?nombre=tomate&categoriaId=3
    const { nombre, categoriaId } = req.query;

    // 2. Construimos la cláusula 'where' para Sequelize
    const whereClause = {};

    if (nombre) {
      // Usamos 'iLike' para que la búsqueda no distinga mayúsculas/minúsculas
      // '%nombre%' significa que busca en cualquier parte del texto
      whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
    }

    if (categoriaId) {
      whereClause.categoria_id = categoriaId;
    }

    // 3. Hacemos la consulta a la base de datos
    // Incluimos el modelo 'Categoria' para que nos traiga también el nombre
    // de la categoría, usando el alias 'categoria' que definiste.
    const ingredientes = await models.Ingrediente.findAll({
      where: whereClause, // ¡Aquí aplicamos los filtros!
      include: [
        {
          model: models.Categoria,
          as: 'categoria', // Este alias viene de tu associations.js
          attributes: ['nombre'], // Solo traemos el nombre de la categoría
        },
      ],
      order: [['nombre', 'ASC']], // Opcional: ordenar alfabéticamente
    });

    res.json(ingredientes);

  } catch (error) {
    console.error('Error al obtener ingredientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;