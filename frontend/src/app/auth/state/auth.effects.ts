import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs';

import * as fromShared from './../../shared/state/shared.actions';

import * as fromAuth from './auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AppState } from 'src/app/store/app.state';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.loginStart),
      tap((action) => console.log('loginEffect$ action: ', action)),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
        //    this.store.dispatch(fromShared.setLoadingSpinner(false));
            this.store.dispatch(fromShared.setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            console.log('-> loginSuccess');
            return fromAuth.loginSuccess({ user, redirect: true });
          }),
          catchError((errResp: HttpErrorResponse) => {
          //  this.store.dispatch(fromShared.setLoadingSpinner(false));
            const errorMessage = this.authService.getErrorMessage(
              errResp.message
            );
            console.log('-> error', errorMessage);
            return of(fromShared.setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirectEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[fromAuth.loginSuccess]),
        tap((action) => {
          console.log('loginRedirectEffect$ action', action);
          this.store.dispatch(fromShared.setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLoginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.autoLogin),
      tap((action) => console.log('autoLoginEffect$ action: ', action)),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage()!;
        if ( user != null ) {
          console.log("autoLoginEffect$ user != null");
          return of(fromAuth.loginSuccess({ user, redirect: false }));
        } else {
          console.log("autoLoginEffect$ user == null");
          return of(fromAuth.autoLogout());
        }
      })
    );
  });

  autoLgoutEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(fromAuth.autoLogout),
        tap(() => console.log('autoLogoutEffect$')),
        map((action) => {
          console.log('autoLogoutEffect$ action: ', action)
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );

  recoveryPasswordStartEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.recoveryPasswordStart),
      tap((action) => console.log('recoveryPasswordStartEffect$ action: ', action)),
      exhaustMap((action) => {
        return this.authService.recoveryPassword(action.email).pipe(
          map((data) => {
          //  this.store.dispatch(fromShared.setLoadingSpinner({ status: false }));
            this.store.dispatch(fromShared.setErrorMessage({ message: '' }));
            this.router.navigate(['auth-message']);
            return fromAuth.dummyAction();
          }),
          catchError((errResp: HttpErrorResponse) => {
            console.log(`errResp: ${errResp}`);
          //  this.store.dispatch(fromShared.setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.message
            );
            return of(fromShared.setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

}
