import { EffectsModule } from '@ngrx/effects';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthEffects } from './state/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RecoveryPasswordComponent } from './recoveryPassword/recovery-password.component';
import { AuthMessageComponent } from './auth-message/auth-message.component';

const routes: Routes = [
 
  {
    path: '',
    children: [
      { path: 'recoveryPassword', component: RecoveryPasswordComponent },
      { path: 'auth-message', component: AuthMessageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  
];

@NgModule({
  declarations: [ 
    LoginComponent,
    RecoveryPasswordComponent,
    AuthMessageComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}
