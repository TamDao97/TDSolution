using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Reservation.API.Commons;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.Services.Base;
using Reservation.API.UnitOfWork;
using TD.Lib.AutoMapper;
using TD.Lib.Common;
using TD.Lib.Helper;

namespace Reservation.API.Services
{
    public interface IUserService : IBaseService<User, UserDto>
    {
        Task<Response<PagingData<List<UserDto>>>> GetByFilterAsync(UserGridFilter gridDto);
        Task<Response<UserDto>> GetByIdAsync(Guid id);
        Task<Response<UserCreateResDto>> CreateAsync(UserCreateReqDto reqDto);
        Task<Response<UserCreateResDto>> UpdateAsync(UserCreateReqDto reqDto);
        Task<Response<bool>> DeleteAsync(Guid id);
    }

    public class UserService : BaseService<User, UserDto>, IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        #region repos
        private readonly TD.Lib.Repository.ITDRepository<User> _userRepos;
        private readonly TD.Lib.Repository.ITDRepository<UserRole> _userRoleRepos;
        private readonly TD.Lib.Repository.ITDRepository<Role> _roleRepos;
        private readonly TD.Lib.Repository.ITDRepository<Permission> _permissionRepos;
        private readonly TD.Lib.Repository.ITDRepository<RolePermission> _rolePermissionRepos;
        #endregion

        public UserService(
            IUnitOfWork unitOfWork
            , IConfiguration configuration
            , IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            _userRepos = unitOfWork.GetRepository<User>();
            _userRoleRepos = unitOfWork.GetRepository<UserRole>();
            _roleRepos = unitOfWork.GetRepository<Role>();
            _permissionRepos = unitOfWork.GetRepository<Permission>();
            _rolePermissionRepos = unitOfWork.GetRepository<RolePermission>();
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        public async Task<Response<UserCreateResDto>> CreateAsync(UserCreateReqDto reqDto)
        {
            if (_userRepos.TableNoTracking.Any(r => r.Id != reqDto.Id && r.UserName == reqDto.UserName))
            {
                return Response<UserCreateResDto>.Error(StatusCode.InternalServerError, ErrorMess.Duplicated(reqDto.UserName));
            }

            //tạo user
            User user = AutoMapperGeneric.Map<UserCreateReqDto, User>(reqDto);

            user.PasswordHash = Utils.HashPassword(reqDto.Password);
            user.DateCreated = DateTime.Now;
            user.DateModify = DateTime.Now;
            user.IsDeleted = false;

            //tạo quyền
            var lstUserRole = new List<UserRole>();
            if (!reqDto.IsAdmin)
            {
                lstUserRole = new List<UserRole>();
                UserRole userRole = null;
                foreach (var idRole in reqDto.LstRole)
                {
                    userRole = new UserRole
                    {
                        IdUser = user.Id,
                        IdRole = idRole
                    };
                    lstUserRole.Add(userRole);
                }
            }

            using (var trans = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    await _userRepos.CreateAsync(user);
                    await _unitOfWork.SaveChangesAsync();

                    await _userRoleRepos.CreateMultiAsync(lstUserRole);
                    await _unitOfWork.SaveChangesAsync();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                }
            }

            //response data
            UserCreateResDto dto = AutoMapperGeneric.Map<User, UserCreateResDto>(user);
            dto.LstRole = await _roleRepos.TableNoTracking.Where(r => reqDto.LstRole.Contains(r.Id)).Select(r => r.Name).ToListAsync();

            return Response<UserCreateResDto>.Success(dto, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<UserCreateResDto>> UpdateAsync(UserCreateReqDto reqDto)
        {
            //Cập nhật user
            var user = await _userRepos.GetByIdAsync(reqDto.Id);

            if (user == null)
            {
                return Response<UserCreateResDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            }

            user.DisplayName = reqDto.DisplayName;
            user.Gender = reqDto.Gender;
            user.Email = reqDto.Email;
            user.PhoneNumber = reqDto.PhoneNumber;
            user.IsAdmin = reqDto.IsAdmin;
            user.DateModify = DateTime.Now;

            //Cập nhật quyền
            var lstUserRoleRemove = _userRoleRepos.Table.Where(r => r.IdUser == user.Id).AsEnumerable();

            List<UserRole> lstUserRole = new List<UserRole>();
            if (!reqDto.IsAdmin)
            {
                lstUserRole = new List<UserRole>();
                UserRole userRole = null;
                foreach (var idRole in reqDto.LstRole)
                {
                    userRole = new UserRole
                    {
                        IdUser = user.Id,
                        IdRole = idRole
                    };
                    lstUserRole.Add(userRole);
                }
            }

            using (var trans = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    await _userRepos.UpdateAsync(user);
                    await _userRoleRepos.DeleteMultiAsync(lstUserRoleRemove);
                    await _userRoleRepos.CreateMultiAsync(lstUserRole);
                    await _unitOfWork.SaveChangesAsync();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                }
            }

            //response data
            UserCreateResDto dto = AutoMapperGeneric.Map<User, UserCreateResDto>(user);
            dto.LstRole = await _roleRepos.TableNoTracking.Where(r => reqDto.LstRole.Contains(r.Id)).Select(r => r.Name).ToListAsync();

            return Response<UserCreateResDto>.Success(dto, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<bool>> DeleteAsync(Guid id)
        {
            var user = await _userRepos.GetByIdAsync(id);

            if (user == null)
            {
                return Response<bool>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            }

            user.IsDeleted = true;

            await _userRepos.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();
            return Response<bool>.Success(true, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<PagingData<List<UserDto>>>> GetByFilterAsync(UserGridFilter gridDto)
        {
            var query = _userRepos.TableNoTracking.OrderByDescending(r => r.DateModify).AsQueryable();

            if (!string.IsNullOrEmpty(gridDto.Keyword))
            {
                query = query.Where(r => r.UserName.Trim().ToLower().Contains(gridDto.Keyword.Trim().ToLower())
                              || r.DisplayName.Trim().ToLower().Contains(gridDto.Keyword.Trim().ToLower()));
            }

            int totalItems = query.Select(r => r.Id).Count();
            var lstItemsPagging = query.Skip((gridDto.PageNumber - 1) * gridDto.PageSize)
                                        .Take(gridDto.PageSize)
                                        .Select(r => AutoMapperGeneric.Map<User, UserDto>(r))
                                        .ToList();

            var item = PagingData<List<UserDto>>.Create(lstItemsPagging, gridDto.PageNumber, totalItems / gridDto.PageSize, totalItems);
            return Response<PagingData<List<UserDto>>>.Success(item, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<UserDto>> GetByIdAsync(Guid id)
        {
            var item = await _userRepos.GetByIdAsync(id);

            if (item == null)
                return Response<UserDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

            UserDto dto = AutoMapperGeneric.Map<User, UserDto>(item);
            return Response<UserDto>.Success(dto, StatusCode.Ok.ToDescription());
        }


    }
}
