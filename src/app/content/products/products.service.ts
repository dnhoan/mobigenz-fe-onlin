import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(`${environment.baseUrl}/admin/products`).pipe(
      map((res: any) => {
        if (res.statusCode === 200) {
          return res.data.products;
        }
        return [];
      }),
      catchError(this.handleError<any>('Error get product', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // this.message.error(operation);
      return of(result as T);
    };
  }
}
