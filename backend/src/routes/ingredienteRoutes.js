// src/routes/ingredienteRoutes.js
// (ACTUALIZADO - Ordena por popularidad GENERAL)

import { Router } from 'express';
import models from '../models/index.js';
import { Op, Sequelize } from 'sequelize'; 

const router = Router();

// --- RUTA ACTUALIZADA (Para tu IngredientsPage.jsx) ---
// GET /api/ingredientes/agrupados-por-categoria
// Devuelve categorías con sus ingredientes YA ORDENADOS por popularidad GENERAL
router.get('/agrupados-por-categoria', async (req, res) => {
  try {
    
    // --- CONSULTA A: Obtener el conteo de uso (GENERAL) ---
    // (¡AQUÍ ESTÁ EL CAMBIO!)
    // Contamos cuántas veces aparece cada ingrediente en la tabla 'receta_ingredientes'
    const usageCounts = await models.RecetaIngrediente.findAll({
      attributes: [
        'ingrediente_id',
        // Contamos las filas y lo llamamos 'usage_count'
        [Sequelize.fn('COUNT', Sequelize.col('ingrediente_id')), 'usage_count']
      ],
      group: ['ingrediente_id'] // Agrupamos por ingrediente
    });

    // Convertimos el resultado en un Mapa para búsqueda rápida (ej: { 15 => 8, 22 => 5 })
    const countMap = new Map();
    usageCounts.forEach(item => {
      // Leemos el 'ingrediente_id' y el 'usage_count' virtual
      countMap.set(item.ingrediente_id, parseInt(item.get('usage_count'), 10));
    });


    // --- CONSULTA B: Obtener las categorías con sus ingredientes ---
    // (Esta parte no cambia)
    const categorias = await models.Categoria.findAll({
      where: { activa: true },
      include: [{
        model: models.Ingrediente,
        as: 'ingredientes', 
        where: { activo: true },
        required: false,
      }],
      order: [['nombre', 'ASC']] // Ordena las categorías A-Z
    });

    // --- LA MAGIA: Ordenar los ingredientes DENTRO de cada categoría ---
    // (Esta parte no cambia)
    const sortedCategorias = categorias.map(categoria => {
      const catJSON = categoria.toJSON(); 
      
      catJSON.ingredientes.sort((a, b) => {
        const countA = countMap.get(a.ingrediente_id) || 0; 
        const countB = countMap.get(b.ingrediente_id) || 0; 
        return countB - countA; // Ordena de mayor a menor
      });

      return catJSON;
    });
    
    res.json(sortedCategorias);

  } catch (error) {
    console.error('Error al obtener ingredientes agrupados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// --- RUTA DE BÚSQUEDA (La dejamos por si la necesitas en otro lado) ---
// GET /api/ingredientes
router.get('/', async (req, res) => {
  try {
    const { nombre, categoriaId } = req.query;
    const whereClause = {};
    if (nombre) {
      whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (categoriaId) {
      whereClause.categoria_id = categoriaId;
    }
    const ingredientes = await models.Ingrediente.findAll({
      where: whereClause,
      include: [{
        model: models.Categoria, as: 'categoria', attributes: ['nombre'],
      }],
      order: [['nombre', 'ASC']],
    });
    res.json(ingredientes);
  } catch (error) {
    console.error('Error al obtener ingredientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;