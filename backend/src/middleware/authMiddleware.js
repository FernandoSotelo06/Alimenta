import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

export const verifyToken = async (req, res, next) => {
  try {
    // Obtener token de las cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No se proporcionó token de autenticación' 
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ 
        success: false,
        error: 'Usuario no encontrado o inactivo' 
      });
    }

    // Agregar usuario al request
    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token inválido' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expirado' 
      });
    }

    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Error en la autenticación' 
    });
  }
};

// Middleware opcional para verificar si es admin
export const verifyAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ 
      success: false,
      error: 'Acceso denegado. Se requieren permisos de administrador' 
    });
  }
  next();
};
