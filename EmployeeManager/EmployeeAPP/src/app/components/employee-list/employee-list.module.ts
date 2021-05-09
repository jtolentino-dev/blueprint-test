import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmModalModule } from 'src/app/shared/components/confirm-modal/confirm-modal.module';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';


@NgModule({
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  imports: [
    EmployeeListRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    ConfirmModalModule
  ],
  exports: [
    EmployeeListRoutingModule
  ]
})
export class EmployeeListModule { }
