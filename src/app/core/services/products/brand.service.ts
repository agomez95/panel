import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { HttpService } from '../../http/http.service';
import { API_BASE_URL, CATEGORY, CATEGORY_ACTIVATE, CATEGORY_DEACTIVATE } from '../../http/enpoints';

import { Brand, CreateBrand, UpdateBrand } from '../../models/index.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly BRAND_URL = `${API_BASE_URL}${CATEGORY}`;
  private readonly BRAND_ACTIVATE_URL = `${API_BASE_URL}${CATEGORY_ACTIVATE}`;
  private readonly BRAND_DEACTIVATE_URL = `${API_BASE_URL}${CATEGORY_DEACTIVATE}`;
  
  constructor(private http: HttpService) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<{ result: Brand[] }>(this.BRAND_URL).pipe(
      map((response) => response.result)
    );
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<{ result: Brand }>(`${this.BRAND_URL}/${id}`).pipe(
      map((response) => response.result)
    );
  }

  createBrand(brand: CreateBrand): Observable<Brand> {
    return this.http.post<Brand>(this.BRAND_URL, brand);
  }

  activateBrand(id: number): Observable<Brand> {
    return this.http.patch<Brand>(`${this.BRAND_ACTIVATE_URL}/${id}`, {});
  }

  deactivateBrand(id: number): Observable<Brand> {
    return this.http.patch<Brand>(`${this.BRAND_DEACTIVATE_URL}/${id}`, {});
  }

  updateBrand(id: number, brand: UpdateBrand): Observable<Brand> {
    return this.http.patch<Brand>(`${this.BRAND_URL}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BRAND_URL}/${id}`);
  }
}
