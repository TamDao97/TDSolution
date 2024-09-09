using Reservation.API.DataContext.Dto.Base;

namespace Reservation.API.DataContext.Dto.Core
{
    public class PermissionDto : BaseDto
    {
        public string ModuleCode { get; set; }
        public string ModuleDescription { get; set; }
        public int ModuleOrder { get; set; }

        public string PermissionCode { get; set; }
        public string? Description { get; set; }
    }

    public class PermissionViewDto : PermissionDto
    {
        public bool IsChecked { get; set; }
    }
}
