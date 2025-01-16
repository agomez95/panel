// Interfaces generales (pueden ir en un archivo shared/interfaces/category.interface.ts)
export interface Category {
  id: number; // Siempre presente al editar o listar
  name: string; // Nombre de la categoría
  state: boolean; // Estado de la categoría
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de modificación
}
  
  // Interfaz para crear una categoría
export interface CreateCategory {
  name: string; // Solo necesitas el nombre
  state: boolean; // Estado inicial
}
  
  // Interfaz para actualizar una categoría
export interface UpdateCategory {
  id: number; // Necesario para identificar la categoría
  name?: string; // Opcional para editar solo el nombre
  state?: boolean; // Opcional para cambiar el estado
}
  