import express from 'express';
import { 
  getEstadisticasUsuario, 
  getMisEstadisticas, 
  getMisLogros,
  getPerfilUsuario,
  getMiPerfil,
  actualizarMiPerfil
} from '../controllers/usuarioController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas - usuario actual
router.get('/me/estadisticas', verifyToken, getMisEstadisticas);
router.get('/me/logros', verifyToken, getMisLogros);
router.get('/me/perfil', verifyToken, getMiPerfil);
router.put('/me/perfil', verifyToken, actualizarMiPerfil);

// Rutas públicas - cualquier usuario
router.get('/:id/estadisticas', getEstadisticasUsuario);
router.get('/:id/perfil', getPerfilUsuario);

export default router;
