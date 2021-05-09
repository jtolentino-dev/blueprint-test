import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, noop } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { IEmployeeType } from '../../models/employee-type.interface';
import { getDefaultEmployee, IEmployee } from '../../models/employee.interface';
import { EmployeeApiService } from '../../services/employee-api.service';

@Component({
  selector: 'em-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent
  implements OnInit {
  public employeeTypes: IEmployeeType[] = [];
  public employees: IEmployee[] = [];
  public selectedEmployee: IEmployee | null = null;
  public isLoading = false;

  constructor(
    private employeeApiService: EmployeeApiService,
    private modalService: NgbModal
  ) { }

  public ngOnInit() {
    this.load();
  }

  public getEmployeeType(employeeTypeId: String) {
    if (!!this.employeeTypes && this.employeeTypes.length > 0) {
      return this.employeeTypes.find(et => et.id == employeeTypeId)?.name
    }

    return '';
  }

  public selectEmployee(employee: IEmployee) {
    if (this.selectedEmployee?.id !== employee.id && !this.isLoading) {
      this.selectedEmployee = { ...employee };
    }
  }

  public addNewEmployee() {
    this.selectedEmployee = getDefaultEmployee();
  }

  public refreshEmployee(employee: IEmployee) {
    const savedEmployee = this.employees.find(e => e.id == employee.id);
    if (!!savedEmployee) {
      Object.assign(savedEmployee, employee);
    } else {
      this.employees.push(employee);
      this.selectEmployee(employee);
    }
  }

  public deleteEmployee(event: Event, employee: IEmployee) {
    event.stopPropagation();
    if (!this.isLoading) {
      const message = `Are you sure that you want to delete employee: ${employee.fullName}?`
      const modalRef = this.createConfirmModalRef(message);

      modalRef.result.then(confirmed => {
        if (confirmed) {
          this.isLoading = true;
          this.employeeApiService.deleteEmployee(String(employee.id))
            .subscribe(() => {
              this.isLoading = false;
              if (this.selectedEmployee?.id === employee.id) {
                this.addNewEmployee();
              }
              this.employees = this.employees.filter(e => e !== employee);
            });
        }
      }, noop);
    }
  }

  private load() {
    this.isLoading = true;
    forkJoin({
      employeeTypes: this.employeeApiService
        .getEmployeeTypes(),
      employees: this.employeeApiService
        .getEmployees()
    })
    .subscribe(({employeeTypes, employees}) => {
      this.isLoading = false;
      this.employeeTypes = employeeTypes
      this.employees = employees;
      if (this.employees.length > 0) {
        this.selectEmployee(this.employees[0]);
      }
    }, error => {
      console.log(error);
    });
  }

  private createConfirmModalRef(message: String) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      size: 'md',
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.title = 'Confirm';
    modalRef.componentInstance.confirmButton = 'Yes';
    modalRef.componentInstance.cancelButton = 'Cancel';
    modalRef.componentInstance.body = message;

    return modalRef;
  }
}
