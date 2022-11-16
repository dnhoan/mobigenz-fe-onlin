import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AccountService } from 'src/service/account.service';
import { CustomerService } from 'src/service/customer.service';
import { SessionService } from 'src/service/session.service';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  account: Account = {};

  private readonly authUrl = `${environment.baseUrl}/`;

  public customerUrl = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService,
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  public login(form: any): Observable<any> {
    return this.http.post(this.authUrl + 'login', form);
  }


  // setCustomerName(customerUrl: any) {
  //   this.customerUrl.next(customerUrl);
  // }

  // getCustomer() {
  //   let email = this.sessionService.getItem('auth-user');
  //   const user = {} = this.accountService.getAccountByEmail(email);
  //   this.customerService.getCustomerByAccountId(user).subscribe(
  //     (res) => {
  //       if (res.object.accountId) {
  //         this.customerUrl.next(
  //           'http://localhost:9090/api/getCustomerByAccountId=accountId?' +
  //           res.object.accountId
  //         );
  //         console.log(res.object.customerName);

  //       }
  //     },
  //     (error) => {}
  //   );
  // }
}
