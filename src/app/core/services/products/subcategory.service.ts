import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { HttpService } from '../../http/http.service';
import { API_BASE_URL, SUBCATEGORY, SUBCATEGORY_ACTIVATE, SUBCATEGORY_DEACTIVATE } from '../../http/enpoints';

import { Subcategory, CreateSubcategory, UpdateSubcategory } from '../../models/index.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private readonly SUBCATEGORY_URL = `${API_BASE_URL}${SUBCATEGORY}`;
  private readonly SUBCATEGORY_ACTIVATE_URL = `${API_BASE_URL}${SUBCATEGORY_ACTIVATE}`;
  private readonly SUBCATEGORY_DEACTIVATE_URL = `${API_BASE_URL}${SUBCATEGORY_DEACTIVATE}`;

  constructor(private http: HttpService) {}

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<{ result: Subcategory[] }>(this.SUBCATEGORY_URL).pipe(
      map((response) => response.result)
    );
  }

  getSubcategoryById(id: number): Observable<Subcategory> {
    return this.http.get<{ result: Subcategory }>(`${this.SUBCATEGORY_URL}/${id}`).pipe(
      map((response) => response.result)
    );
  }

  createSubcategory(subcategory: CreateSubcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.SUBCATEGORY_URL, subcategory);
  }

  activateSubcategory(id: number): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${this.SUBCATEGORY_ACTIVATE_URL}/${id}`, {});
  }

  deactivateSubcategory(id: number): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${this.SUBCATEGORY_DEACTIVATE_URL}/${id}`, {});
  }

  updateSubcategory(id: number, subcategory: UpdateSubcategory): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${this.SUBCATEGORY_URL}/${id}`, subcategory);
  }

  deleteSubcategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.SUBCATEGORY_URL}/${id}`);
  }
}
