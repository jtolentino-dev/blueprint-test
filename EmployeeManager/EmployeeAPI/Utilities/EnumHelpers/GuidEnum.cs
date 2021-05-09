using System;
using System.Reflection;

namespace EmployeeAPI.Utilities.EnumHelpers
{
    public static class GuidEnum
    {
        private static Guid GetGuid(Type type, string name)
        {
            return type.GetField(name).GetCustomAttribute<GuidValueAttribute>().Guid;
        }

        public static Guid GetGuid(Enum enumValue)
        {
            Type type = enumValue.GetType();
            if (!type.IsEnum)
                throw new Exception();
            return GetGuid(type, enumValue.ToString());
        }

        public static T CreateFromGuid<T>(Guid guid)
        {
            Type type = typeof(T);
            if (!type.IsEnum)
                throw new Exception();
            foreach (var value in Enum.GetValues(type))
            {
                if (guid == GetGuid(type, value.ToString()))
                    return (T)value;
            }
            throw new Exception();
        }
    }
}
