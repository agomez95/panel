import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) {}

  // Método para obtener headers dinámicos (comentado por ahora)
  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('jwt_token'); // Asumiendo que el token se guarda en el localStorage
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: token ? `Bearer ${token}` : '', // Incluye el token si está disponible
  //   });
  // }

  // Verificación de códigos de estado esperados
  private validateStatus(status: number): boolean {
    return [200, 201, 202].includes(status); // Ajusta según los códigos válidos para tu API
  }

  // Manejo centralizado de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Métodos genéricos
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(url, { 
        // headers: this.getHeaders(), // Comentado por ahora
        params, 
        observe: 'response' 
      })
      .pipe(
        map((response) => {
          if (!this.validateStatus(response.status)) {
            throw new Error(`Estado inválido: ${response.status}`);
          }
          return response.body as T;
        }),
        catchError(this.handleError)
      );
  }

  post<T>(url: string, body: any, params?: HttpParams): Observable<T> {
    return this.http
      .post<T>(url, body, { 
        // headers: this.getHeaders(), // Comentado por ahora
        params, 
        observe: 'response' 
      })
      .pipe(
        map((response) => {
          if (!this.validateStatus(response.status)) {
            throw new Error(`Estado inválido: ${response.status}`);
          }
          return response.body as T;
        }),
        catchError(this.handleError)
      );
  }

  put<T>(url: string, body: any, params?: HttpParams): Observable<T> {
    return this.http
      .put<T>(url, body, { 
        // headers: this.getHeaders(), // Comentado por ahora
        params, 
        observe: 'response' 
      })
      .pipe(
        map((response) => {
          if (!this.validateStatus(response.status)) {
            throw new Error(`Estado inválido: ${response.status}`);
          }
          return response.body as T;
        }),
        catchError(this.handleError)
      );
  }

  patch<T>(url: string, body: any, params?: HttpParams): Observable<T> {
    return this.http
      .patch<T>(url, body, { 
        // headers: this.getHeaders(), // Comentado si aún no usas JWT
        params, 
        observe: 'response' 
      })
      .pipe(
        map((response) => {
          if (!this.validateStatus(response.status)) {
            throw new Error(`Estado inválido: ${response.status}`);
          }
          return response.body as T;
        }),
        catchError(this.handleError)
      );
  }  

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http
      .delete<T>(url, { 
        // headers: this.getHeaders(), // Comentado por ahora
        params, 
        observe: 'response' 
      })
      .pipe(
        map((response) => {
          if (!this.validateStatus(response.status)) {
            throw new Error(`Estado inválido: ${response.status}`);
          }
          return response.body as T;
        }),
        catchError(this.handleError)
      );
  }
}
