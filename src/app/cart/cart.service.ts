import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  getCart() {
    return this.httpClient.get(`${environment.baseUrl}/carts`).pipe(
      map((res: any) => {
        if (res.statusCode === 200) {
          return res.data.cart;
        }
        return [];
      })
    );
  }
}
