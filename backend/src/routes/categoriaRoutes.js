// src/routes/categoriaRoutes.js

import { Router } from 'express';
import models from '../models/index.js';

const router = Router();

// GET /api/categorias
// Trae todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await models.Categoria.findAll({
      where: { activa: true },
      order: [['nombre', 'ASC']],
    });
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;