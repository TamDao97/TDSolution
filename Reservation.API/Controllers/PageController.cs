using Microsoft.AspNetCore.Mvc;
using Reservation.API.Attributes;
using Reservation.API.Controllers.Base;
using Reservation.API.DataContext.Dto.Core;
using Reservation.API.DataContext.Entity.Core;
using Reservation.API.Services;
using Reservation.API.Services.Common;
using TD.Lib.Common;

namespace Reservation.API.Controllers
{
    //[TDAuthorize]
    [TDModule("Quản lý menu", 2)]
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : BaseController<Page, PageDto>
    {
        private readonly ILogger<PageController> _logger;
        private readonly IPageService _pageService;
        private readonly ICommonService _commonService;

        public PageController(ILogger<PageController> logger, ICommonService commonService, IPageService pageService) : base(pageService)
        {
            _logger = logger;
            _pageService = pageService;
            _commonService = commonService;
        }

        [Route("dropdown-page")]
        [HttpGet]
        public async Task<ActionResult<Response<bool>>> DropdownPageAsync()
        {
            return Ok(await _commonService.DropdownPageAsync());
        }

        [Route("get-page-tree")]
        [HttpGet]
        public async Task<ActionResult<Response<List<PageTreeNode>>>> GetPageTreeAsync()
        {
            return Ok(await _pageService.GetPageTreeAsync());
        }
    }
}
