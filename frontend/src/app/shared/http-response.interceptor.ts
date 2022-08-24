import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, take, exhaustMap, map, tap, catchError, of } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';

import * as fromShared from './state/shared.actions';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log("HttpResponseInterceptor.intercept()");
            this.store.dispatch(fromShared.setLoadingSpinner({ status: false }));
          }
          return event;
      }),
      catchError(error => {
        console.log("HttpResponseInterceptor.intercept() error: ", error);
        this.store.dispatch(fromShared.setLoadingSpinner({ status: false }));
        throw error;
      })
    );
  }
}
