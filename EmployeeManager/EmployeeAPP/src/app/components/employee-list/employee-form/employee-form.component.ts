import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IEmployeeType } from 'src/app/models/employee-type.interface';
import { IEmployee } from 'src/app/models/employee.interface';
import { MakeProvider, ValueAccessor } from 'src/app/shared/value-accessor..class';
import { EmployeeApiService } from '../../../services/employee-api.service';

@Component({
  selector: 'em-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MakeProvider(EmployeeFormComponent)]
})
export class EmployeeFormComponent extends ValueAccessor<IEmployee>
  implements OnInit {
    @Input() public isDisabled = true;
    @Output() public onSaveSuccess: EventEmitter<any> = new EventEmitter();

    public employeeTypes: IEmployeeType[] = [];
    public isDirty = false;

    constructor(
      private employeeApiService: EmployeeApiService
    ) {
      super();
     }
  
    public ngOnInit() {
      this.load();
    }

    public save() {
      if (!this.value.id) {
        this.employeeApiService
          .createEmployee(this.value)
          .subscribe((employee: IEmployee) => {
            this.onSaveSuccess.emit(employee);
          });
      } else {
        this.employeeApiService
        .updateEmployee(this.value.id, this.value)
        .subscribe((employee: IEmployee) => {
          this.onSaveSuccess.emit(employee);
        });
      }
    }

    public getIsValid(): boolean {
      const isValid =  !!this.value &&
        !!this.value.fullName &&
        !!this.value.employeeTypeId &&
        !!this.value.phoneNumber &&
        !!this.value.address
      return isValid;
    }

    private load() {
      this.employeeApiService
        .getEmployeeTypes()
        .subscribe(
          (employeeTypes: IEmployeeType[]) => this.employeeTypes = employeeTypes
      );
    }
}
