using EmployeeAPI.Context.Models;
using EmployeeAPI.Context.Models.Constants;
using EmployeeAPI.Utilities.EnumHelpers;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeAPI.Context
{
    public static class DbInitializer
    {
        public static void Initialize(EmployeeContext context)
        {
            context.Database.EnsureCreated();

            if (context.DbChangeLogs.Any())
            {
                return;
            }

            CreateSeedEmployeeTypes(context);
            CreateSeedEmployees(context);

            DbChangeLog changeLog = new DbChangeLog
            {
                Log = "Employee Db created with Seed Data"
            };
            context.DbChangeLogs.Add(changeLog);
            context.SaveChanges();
        }

        private static void CreateSeedEmployeeTypes(EmployeeContext context)
        {
            List<EmployeeType> employeeTypes = new List<EmployeeType>
            {
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.ProjectManager), Name = EmployeeTypeEnum.ProjectManager.GetDescription() } ,
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.ProductionManager), Name = EmployeeTypeEnum.ProductionManager.GetDescription() } ,
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.GeneralManager), Name = EmployeeTypeEnum.GeneralManager.GetDescription() } ,
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.HRDirector), Name = EmployeeTypeEnum.HRDirector.GetDescription() } ,
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.SeniorEditor), Name = EmployeeTypeEnum.SeniorEditor.GetDescription() } ,
                new EmployeeType { Id = GuidEnum.GetGuid(EmployeeTypeEnum.Editor), Name = EmployeeTypeEnum.Editor.GetDescription() } ,
            };
            context.EmployeeTypes.AddRange(employeeTypes);
            context.SaveChanges();
        }

        private static void CreateSeedEmployees(EmployeeContext context)
        {
            List<Employee> employees = new List<Employee>
            {
                new Employee { FullName = "John Doe", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.ProjectManager),
                    PhoneNumber = "(437) 340-4687", Address = "835 Eglinton Ave. E Toronto M4G4G9" },
                new Employee { FullName = "Roger Flynn", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.ProductionManager),
                    PhoneNumber = "(647) 789-0909", Address = "4100 Ponytail Dr. Mississauga L4W2Y1" },
                new Employee { FullName = "Alex Virasamy", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.GeneralManager),
                    PhoneNumber = "(416) 468-9647", Address = "675 Bloor St. W Toronto M6G1L3" },
                new Employee { FullName = "Kyle Pitt", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.HRDirector),
                    PhoneNumber = "(647) 438-5347", Address = "93 Front St. E Toronto M5E1C3" },
                new Employee { FullName = "Elizabeth James", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.SeniorEditor),
                    PhoneNumber = "(437) 438-6789", Address = "4455 Sheppard Ave. E Scarborough M1S3G9" },
                new Employee { FullName = "Shelly Bell", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.Editor),
                    PhoneNumber = "(416) 473-6438", Address = "10165 Yonge St. Richmond Hill L4C1T5" },
                new Employee { FullName = "Martin Ziberman", EmployeeTypeId = GuidEnum.GetGuid(EmployeeTypeEnum.Editor),
                    PhoneNumber = "(416) 973-4670", Address = "58 Marine Parade Dr. Toronto M8V4G1" },
            };
            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
}
