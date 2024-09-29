/*
 * created by:tamdc
 * create date: 07/9/2024
 */

/* Attribute này đặt trên các controller phục vụ quét quyền trên hệ thống */
namespace Reservation.API.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class TDModuleAttribute : Attribute
    {
        public string Description { get; }
        public int Order { get; }

        public TDModuleAttribute(string description, int order)
        {
            Description = description;
            Order = order;
        }
    }
}
