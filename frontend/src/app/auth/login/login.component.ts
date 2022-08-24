import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/app.state';

import * as fromSharedActions from '../../shared/state/shared.actions';
import * as fromAuthActions from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('LoginComponent.ngOnInit()');
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLoginSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    // this.store.dispatch(fromSharedActions.setLoadingSpinner(true));
    this.store.dispatch(fromAuthActions.loginStart({ username, password }));
  }

}
