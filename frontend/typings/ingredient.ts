export default interface Ingredient {
  ingrediente_id: number;
  nombre: string;
  descripcion: string;
  unidad: string;
  cantidad_base: number;
  calorias: string;
  proteinas: string;
  carbohidratos: string;
  grasas: string;
  fibra: string;
  azucares: string;
  sodio: string;
  vitaminas: { [key: string]: string } | null;
  minerales: { [key: string]: string } | null;
  categoria_id: number;
  imagen: string;
  activo: boolean;
  categoria: { nombre: string } | null;
}