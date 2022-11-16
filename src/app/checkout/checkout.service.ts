import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderDto } from '../DTOs/OrderDto';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private message: MessageService,
    private httpClient: HttpClient
  ) {}

  getAddressesByCustomerId(customerId: number) {
    return this.httpClient
      .get(
        `${environment.baseUrl}/customersAddressByCustomerId/?customerId=${customerId}`
      )
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            return res.data.customersAddresses;
          }
          return [];
        }),
        catchError(this.handleError<any>('Error get product', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.message.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: operation,
      });
      return of(result as T);
    };
  }
}
