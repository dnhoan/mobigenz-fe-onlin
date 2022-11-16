import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './account.service';
import { CustomerService } from './customer.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private cookie: CookieService,
    private accountService: AccountService,
    private customerService: CustomerService
  ) {
  }

  getToken() {
    const token = window.localStorage.getItem(TOKEN_KEY);
    return token;
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    this.cookie.delete(TOKEN_KEY);
  }

  public saveAccount(account: any): void {

    const data = this.accountService.getDecodedAccessToken();
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(account));
    // window.localStorage.setItem(customer: this.customerService.getCustomerByAccountId(this.accountService.getAccountById(USER_KEY)))
    console.log(account);

  }

  public getAccount(): any {
    const account = window.localStorage.getItem(USER_KEY);
    if (account) {
      return JSON.parse(account);
    }

    return {};
  }


}

