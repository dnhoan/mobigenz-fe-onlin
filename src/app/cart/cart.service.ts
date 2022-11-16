import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) { }

  getCart() {
    return this.httpClient.get(`${environment.baseUrl}/carts`).pipe(
      map((res: any) => {
        if (res.statusCode === 200) {
          return res.data.cartDto;
        }
        return [];
      })
    );
  }

  addCartItem(cartItemDto: CartItemDto): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/carts`, cartItemDto);
  }

  deleteCartItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}/carts` + id);
  }

  updateCartItem(cartItemDto: CartItemDto): Observable<any> {
    return this.httpClient.put<any>(`${environment.baseUrl}/carts`, cartItemDto);
  }
}
