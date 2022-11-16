import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import { TokenService } from "src/service/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token!: string;
  constructor( private router: Router,
               private  tokenSevice: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( this.tokenSevice.getToken() != null) {
      const tokenInfo = this.tokenSevice.getToken();
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization','Bearer ' + tokenInfo) });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error['status'] === 403) {
            this.tokenSevice.removeToken();
            this.router.navigate(['/login/']);
          }
          return throwError(error);
        }),
      );
    }
    return next.handle(req);
  }

}
