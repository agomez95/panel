import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { HttpService } from '../../http/http.service';
import { API_BASE_URL, CATEGORY, CATEGORY_ACTIVATE, CATEGORY_DEACTIVATE } from '../../http/enpoints';

import { Category, CreateCategory, UpdateCategory } from '../../models/index.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private readonly CATEGORY_URL = `${API_BASE_URL}${CATEGORY}`;
  private readonly CATEGORY_ACTIVATE_URL = `${API_BASE_URL}${CATEGORY_ACTIVATE}`;
  private readonly CATEGORY_DEACTIVATE_URL = `${API_BASE_URL}${CATEGORY_DEACTIVATE}`;

  constructor(private http: HttpService) {}

  // Obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<{ result: Category[] }>(this.CATEGORY_URL).pipe(
      map((response) => response.result)
    );
  }

  // Obtener categoría por ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<{ result: Category }>(`${this.CATEGORY_URL}/${id}`).pipe(
      map((response) => response.result)
    );
  }

  // Crear nueva categoría
  createCategory(category: CreateCategory): Observable<Category> {
    return this.http.post<Category>(this.CATEGORY_URL, category);
  }

  // Activar categoría
  activateCategory(id: number): Observable<Category> {
    return this.http.patch<Category>(`${this.CATEGORY_ACTIVATE_URL}/${id}`, {});
  }

  // Desactivar categoría
  deactivateCategory(id: number): Observable<Category> {
    return this.http.patch<Category>(`${this.CATEGORY_DEACTIVATE_URL}/${id}`, {});
  }

  // Actualizar categoría
  updateCategory(id: number, category: UpdateCategory): Observable<Category> {
    return this.http.patch<Category>(`${this.CATEGORY_URL}/${id}`, category);
  }

  // Eliminar categoría
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CATEGORY_URL}/${id}`);
  }
}
