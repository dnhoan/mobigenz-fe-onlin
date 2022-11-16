import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "customers");
  }


  getCustomerById(id: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "customers/" + id);
  }

  getCustomerByAccountId(accountId: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "getCustomerByAccountId?accountId=" + accountId);
  }

  getCustomerByCusName(customerName: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "customers/customerName?customerName=" + customerName);
  }

  getCustomerByEmail(email: any): Observable<any> {
    return this.http.get<any>(this.apiCustomer + "customers/email?email=" + email);
  }




}

