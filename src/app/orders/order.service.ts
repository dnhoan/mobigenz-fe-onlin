import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderDto } from '../DTOs/OrderDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private message: MessageService
  ) {}

  createOrder(orderDto: OrderDto) {
    return this.httpClient
      .post(`${environment.baseUrl}/user/order`, orderDto)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 201) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Tạo đơn hàng thành công',
            });
            return res.data.result;
          }
        }),
        catchError(this.handleError<any>('Lỗi tạo đơn hàng', false))
      );
  }
  cancelOrder(order_id: number, note: string) {
    return this.httpClient
      .put(`${environment.baseUrl}/user/cancelOrder/${order_id}`, note)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Đơn hàng đã được hủy',
            });
            return res.data.result;
          }
          return false;
        }),
        catchError(this.handleError<any>('Lỗi hủy đơn hàng', false))
      );
  }
  getOrders(customer_id: number) {
    return this.httpClient
      .get(`${environment.baseUrl}/user/customerOrders/${customer_id}`)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            return res.data.orders;
          }
        }),
        catchError(this.handleError<any>('Lỗi gọi danh sách đơn hàng', false))
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
