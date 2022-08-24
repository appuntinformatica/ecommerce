import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/app.state';

import * as fromSharedActions from '../../shared/state/shared.actions';
import * as fromAuthActions from '../state/auth.actions';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('RecoveryPasswordComponent.ngOnInit()');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    //this.store.dispatch(fromSharedActions.setLoadingSpinner({ status: true }));
    this.store.dispatch(fromAuthActions.recoveryPasswordStart({ email }));
  }

}
