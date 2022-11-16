import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { SessionService } from './session.service';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { Account } from 'src/app/login/account.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  public customer = new BehaviorSubject<any>(null);

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  setCustomer(cusUrl: any) {
    this.customer.next(cusUrl);
  }

  getCustomer() {
    let decode = this.accountService.getDecodedAccessToken();
    if (decode) {
      this.customerService.getCustomerByEmail(decode.sub).subscribe(
        (value) => {
          this.customer.next(value.data.customers);
        },
        (Error) => {
          this.customer.next(null);
        }
      );
    }
  }
}
