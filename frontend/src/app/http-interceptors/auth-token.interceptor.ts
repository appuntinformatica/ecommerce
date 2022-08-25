import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take, exhaustMap } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { getToken } from './../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        console.log('AuthTokenInterceptor.intercept() token: ', token);
        if (!token) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
