using EmployeeAPI.Context.Models.Shared;
using System;

namespace EmployeeAPI.Context.Models
{
    public class Employee : Base
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Guid EmployeeTypeId { get; set; }

        public EmployeeType EmployeeType { get; set; }
    }
}
