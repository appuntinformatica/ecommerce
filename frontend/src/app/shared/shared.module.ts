import { EffectsModule } from '@ngrx/effects';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ 
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    RouterModule
  ],
  exports: [
    LoadingSpinnerComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
