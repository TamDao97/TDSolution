using Microsoft.Extensions.Options;
using Reservation.API.Commons;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.UnitOfWork;
using TD.Lib.Common;
using TD.Lib.Helper;

namespace Reservation.API.Services.Common
{
    public interface ICommonService
    {
        #region Dropdown
        Task<Response<List<Dropdown>>> DropdownPageAsync();
        #endregion
    }

    public class CommonService : ICommonService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        #region repos
        private readonly TD.Lib.Repository.ITDRepository<Page> _pageRepos;
        private readonly TD.Lib.Repository.ITDRepository<User> _userRepos;
        private readonly TD.Lib.Repository.ITDRepository<UserRole> _userRoleRepos;
        private readonly TD.Lib.Repository.ITDRepository<Role> _roleRepos;
        private readonly TD.Lib.Repository.ITDRepository<Permission> _permissionRepos;
        private readonly TD.Lib.Repository.ITDRepository<RolePermission> _rolePermissionRepos;
        #endregion

        public CommonService(
            IUnitOfWork unitOfWork
            , IConfiguration configuration
            , IOptions<AppSettings> appSettings)
        {
            _pageRepos = unitOfWork.GetRepository<Page>();
            _userRepos = unitOfWork.GetRepository<User>();
            _userRoleRepos = unitOfWork.GetRepository<UserRole>();
            _roleRepos = unitOfWork.GetRepository<Role>();
            _permissionRepos = unitOfWork.GetRepository<Permission>();
            _rolePermissionRepos = unitOfWork.GetRepository<RolePermission>();
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        public async Task<Response<List<Dropdown>>> DropdownPageAsync()
        {
            var datas = _pageRepos.TableNoTracking.Select(r => new Dropdown
            {
                Value = r.Id,
                Text = r.Name
            }).ToList();
            return Response<List<Dropdown>>.Success(datas, StatusCode.Ok.ToDescription());
        }
    }
}
