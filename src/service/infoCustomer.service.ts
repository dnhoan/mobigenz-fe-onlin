import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { SessionService } from './session.service';
import { BehaviorSubject, lastValueFrom, Subject } from 'rxjs';
import { AccountService } from './account.service';
import { Account, CustomerDTO } from 'src/app/login/account.model';
import { customerStore } from 'src/app/customer.repository';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  customer$ = new Subject<CustomerDTO>();
  currentCustomer!: CustomerDTO;
  constructor(
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
        this.customerService.getCustomerByEmail(decode.sub)
      );
      customerStore.update(() => ({
        customer: value.data.customers,
      }));
      this.currentCustomer = value.data.customers;
      this.customer$.next(value.data.customers);
    }
  }
}
