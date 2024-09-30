using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Attributes;
using Reservation.API.Commons;
using Reservation.API.Controllers.Base;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.Services;
using TD.Lib.Common;

/*
 * Note*:
 * - Đặt attr TDModule để đánh dấu tạo ra nhóm module
 * - Đặt attr TDPermission để đánh dấu sinh ra mã quyền, những role được phép truy cập
 * - Đặt attr TDAuthorize để thực hiện việc authen & author 
 */
namespace Reservation.API.Controllers
{
    //[TDAuthorize]
    [TDModule("Quản lý tài khoản", 2)]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiController
    {
        private static List<Dropdown> LstItem = new List<Dropdown>();
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;

            for (int i = 0; i < 1000; i++)
            {
                LstItem.Add(new Dropdown { Value = i + 1, Text = $"Đào Lê{i + 1}" });
            }
        }

        /// <summary>
        /// Tạo tài khoản
        /// </summary>
        /// <param name="reqDto"></param>
        /// <returns></returns>
        [Route("user-create")]
        [HttpPost]
        public async Task<ActionResult<Response<UserCreateResDto>>> CreateAsync(UserCreateReqDto reqDto)
        {
            return Ok(await _userService.CreateAsync(reqDto));
        }

        /// <summary>
        /// Cập nhập tài khoản
        /// </summary>
        /// <param name="reqDto"></param>
        /// <returns></returns>
        [Route("user-update")]
        [HttpPost]
        public async Task<ActionResult<Response<UserCreateResDto>>> UpdateAsync(UserCreateReqDto reqDto)
        {
            return Ok(await _userService.UpdateAsync(reqDto));
        }

        /// <summary>
        /// Xóa tài khoản
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("user-delete/{id}")]
        [HttpPost]
        public async Task<ActionResult<Response<bool>>> DeleteAsync(Guid id)
        {
            return Ok(await _userService.DeleteAsync(id));
        }

        /// <summary>
        /// Xem chi tiết tài khoản
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [TDPermission("GetByIdAsync", "Xem chi tiết tài khoản", $"{RoleCodes.ThuNgan}, {RoleCodes.LeTan}")]
        [Route("user-getbyid/{id}")]
        [HttpGet]
        public async Task<ActionResult<Response<UserDto>>> GetByIdAsync(Guid id)
        {
            return Ok(await _userService.GetByIdAsync(id));
        }

        [AllowAnonymous]
        [Route("fake-data")]
        [HttpPost]
        public async Task<ActionResult<Response<List<Dropdown>>>> GetTestDatas(GridFilterBase filter)
        {
            var totalRecord = LstItem.Count;
            var datas = LstItem.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToList();
            return Ok(Response<List<Dropdown>>.Success(datas, "success!"));
        }
    }
}
