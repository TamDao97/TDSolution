/*
 * created by:tamdc
 * create date: 07/9/2024
 */

using Microsoft.AspNetCore.Mvc;
using Reservation.API.Attributes;
using Reservation.API.Controllers.Base;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.Services;
using TD.Lib.Common;

namespace Reservation.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [TDModule("Quản lý quyền", 1)]
    public class RoleController : BaseController<Role, RoleDto>
    {
        private readonly ILogger<RoleController> _logger;
        private readonly IRoleService _roleService;

        public RoleController(ILogger<RoleController> logger, IRoleService roleService) : base(roleService)
        {
            _logger = logger;
            _roleService = roleService;
        }

        /// <summary>
        /// Quét module chức năng
        /// </summary>
        /// <returns></returns>
        [Route("scan-permission")]
        [HttpPost]
        public async Task<ActionResult<Response>> ScanPermissionAsync()
        {
            return Ok(await _roleService.ScanPermissionAsync());
        }

        /// <summary>
        /// Xem module chức năng theo quyền
        /// </summary>
        /// <param name="idRole"></param>
        /// <returns></returns>
        [Route("get-permission-by-role/{idRole}")]
        [HttpGet]
        public async Task<ActionResult<Response<List<PermissionGroupByModuleDto>>>> GetPermissionByRoleAsync(Guid idRole)
        {
            return Ok(await _roleService.GetPermissionByRoleAsync(idRole));
        }

        /// <summary>
        /// Thêm module chức năng cho quyền
        /// </summary>
        /// <param name="dtoReq"></param>
        /// <returns></returns>
        [Route("add-permission-by-role")]
        [HttpPost]
        public async Task<ActionResult<Response<int>>> AddPermissionByRoleAsync(PermissionGroupByRoleCreateReqDto dtoReq)
        {
            return Ok(await _roleService.AddPermissionByRoleAsync(dtoReq));
        }
    }
}