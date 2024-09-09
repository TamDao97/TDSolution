namespace Reservation.API.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class TDPermissionAttribute : Attribute
    {
        public string PermissionCode { get; }
        public string Description { get; }
        public string? RoleCodes { get; }

        public TDPermissionAttribute(string permissionCode, string description)
        {
            PermissionCode = permissionCode;
            Description = description;
        }

        public TDPermissionAttribute(string permissionCode, string description, string roleCodes)
        {
            PermissionCode = permissionCode;
            Description = description;
            RoleCodes = roleCodes;
        }
    }
}
