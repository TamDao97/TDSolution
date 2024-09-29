/*
 * created by:tamdc
 * create date: 07/9/2024
 */

/* Attribute này đặt trên các controller phục vụ quét quyền trên hệ thống */

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
