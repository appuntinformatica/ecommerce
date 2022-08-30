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
import { AuthFormComponent } from './auth-form/auth-form.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'recoveryPassword', component: RecoveryPasswordComponent },
      { path: 'auth-message', component: AuthMessageComponent },
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: AuthFormComponent },
    ],
  },
  
];

@NgModule({
  declarations: [
    AuthFormComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    AuthMessageComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes),
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class AuthModule {}
