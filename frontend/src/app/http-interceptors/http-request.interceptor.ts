import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';

import * as fromShared from './../shared/state/shared.actions';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("HttpRequestInterceptor.intercept()");

    this.store.dispatch(fromShared.setLoadingSpinner({ status: true }));
          
    return next.handle(request);
  }
}
