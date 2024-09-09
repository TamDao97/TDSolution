using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Reservation.API.Commons;
using Reservation.API.DataContext.Dto;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.UnitOfWork;
using TD.Lib.Common;
using TD.Lib.Helper;

namespace Reservation.API.Services
{
    public interface IAuthService
    {
        Task<Response<CurrentUser>> LoginAsync(LoginReq req);
        Task<Response<bool>> RegisterAsync(RegisterReq req);
        Task<Response<CurrentUser>> GetCurrentUser(string userName);
    }

    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        #region repos
        private readonly TD.Lib.Repository.ITDRepository<User> _userRepos;
        private readonly TD.Lib.Repository.ITDRepository<Role> _roleRepos;
        private readonly TD.Lib.Repository.ITDRepository<UserRole> _userRoleRepos;
        private readonly TD.Lib.Repository.ITDRepository<Permission> _permissionRepos;
        private readonly TD.Lib.Repository.ITDRepository<RolePermission> _rolePermissionRepos;
        #endregion

        public AuthService(
            IUnitOfWork unitOfWork
            , IConfiguration configuration
            , IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _appSettings = appSettings.Value;

            _userRepos = unitOfWork.GetRepository<User>();
            _roleRepos = unitOfWork.GetRepository<Role>();
            _userRoleRepos = unitOfWork.GetRepository<UserRole>();
            _permissionRepos = unitOfWork.GetRepository<Permission>();
            _rolePermissionRepos = unitOfWork.GetRepository<RolePermission>();
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<CurrentUser>> GetCurrentUser(string userName)
        {
            var user = await _userRepos.TableNoTracking.FirstOrDefaultAsync(r => r.UserName == userName);

            if (user is null)
                return Response<CurrentUser>.Error(StatusCode.InternalServerError, "Tài khoản không tồn tại trên hệ thống!");

            var currentUser = new CurrentUser
            {
                Id = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin,
            };
            return Response<CurrentUser>.Success(currentUser, StatusCode.Ok.ToDescription());
        }

        #region Asp core identity
        public async Task<Response<CurrentUser>> LoginAsync(LoginReq req)
        {
            var user = await _userRepos.Table.FirstOrDefaultAsync(r => r.UserName == req.UserName);

            if (user is null)
                return Response<CurrentUser>.Error(StatusCode.InternalServerError, "Tài khoản không tồn tại trên hệ thống!");

            if (!Utils.VerifyPassword(user.PasswordHash, req.Password))
                return Response<CurrentUser>.Error(StatusCode.InternalServerError, "Thông tin đăng nhập không chính xác!");

            var tokens = JwtHelper.GenerateToken(user.UserName, _configuration);

            //get permission
            var permissions = (from ur in _userRoleRepos.TableNoTracking
                               where ur.IdUser == user.Id
                               join rp in _rolePermissionRepos.TableNoTracking on ur.IdRole equals rp.IdRole
                               join p in _permissionRepos.TableNoTracking on rp.IdPermission equals p.Id
                               select p.PermissionCode).ToList();

            CurrentUser currentUser = new CurrentUser
            {
                Id = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin,
                AccessToken = tokens.AccessToken,
                RefreshToken = tokens.RefreshToken,
                Permission = permissions
            };
            return Response<CurrentUser>.Success(currentUser, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<bool>> RegisterAsync(RegisterReq req)
        {
            //if (IsDuplicated(ref errorMess, nameof(req.UserName), req.UserName))
            //    return Response<bool>.Error(StatusCode.InternalServerError, errorMess);

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = req.UserName,
                DisplayName = req.UserName,
                Email = req.UserName,
                PasswordHash = Utils.HashPassword(req.Password)
            };

            await _userRepos.CreateAsync(user);
            await _unitOfWork.SaveChangesAsync();

            return Response<bool>.Success(true, StatusCode.Ok.ToDescription());
        }
        #endregion
    }
}
