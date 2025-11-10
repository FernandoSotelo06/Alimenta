import express from 'express';
import { getEstadisticasUsuario, getMisEstadisticas } from '../controllers/usuarioController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta protegida - obtener estadísticas del usuario actual
router.get('/me/estadisticas', verifyToken, getMisEstadisticas);

// Ruta pública - obtener estadísticas de cualquier usuario
router.get('/:id/estadisticas', getEstadisticasUsuario);

export default router;
