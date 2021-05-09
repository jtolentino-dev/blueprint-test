using System;
using System.Linq;
using System.Reflection;
using System.ComponentModel;

namespace EmployeeAPI.Utilities.EnumHelpers
{
    public static class EnumExtension
    {
        public static string GetDescription(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var descriptionAttribute = field.GetCustomAttribute<DescriptionAttribute>(false);

            return descriptionAttribute?.Description ?? String.Empty;
        }
    }
}
