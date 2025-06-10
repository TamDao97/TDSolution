using Reservation.API.DataContext.Dto.Base;

namespace Reservation.API.DataContext.Dto.Core
{
    public class PageDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public int Order { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsTab { get; set; } = false;
        public bool IsHomePage { get; set; } = false;
        public Guid? IdParent { get; set; }
        public string PermissionCode { get; set; }
    }
}
