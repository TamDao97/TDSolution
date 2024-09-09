using Microsoft.AspNetCore.Mvc;
using Reservation.API.DataContext.Dto.Base;
using Reservation.API.Services.Base;
using TD.Lib.AutoMapper;
using TD.Lib.Common;
using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.Controllers.Base
{
    public class BaseController<TEntity, TDto> : ApiController where TEntity : BaseEntity, new() where TDto : BaseDto, new()
    {
        private readonly IBaseService<TEntity, TDto> _baseService;

        public BaseController(IBaseService<TEntity, TDto> baseService)
        {
            _baseService = baseService;
        }

        [Route("create")]
        [HttpPost]
        public virtual async Task<ActionResult<Response<bool>>> Create(TDto dtoReq)
        {
            TEntity entity = AutoMapperGeneric.Map<TDto, TEntity>(dtoReq);
            return Ok(await _baseService.CreateAsync(entity));
        }

        [Route("update")]
        [HttpPost]
        public virtual async Task<ActionResult<Response<bool>>> Update(TDto dtoReq)
        {
            TEntity entity = AutoMapperGeneric.Map<TDto, TEntity>(dtoReq);
            return Ok(await _baseService.UpdateAsync(entity));
        }

        [Route("delete/{id}")]
        [HttpPost]
        public virtual async Task<ActionResult<Response<bool>>> Delete(Guid id)
        {
            return Ok(await _baseService.DeleteAsync(id));
        }

        [Route("getbyid/{id}")]
        [HttpPost]
        public virtual async Task<ActionResult<Response<bool>>> GetById(Guid id)
        {
            return Ok(await _baseService.GetByIdAsync(id));
        }
    }
}
