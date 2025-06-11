using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity.Core
{
    public class Page : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Url { get; set; } = string.Empty;
        public string? Icon { get; set; } = string.Empty;
        public bool? IsActive { get; set; } = true;
        public bool? IsTab { get; set; } = false;
        public bool? IsHomePage { get; set; } = false;
        public Guid? IdParent { get; set; }
        public string? PermissionCode { get; set; }
        public int? Order { get; set; }
    }
}
