import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

// Función auxiliar para generar JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token válido por 7 días
  );
};

// Función auxiliar para formatear respuesta de usuario (sin contraseña)
const formatUserResponse = (usuario) => {
  return {
    id: usuario.usuario_id.toString(),
    name: usuario.nombre,
    email: usuario.email,
    avatar: usuario.avatar,
    rol: usuario.rol,
    joinedDate: usuario.fecha_registro?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
  };
};

// POST /api/auth/register - Registro de nuevo usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Todos los campos son requeridos' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        error: 'El email ya está registrado' 
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre: name,
      email,
      password: hashedPassword,
      rol: 'user',
      activo: true,
      avatar: null
    });

    // Generar token
    const token = generateToken(nuevoUsuario.usuario_id);

    // Enviar token como cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });

    // Responder con usuario (sin token en el body)
    res.status(201).json({
      success: true,
      user: formatUserResponse(nuevoUsuario)
    });

  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al crear la cuenta. Intenta nuevamente.' 
    });
  }
};

// POST /api/auth/login - Inicio de sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email y contraseña son requeridos' 
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario) {
      return res.status(401).json({ 
        success: false,
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({ 
        success: false,
        error: 'Usuario inactivo' 
      });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = generateToken(usuario.usuario_id);

    // Enviar token como cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });

    // Responder con usuario (sin token en el body)
    res.status(200).json({
      success: true,
      user: formatUserResponse(usuario)
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al iniciar sesión. Intenta nuevamente.' 
    });
  }
};

// GET /api/auth/me - Obtener usuario actual (protegido)
export const getMe = async (req, res) => {
  try {
    // El usuario ya viene del middleware verifyToken
    res.status(200).json({
      success: true,
      user: formatUserResponse(req.usuario)
    });
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al obtener información del usuario' 
    });
  }
};

// POST /api/auth/logout - Cerrar sesión (opcional)
export const logout = async (req, res) => {
  try {
    // Eliminar la cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al cerrar sesión' 
    });
  }
};
