// Service para las APIs de usuarios
const API_URL = 'http://localhost:4000/api/usuarios';

export interface EstadisticasUsuario {
  recetas: number;
  meGusta: number;
}

export class UsuarioService {
  // Obtener estadísticas del usuario actual (requiere estar autenticado)
  static async getMisEstadisticas(): Promise<{ success: boolean; data?: EstadisticasUsuario; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/me/estadisticas`, {
        method: 'GET',
        credentials: 'include', // Envía la cookie con el JWT
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error || 'Error al obtener estadísticas' };
    } catch (error) {
      console.error('[UsuarioService] Error al obtener mis estadísticas:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }

  // Obtener estadísticas de un usuario específico por ID
  static async getEstadisticasUsuario(usuarioId: string): Promise<{ success: boolean; data?: EstadisticasUsuario; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/${usuarioId}/estadisticas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error || 'Error al obtener estadísticas' };
    } catch (error) {
      console.error('[UsuarioService] Error al obtener estadísticas del usuario:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }
}
