// Service para las APIs de usuarios
const API_URL = 'https://alimenta-backend.onrender.com/api/usuarios';

export interface EstadisticasUsuario {
  recetas: number;
  meGusta: number;
}

export interface RecetaReciente {
  id: number;
  titulo: string;
  imagen: string | null;
  fecha: string;
  likes: number;
}

export interface PerfilUsuario {
  usuario: {
    id: number;
    nombre: string;
    email: string;
    avatar: string | null;
    fechaRegistro: string;
  };
  estadisticas: EstadisticasUsuario;
  recetasRecientes: RecetaReciente[];
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

  // Obtener perfil completo del usuario actual
  static async getMiPerfil(): Promise<{ success: boolean; data?: PerfilUsuario; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/me/perfil`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error || 'Error al obtener perfil' };
    } catch (error) {
      console.error('[UsuarioService] Error al obtener mi perfil:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }

  // Obtener perfil completo de un usuario por ID
  static async getPerfilUsuario(usuarioId: string): Promise<{ success: boolean; data?: PerfilUsuario; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/${usuarioId}/perfil`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error || 'Error al obtener perfil' };
    } catch (error) {
      console.error('[UsuarioService] Error al obtener perfil del usuario:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }

  // Actualizar perfil del usuario actual
  static async actualizarMiPerfil(data: { nombre?: string; avatar?: string | null }): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/me/perfil`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error || 'Error al actualizar perfil' };
    } catch (error) {
      console.error('[UsuarioService] Error al actualizar perfil:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }
}
