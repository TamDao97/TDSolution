/*
 * created by:tamdc
 * create date: 29/9/2024
 */

/* Attribute này thực hiện authen & author trên hệ thống */

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Reflection;
using Reservation.API.Services;

namespace Reservation.API.Attributes
{
    public class TDAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public TDAuthorizeAttribute()
        {
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Kiểm tra xác thực
            var isAuthenticated = context.HttpContext.User.Identity.IsAuthenticated;

            if (!isAuthenticated)
            {
                // Nếu không xác thực, trả về 401 Unauthorized
                context.Result = new UnauthorizedResult();
                return;
            }

            var permissionCode = ExtractPermissionFromFunc(context);

            // Nếu không có permissionCode, không cần kiểm tra quyền
            if (string.IsNullOrEmpty(permissionCode)) return;

            // Kiểm tra quyền theo yêu cầu
            var userHasPermission = CheckUserPermission(context, permissionCode);
            if (!userHasPermission)
            {
                // Nếu không có quyền, trả về 403 Forbidden
                context.Result = new ForbidResult();
            }
        }

        private bool CheckUserPermission(AuthorizationFilterContext context, string permissionCode)
        {
            // Lấy IServiceProvider
            var serviceProvider = context.HttpContext.RequestServices;

            // Lấy service user
            var authenService = serviceProvider.GetService(typeof(IAuthService)) as IAuthService;

            //Logic check quyền
            var currentUser = authenService.GetCurrentUserAsync(context.HttpContext.User.Identity.Name).Result.Data;

            if (currentUser is null || !currentUser.Permissions.Any(r => r == permissionCode))
                return false;

            return true;
        }

        private string ExtractPermissionFromFunc(AuthorizationFilterContext context)
        {
            // Lấy ActionDescriptor để truy cập thông tin về action method hiện tại
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;

            //if (actionDescriptor != null) return string.Empty;

            // Lấy tên lớp chứa phương thức
            var controllerType = actionDescriptor.ControllerTypeInfo;

            //// Lấy attribute của lớp
            //var moduleAttribute = controllerType.GetCustomAttributes<TDModuleAttribute>().FirstOrDefault();

            // Lấy các attribute của phương thức
            var permissionAttribute = actionDescriptor.MethodInfo.GetCustomAttributes<TDPermissionAttribute>().FirstOrDefault();

            if (permissionAttribute is null || string.IsNullOrEmpty(permissionAttribute.PermissionCode)) //Hàm này không yêu cầu phân quyền
            {
                return string.Empty;
            }
            return $"{controllerType.Name}_{permissionAttribute.PermissionCode}";
        }
    }
}

