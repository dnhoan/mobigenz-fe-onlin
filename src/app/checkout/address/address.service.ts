import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { CustomersAddress } from 'src/app/DTOs/CustomersAddress';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(
    private message: MessageService,
    private httpClient: HttpClient
  ) {}

  saveAddressByCustomerId(
    customerId: number,
    addressCustomer: CustomersAddress
  ) {
    return this.httpClient
      .put(
        `${environment.baseUrl}/customersAddress/${customerId}`,
        addressCustomer
      )
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
            });
            return res.data.address;
          }
          return [];
        }),
        catchError(this.handleError<any>('Error lưu địa chỉ', []))
      );
  }
  deleteAddress(addressId: number) {
    return this.httpClient
      .delete(`${environment.baseUrl}/customersAddress/${addressId}`)
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
            });
            return res.data.res;
          } else {
            this.message.add({
              severity: 'error',
              summary: 'Lỗi xóa địa chỉ',
            });
            return res.data.res;
          }
          return [];
        }),
        catchError(this.handleError<any>('Error xóa địa chỉ', []))
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
