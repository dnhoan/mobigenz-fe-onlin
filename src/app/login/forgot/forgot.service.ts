import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  private readonly forgotAPI = `${environment.baseUrl}/`;

  constructor(private http: HttpClient) {}

  sendOtp(email: any): Observable<any> {
    return this.http.get<any>(this.forgotAPI + 'forgot?email=' + email);
  }

  getOTP(email: any) {
    return this.http.get<any>(this.forgotAPI + 'getOTP?email=' + email);
  }

  changepass(email: any, otp: string, password: string, repassword: string): Observable<any> {
    return this.http.get<any>(this.forgotAPI + 'changepass?email=' + email + "&isOtp=" + otp + "&password=" + password + "&repassword=" + repassword);
  }
}
