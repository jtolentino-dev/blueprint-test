import { NgModule } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal.component';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class ConfirmModalModule { }
