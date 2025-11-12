// Servicio para obtener logros del usuario
const API_URL = 'http://localhost:4000/api/usuarios';

export interface Logro {
  id: string
  nombre: string
  descripcion: string
  icono: string
  desbloqueado: boolean
  progreso: number
  meta: number
}

export interface ResumenLogros {
  total: number
  desbloqueados: number
  porcentaje: number
}

export interface LogrosResponse {
  logros: Logro[]
  resumen: ResumenLogros
}

export class LogrosService {
  // Obtener logros del usuario autenticado
  static async getMisLogros(): Promise<{ success: boolean; data?: LogrosResponse; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/me/logros`, {
        method: 'GET',
        credentials: 'include', // Importante: envía cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        console.log("[LogrosService] Logros obtenidos:", data.data);
        return { success: true, data: data.data };
      }

      console.log("[LogrosService] Error al obtener logros:", data.error);
      return { success: false, error: data.error || "Error al obtener logros" };
    } catch (error) {
      console.error("[LogrosService] Error:", error);
      return { success: false, error: "Error de conexión con el servidor" };
    }
  }
}
