import { HttpClient, HttpHeaders } from '@angular/common/http';
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
            return res.data.addresses;
          }
          return [];
        }),
        catchError(this.handleError<any>('Error get product', []))
      );
  }
  getFeeShip(address: string, province: string, district: string) {
    let data = {
      package_type: 'express',
      pick_province: 'Hà Nội',
      pick_district: 'Quận Từ Liêm',
      province,
      district,
      address,
      weight: 500,
      value: 0,
      tags: [14],
      transport: 'road',
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.token_ghtk}`,
    });
    return this.httpClient
      .post(`${environment.apiGHTK}`, data, { headers })
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.fee.ship_fee_only;
          }
          return 0;
        }),
        catchError(this.handleError<any>('Lỗi tính phí giao dịch', 0))
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
