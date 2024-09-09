using Reservation.API.Commons;
using Reservation.API.DataContext.Dto.Base;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.UnitOfWork;
using TD.Lib.AutoMapper;
using TD.Lib.Common;
using TD.Lib.Helper;
using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.Services.Base
{
    public interface IBaseService<T, TDto> where T : BaseEntity, new() where TDto : BaseDto, new()
    {
        #region CRUD
        Task<Response<TDto>> CreateAsync(T entity);
        Task<Response<TDto>> UpdateAsync(T entity);
        Task<Response<TDto>> DeleteAsync(Guid id, bool isActual = false);
        #endregion

        #region GET
        Task<Response<TDto>> GetByIdAsync(Guid id);
        #endregion

        #region Validation logic
        public bool IsDuplicated(ref string errorMess, string fieldCheck, object valueCheck, object idValue = null);
        #endregion
    }

    public class BaseService<T, TDto> : IBaseService<T, TDto> where T : BaseEntity, new() where TDto : BaseDto, new()
    {
        protected readonly IUnitOfWork _unitOfWork;

        public BaseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public virtual async Task<Response<TDto>> CreateAsync(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException();

            if (entity.Id == Guid.Empty)
                entity.Id = Guid.NewGuid();

            entity.DateCreated = DateTime.Now;
            entity.DateModify = DateTime.Now;
            entity.IsDeleted = false;

            entity = await _unitOfWork.GetRepository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();
            return Response<TDto>.Success(AutoMapperGeneric.Map<T, TDto>(entity), StatusCode.Ok.ToDescription());
        }

        public virtual async Task<Response<TDto>> UpdateAsync(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException();

            entity.DateCreated = DateTime.Now;
            entity.DateModify = DateTime.Now;
            entity.IsDeleted = false;

            entity = await _unitOfWork.GetRepository<T>().UpdateAsync(entity);
            await _unitOfWork.SaveChangesAsync();
            return Response<TDto>.Success(AutoMapperGeneric.Map<T, TDto>(entity), StatusCode.Ok.ToDescription());
        }

        public virtual async Task<Response<TDto>> DeleteAsync(Guid id, bool isActual = false)
        {
            T entity = await _unitOfWork.GetRepository<T>().GetByIdAsync(id);

            if (entity == null)
                return Response<TDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

            if (!isActual)
            {
                entity.DateCreated = DateTime.Now;
                entity.DateModify = DateTime.Now;
                entity.IsDeleted = true;

                entity = await _unitOfWork.GetRepository<T>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return Response<TDto>.Success(AutoMapperGeneric.Map<T, TDto>(entity), StatusCode.Ok.ToDescription());
            }
            else
            {
                entity = await _unitOfWork.GetRepository<T>().DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return Response<TDto>.Success(AutoMapperGeneric.Map<T, TDto>(entity), StatusCode.Ok.ToDescription());
            }
        }

        public virtual async Task<Response<TDto>> GetByIdAsync(Guid id)
        {
            T entity = await _unitOfWork.GetRepository<T>().GetByIdAsync(id);
            if (entity == null)
                throw new ArgumentNullException();
            return Response<TDto>.Success(AutoMapperGeneric.Map<T, TDto>(entity), StatusCode.Ok.ToDescription());
        }

        #region Validation logic
        public bool IsDuplicated(ref string errorMess, string fieldCheck, object valueCheck, object idValue = null)
        {
            //Equals func dùng để so sánh giá trị của 2 object
            if (_unitOfWork.GetRepository<T>().TableNoTracking.AsEnumerable().Any(r => !r.GetType().GetProperty("Id").GetValue(r, null).Equals(idValue) && valueCheck.Equals(r.GetType().GetProperty(fieldCheck).GetValue(r, null))))
            {
                errorMess = string.Format(MessageText.Duplicate, fieldCheck);
                return true;
            }
            else return false;
        }
        #endregion
    }
}
