using Reservation.API.DataContext.Dto.Base;

namespace Reservation.API.DataContext.Dto.Core
{
    public class PageDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Url { get; set; } = string.Empty;
        public string? Icon { get; set; } = string.Empty;
        public bool? IsActive { get; set; } = true;
        public bool? IsTab { get; set; } = false;
        public bool? IsHomePage { get; set; } = false;
        public Guid? IdParent { get; set; }
        public string? PermissionCode { get; set; }
        public int? Order { get; set; }
    }

    public class PageTreeNode
    {
        public Guid Key { get; set; }
        public string Title { get; set; }
        public bool IsLeaf => Children == null || Children.Count == 0;
        public bool Expanded { get; set; } = true;
        public List<PageTreeNode> Children { get; set; } = new();
    }
}
