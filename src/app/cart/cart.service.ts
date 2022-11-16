import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private httpClient: HttpClient,
    private message: MessageService
  ) {}

  getCart() {
    return this.httpClient.get(`${environment.baseUrl}/user/carts`).pipe(
      map((res: any) => {
        if (res.statusCode === 200) {
          return res.data.cartDto;
        }
        return [];
      })
    );
  }
  addToCart(cid: number, cartItemDto: CartItemDto) {
    return this.httpClient
      .post(`${environment.baseUrl}/user/cartItem/${cid}`, cartItemDto)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 201) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Thêm giỏ hàng thành công',
            });
            return res.data.cartItemDto;
          }
          return [];
        }),
        catchError(this.handleError<any>('Thêm giỏ hàng thất bại', []))
      );
  }
  // addCartItem(cartItemDto: CartItemDto): Observable<any> {
  //   return this.httpClient.post<any>(`${environment.baseUrl}/carts`, cartItemDto);
  // }

  deleteCartItem(id: any) {
    return this.httpClient
      .delete(`${environment.baseUrl}/user/cartItem/${id}`)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xóa sản phẩm thành công',
            });
          }
          return true;
        }),
        catchError(this.handleError<any>('Xóa sản phẩm thất bại', false))
      );
  }

  updateCartItem(cartItemDto: CartItemDto, cartId: number): Observable<any> {
    return this.httpClient
      .put(`${environment.baseUrl}/user/cartItem/${cartId}`, cartItemDto)
      .pipe(
        map((res: any) => {
          return true;
        }),
        catchError(this.handleError<any>('Câp nhật số lượng thất bại', false))
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
