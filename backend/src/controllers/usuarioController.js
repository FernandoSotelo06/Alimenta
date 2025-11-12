import { Usuario, Receta, Like, Comentario, Favorito } from '../models/index.js';
import { Op } from 'sequelize';

// GET /api/usuarios/:id/estadisticas - Obtener estadísticas del usuario
export const getEstadisticasUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Contar recetas publicadas del usuario
    const totalRecetas = await Receta.count({
      where: {
        usuario_id: id,
        activa: true
      }
    });

    // Contar total de likes que han recibido las recetas del usuario
    const totalMeGusta = await Like.count({
      include: [{
        model: Receta,
        as: 'receta',
        where: {
          usuario_id: id,
          activa: true
        }
      }]
    });

    res.status(200).json({
      success: true,
      data: {
        recetas: totalRecetas,
        meGusta: totalMeGusta
      }
    });

  } catch (error) {
    console.error('Error en getEstadisticasUsuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas del usuario'
    });
  }
};

// GET /api/usuarios/me/estadisticas - Obtener estadísticas del usuario actual (protegido)
export const getMisEstadisticas = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;

    // Contar recetas publicadas del usuario
    const totalRecetas = await Receta.count({
      where: {
        usuario_id: usuarioId,
        activa: true
      }
    });

    // Contar total de likes que han recibido las recetas del usuario
    const totalMeGusta = await Like.count({
      include: [{
        model: Receta,
        as: 'receta',
        where: {
          usuario_id: usuarioId,
          activa: true
        }
      }]
    });

    res.status(200).json({
      success: true,
      data: {
        recetas: totalRecetas,
        meGusta: totalMeGusta
      }
    });

  } catch (error) {
    console.error('Error en getMisEstadisticas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener mis estadísticas'
    });
  }
};

// GET /api/usuarios/me/logros - Obtener logros del usuario actual (protegido)
export const getMisLogros = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;

    // 1. Contar recetas publicadas
    const totalRecetas = await Receta.count({
      where: {
        usuario_id: usuarioId,
        activa: true
      }
    });

    // 2. Contar total de likes recibidos en las recetas del usuario
    const totalLikes = await Like.count({
      include: [{
        model: Receta,
        as: 'receta',
        where: {
          usuario_id: usuarioId,
          activa: true
        }
      }]
    });

    // 3. Verificar si tiene alguna receta con calificación >= 4.5
    const recetaConAltaCalificacion = await Receta.findOne({
      where: {
        usuario_id: usuarioId,
        activa: true,
        calificacion_promedio: {
          [Op.gte]: 4.5
        }
      }
    });

    // 4. Contar recetas guardadas en favoritos por el usuario
    const totalFavoritos = await Favorito.count({
      where: {
        usuario_id: usuarioId
      }
    });

    // 5. Contar comentarios escritos por el usuario
    const totalComentarios = await Comentario.count({
      where: {
        usuario_id: usuarioId,
        activo: true
      }
    });

    // Definir logros con sus condiciones
    const logros = [
      {
        id: 'primera_receta',
        nombre: 'Primera Receta',
        descripcion: 'Publicaste tu primera receta',
        icono: '🍳',
        desbloqueado: totalRecetas >= 1,
        progreso: Math.min(totalRecetas, 1),
        meta: 1
      },
      {
        id: 'chef_popular',
        nombre: 'Chef Popular',
        descripcion: 'Obtuviste 100 likes',
        icono: '❤️',
        desbloqueado: totalLikes >= 100,
        progreso: totalLikes,
        meta: 100
      },
      {
        id: 'experto',
        nombre: 'Experto',
        descripcion: 'Publica 50 recetas',
        icono: '👨‍🍳',
        desbloqueado: totalRecetas >= 50,
        progreso: totalRecetas,
        meta: 50
      },
      {
        id: 'chef_5_estrellas',
        nombre: 'Chef 5 Estrellas',
        descripcion: 'Tienes una receta con calificación de 4.5 o más',
        icono: '⭐',
        desbloqueado: recetaConAltaCalificacion !== null,
        progreso: recetaConAltaCalificacion ? 1 : 0,
        meta: 1
      },
      {
        id: 'coleccionista',
        nombre: 'Coleccionista',
        descripcion: 'Guarda 50 recetas en favoritos',
        icono: '📚',
        desbloqueado: totalFavoritos >= 50,
        progreso: totalFavoritos,
        meta: 50
      },
      {
        id: 'critico',
        nombre: 'Crítico',
        descripcion: 'Escribe 20 comentarios',
        icono: '💬',
        desbloqueado: totalComentarios >= 20,
        progreso: totalComentarios,
        meta: 20
      }
    ];

    // Calcular estadísticas de logros
    const totalLogros = logros.length;
    const logrosDesbloqueados = logros.filter(l => l.desbloqueado).length;

    res.status(200).json({
      success: true,
      data: {
        logros,
        resumen: {
          total: totalLogros,
          desbloqueados: logrosDesbloqueados,
          porcentaje: Math.round((logrosDesbloqueados / totalLogros) * 100)
        }
      }
    });

  } catch (error) {
    console.error('Error en getMisLogros:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener logros del usuario'
    });
  }
};

// GET /api/usuarios/:id/perfil - Obtener perfil completo de un usuario
export const getPerfilUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener datos del usuario
    const usuario = await Usuario.findByPk(id, {
      attributes: ['usuario_id', 'nombre', 'email', 'avatar', 'fecha_registro']
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Contar recetas publicadas
    const totalRecetas = await Receta.count({
      where: {
        usuario_id: id,
        activa: true
      }
    });

    // Contar total de likes recibidos
    const totalMeGusta = await Like.count({
      include: [{
        model: Receta,
        as: 'receta',
        where: {
          usuario_id: id,
          activa: true
        }
      }]
    });

    // Obtener las 3 recetas más recientes
    const recetasRecientes = await Receta.findAll({
      where: {
        usuario_id: id,
        activa: true
      },
      attributes: ['receta_id', 'titulo', 'imagen_principal', 'fecha_creacion'],
      include: [{
        model: Like,
        as: 'likes',
        attributes: []
      }],
      order: [['fecha_creacion', 'DESC']],
      limit: 3,
      // Contar likes por receta
      group: ['Receta.receta_id'],
      subQuery: false
    });

    // Para cada receta, contar sus likes
    const recetasConLikes = await Promise.all(
      recetasRecientes.map(async (receta) => {
        const likesCount = await Like.count({
          where: { receta_id: receta.receta_id }
        });
        
        return {
          id: receta.receta_id,
          titulo: receta.titulo,
          imagen: receta.imagen_principal,
          fecha: receta.fecha_creacion,
          likes: likesCount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        usuario: {
          id: usuario.usuario_id,
          nombre: usuario.nombre,
          email: usuario.email,
          avatar: usuario.avatar,
          fechaRegistro: usuario.fecha_registro
        },
        estadisticas: {
          recetas: totalRecetas,
          meGusta: totalMeGusta
        },
        recetasRecientes: recetasConLikes
      }
    });

  } catch (error) {
    console.error('Error en getPerfilUsuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener perfil del usuario'
    });
  }
};

// GET /api/usuarios/me/perfil - Obtener perfil completo del usuario actual (protegido)
export const getMiPerfil = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;

    // Obtener datos del usuario
    const usuario = await Usuario.findByPk(usuarioId, {
      attributes: ['usuario_id', 'nombre', 'email', 'avatar', 'fecha_registro']
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Contar recetas publicadas
    const totalRecetas = await Receta.count({
      where: {
        usuario_id: usuarioId,
        activa: true
      }
    });

    // Contar total de likes recibidos
    const totalMeGusta = await Like.count({
      include: [{
        model: Receta,
        as: 'receta',
        where: {
          usuario_id: usuarioId,
          activa: true
        }
      }]
    });

    // Obtener las 3 recetas más recientes
    const recetasRecientes = await Receta.findAll({
      where: {
        usuario_id: usuarioId,
        activa: true
      },
      attributes: ['receta_id', 'titulo', 'imagen_principal', 'fecha_creacion'],
      order: [['fecha_creacion', 'DESC']],
      limit: 3
    });

    // Para cada receta, contar sus likes
    const recetasConLikes = await Promise.all(
      recetasRecientes.map(async (receta) => {
        const likesCount = await Like.count({
          where: { receta_id: receta.receta_id }
        });
        
        return {
          id: receta.receta_id,
          titulo: receta.titulo,
          imagen: receta.imagen_principal,
          fecha: receta.fecha_creacion,
          likes: likesCount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        usuario: {
          id: usuario.usuario_id,
          nombre: usuario.nombre,
          email: usuario.email,
          avatar: usuario.avatar,
          fechaRegistro: usuario.fecha_registro
        },
        estadisticas: {
          recetas: totalRecetas,
          meGusta: totalMeGusta
        },
        recetasRecientes: recetasConLikes
      }
    });

  } catch (error) {
    console.error('Error en getMiPerfil:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener mi perfil'
    });
  }
};

// PUT /api/usuarios/me/perfil - Actualizar perfil del usuario actual (protegido)
export const actualizarMiPerfil = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;
    const { nombre, avatar } = req.body;

    // Validar que se envió al menos un campo
    if (!nombre && !avatar) {
      return res.status(400).json({
        success: false,
        error: 'Debes proporcionar al menos un campo para actualizar'
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Actualizar campos proporcionados
    if (nombre) usuario.nombre = nombre;
    if (avatar !== undefined) usuario.avatar = avatar; // Permitir null para eliminar avatar

    await usuario.save();

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        usuario: {
          id: usuario.usuario_id,
          nombre: usuario.nombre,
          email: usuario.email,
          avatar: usuario.avatar,
          fechaRegistro: usuario.fecha_registro
        }
      }
    });

  } catch (error) {
    console.error('Error en actualizarMiPerfil:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar perfil'
    });
  }
};
