using EmployeeAPI.Utilities.EnumHelpers;
using System.ComponentModel;

namespace EmployeeAPI.Context.Models.Constants
{
    public enum EmployeeTypeEnum
    {
        [GuidValue("48594cb2-4ba1-4222-89cb-4d22f4bb46c2")]
        [Description("Project Manager")]
        ProjectManager,

        [GuidValue("4effa7b1-03db-4809-aa40-bf448b8954f6")]
        [Description("Production Manager")]
        ProductionManager,

        [GuidValue("6289ab75-7a1d-4866-927d-3d967f0164fd")]
        [Description("General Manager")]
        GeneralManager,

        [GuidValue("9165bc48-8105-4393-b343-771c86c5add1")]
        [Description("HR Director")]
        HRDirector,

        [GuidValue("33c92384-bd40-4258-bff8-4cfbf8bd2e8c")]
        [Description("Senior Editor")]
        SeniorEditor,

        [GuidValue("0af79ac8-9e44-4025-a8b5-e9adf1767939")]
        [Description("Editor")]
        Editor
    }
}
