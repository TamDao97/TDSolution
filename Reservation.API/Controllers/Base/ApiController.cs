using Microsoft.AspNetCore.Mvc;
using Reservation.API.DataContext.Dto;
using Reservation.API.Services;

namespace Reservation.API.Controllers.Base
{
    public abstract partial class ApiController : ControllerBase
    {
        protected CurrentUser CurrentUser { get { return GetCurrentUser(); } }

        CurrentUser? GetCurrentUser()
        {
            var service = (IAuthService)HttpContext.RequestServices.GetServices(typeof(IAuthService)).SingleOrDefault();
            return service?.GetCurrentUser(HttpContext?.User?.Identity?.Name ?? string.Empty).Result.Data;
        }
    }
}
