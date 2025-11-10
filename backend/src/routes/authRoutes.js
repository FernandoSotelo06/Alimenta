import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Rutas protegidas (requieren autenticación)
router.get('/me', verifyToken, getMe);

export default router;
