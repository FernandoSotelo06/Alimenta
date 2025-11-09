import { Router } from 'express';
import models from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const etiquetas = await models.Etiqueta.findAll({
      where: { activa: true },
      order: [['nombre', 'ASC']],
    });
    res.json(etiquetas);
  } catch (error) {
    console.error('Error al obtener etiquetas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;