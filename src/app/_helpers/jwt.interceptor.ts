import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem("access_token")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        }
      });
    }
    return next.handle(request);
  }
}
