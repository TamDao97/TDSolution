using Microsoft.AspNetCore.Mvc;
using Reservation.API.Controllers.Base;
using Reservation.API.DataContext.Dto;
using Reservation.API.Services;
using TD.Lib.Common;

namespace Reservation.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ApiController
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        /// <summary>
        /// Đăng ký  
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<Response<bool>>> RegisterAsync(RegisterReq req)
        {
            return Ok(await _authService.RegisterAsync(req));
        }

        /// <summary>
        /// Đăng nhập
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<Response<CurrentUser>>> LoginAsync(LoginReq req)
        {
            return Ok(await _authService.LoginAsync(req));
        }

        /// <summary>
        /// Lấy thông tin người dùng hiện tại
        /// </summary>
        /// <returns></returns>
        [Route("get-current-user")]
        [HttpPost]
        public async Task<ActionResult<Response<CurrentUser>>> GetCurrentUserAsync()
        {
            return Ok(CurrentUser);
        }
    }
}