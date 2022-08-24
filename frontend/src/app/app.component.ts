import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';

import * as fromAuthSelector from './auth/state/auth.selector';
import * as fromAuthActions from './auth/state/auth.actions';
import * as fromSharedSelector from './shared/state/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterContentChecked {

  authenticated$ = this.store.select(fromAuthSelector.isAuthenticated);
  showLoading$ = this.store.select(fromSharedSelector.getLoading);
  errorMessage$ = this.store.select(fromSharedSelector.getErrorMessage);

  constructor(private store: Store<AppState>, private changeDedectionRef: ChangeDetectorRef) {}

  ngOnInit() {
    /*
    this.authenticated$ = this.store.select(fromAuthSelector.isAuthenticated);
    this.showLoading$ = this.store.select(fromSharedSelector.getLoading);
    this.errorMessage$ = this.store.select(fromSharedSelector.getErrorMessage);
    */
    this.store.dispatch(fromAuthActions.autoLogin());

    //this.showLoading$ = this.store.select(fromSharedSelector.getLoading);
  }

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
}
}
