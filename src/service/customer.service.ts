import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/login/account.model';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public apiCustomer = `${environment.baseUrl}/`;


  constructor(private http: HttpClient,
    private sessionService: SessionService,
    ) {
  }

  getAll(offset: any, limit: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "admin/customers?offset=" + offset + "&limit=" + limit
    );
  }


  getCustomerById(id: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "admin/customers/getCustomerById" + id);
  }

  getCustomerByAccountId(accountId: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "admin/customers/getCustomerByAccountId?accountId=" + accountId);
  }

  getCustomerByCusName(customerName: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "admin/customers/customerName?customerName=" + customerName);
  }

  getCustomerByEmail(email: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "admin/customers/email?email=" + email);
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.apiCustomer + 'customers', customer);
  }


  public updateCustomer(customer: Customer): Observable<any> {
    return this.http.put<any>(this.apiCustomer + 'admin/customers', customer);
  }


  userGetCustomerByEmail(email: any): Observable<any> {
    return this.http.get<any>("http://localhost:8080/user/customers/email?email=" + email);
  }

}

