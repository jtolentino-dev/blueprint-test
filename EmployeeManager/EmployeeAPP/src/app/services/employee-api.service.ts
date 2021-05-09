import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IEmployeeType } from '../models/employee-type.interface';
import { IEmployee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  private employeeTypes: IEmployeeType[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  public getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>('/api/employees');
  }

  public getEmployeeTypes(forceRefresh = false): Observable<IEmployeeType[]> {
    if (this.employeeTypes.length == 0 || forceRefresh) {
      return this.httpClient.get<IEmployeeType[]>('/api/employees/types').pipe(tap((response: IEmployeeType[]) => {
        this.employeeTypes = response;
      }));
    } else {
      return of(this.employeeTypes);
    }
  }

  public createEmployee(
    employee: IEmployee
  ): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>('/api/employees',
      employee
    );
  }

  public updateEmployee(
    employeeId: string,
    employee: IEmployee
  ): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(`/api/employees/${employeeId}`,
      employee
    );
  }

  public deleteEmployee(
    employeeId: string
  ): Observable<any> {
    return this.httpClient.delete(`/api/employees/${employeeId}`);
  }
}
