import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(private httpClient: HttpClient) {}

  getProductById(productId: string) {
    return this.httpClient
      .get(`${environment.baseUrl}/admin/product/${productId}`)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            return res.data.product;
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
