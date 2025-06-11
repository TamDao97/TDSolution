using Microsoft.Extensions.Options;
using Reservation.API.Commons;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.Services.Base;
using Reservation.API.UnitOfWork;
using TD.Lib.Common;
using TD.Lib.Helper;

namespace Reservation.API.Services
{
    public interface IPageService : IBaseService<Page, PageDto>
    {
        //Task<Response<PagingData<List<UserDto>>>> GetByFilterAsync(UserGridFilter gridDto);
        //Task<Response<UserDto>> GetByIdAsync(Guid id);
        //Task<Response<bool>> DeleteAsync(Guid id);
        Task<Response<List<PageTreeNode>>> GetPageTreeAsync();
    }

    public class PageService : BaseService<Page, PageDto>, IPageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        #region repos
        private readonly TD.Lib.Repository.ITDRepository<Page> _pageRepos;
        //private readonly TD.Lib.Repository.ITDRepository<Permission> _permissionRepos;
        //private readonly TD.Lib.Repository.ITDRepository<UserRole> _userRoleRepos;
        //private readonly TD.Lib.Repository.ITDRepository<Role> _roleRepos;
        //private readonly TD.Lib.Repository.ITDRepository<RolePermission> _rolePermissionRepos;
        #endregion

        public PageService(
            IUnitOfWork unitOfWork
            , IConfiguration configuration
            , IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            _pageRepos = unitOfWork.GetRepository<Page>();
            //_userRoleRepos = unitOfWork.GetRepository<UserRole>();
            //_roleRepos = unitOfWork.GetRepository<Role>();
            //_permissionRepos = unitOfWork.GetRepository<Permission>();
            //_rolePermissionRepos = unitOfWork.GetRepository<RolePermission>();
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        public async Task<Response<List<PageTreeNode>>> GetPageTreeAsync()
        {
            var datas = BuildPageTree();
            return Response<List<PageTreeNode>>.Success(datas, StatusCode.Ok.ToDescription());
        }

        #region private func
        private List<PageTreeNode> BuildPageTree()
        {
            List<Page> flatPages = _pageRepos.TableNoTracking.ToList();
            var lookup = flatPages.ToLookup(r => r.IdParent);

            List<PageTreeNode> BuildTree(Guid? idParent)
            {
                return lookup[idParent]
                    .Select(r => new PageTreeNode
                    {
                        Key = r.Id,
                        Title = r.Name,
                        Children = BuildTree(r.Id)
                    })
                    .ToList();
            }

            return BuildTree(null); // Start từ root (ParentId == null)
        }
        #endregion
    }
}
