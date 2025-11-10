import { Usuario, Receta, Like } from '../models/index.js';

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
