export interface IEmployee {
  id?: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  employeeTypeId: string;
}

export function getDefaultEmployee(): IEmployee {
  return {
    fullName: '',
    address: '',
    phoneNumber: '',
    employeeTypeId: '',
  };
}