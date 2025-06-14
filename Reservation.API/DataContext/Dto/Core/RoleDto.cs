using Microsoft.AspNetCore.Identity;
using Reservation.API.DataContext.Dto.Base;
using Reservation.API.DataContext.Entity.Core;
using TD.Lib.Common;

namespace Reservation.API.DataContext.Dto.Core
{
    public class RoleDto : BaseDto
    {
        public string Code { get; set; }
        public virtual string Name { get; set; }
        public string? Description { get; set; }
    }

    public class RoleGridFilter : GridFilterBase
    {
    }

    public class PermissionGroupByModuleDto
    {
        public string ModuleCode { get; set; }
        public string ModuleDescription { get; set; }
        public int ModuleOrder { get; set; }
        public List<PermissionViewDto> LstPermissions { get; set; } = new List<PermissionViewDto>();
    }

    public class PermissionGroupByRoleCreateReqDto
    {
        public Guid IdRole { get; set; }
        public List<Guid> LstIdPermissions { get; set; } = new List<Guid>();
    }
}
