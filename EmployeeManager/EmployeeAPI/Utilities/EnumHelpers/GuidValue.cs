using System;

namespace EmployeeAPI.Utilities.EnumHelpers
{
    [AttributeUsage(AttributeTargets.Field)]
    public class GuidValueAttribute : Attribute
    {
        public Guid Guid
        {
            get;
            private set;
        }

        public GuidValueAttribute(Guid guid)
        {
            this.Guid = guid;
        }

        public GuidValueAttribute(string stringGuid)
        {
            this.Guid = new Guid(stringGuid);
        }
    }
}
