import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { exhaustMap, map } from 'rxjs/operators';

import { AppState } from './../store/app.state';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isAuthenticated } from '../auth/state/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        console.log('AuthGuard.canActivate() map authenticate = ', authenticate);
        if (!authenticate) {
          return this.router.createUrlTree(['login']);
        }
        return true;
      })
    );
  }
}
