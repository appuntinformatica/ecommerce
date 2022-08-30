import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';
import { NgbdModalConfirm } from './modal-confirm/ngbd-modal-confirm.component';


@NgModule({
  declarations: [ 
    HeaderComponent,
    LoadingSpinnerComponent,
    NgbdModalConfirm
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
    HeaderComponent,
    NgbdModalConfirm
  ]
})
export class SharedModule {}
