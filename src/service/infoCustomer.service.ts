import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { SessionService } from './session.service';
import { BehaviorSubject, lastValueFrom, Observable, Subject } from 'rxjs';
import { AccountService } from './account.service';
import { Account, CustomerDTO } from 'src/app/login/account.model';
import { customerStore } from 'src/app/customer.repository';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  customer$ = new Subject<CustomerDTO>();
  currentCustomer!: CustomerDTO;
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  setCustomer(cusUrl: any) {
    this.customer$.next(cusUrl);
  }

  async getCustomer() {
    let decode = this.accountService.getDecodedAccessToken();
    if (decode) {
      let value = await lastValueFrom(
        this.userGetCustomerByEmail(decode.sub)
      );
      customerStore.update(() => ({
        customer: value.data.customers,
      }));
      this.currentCustomer = value.data.customers;
      this.customer$.next(value.data.customers);
      console.log(this.customer$);

    }
  }


  userGetCustomerByEmail(email: any): Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/user/customer/email?email=" + email);
  }
}
