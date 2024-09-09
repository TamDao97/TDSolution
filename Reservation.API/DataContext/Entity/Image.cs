using Reservation.API.DataContext.Enums;
using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    public class Image : BaseEntity
    {
        public Guid IdObject { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Base64String { get; set; }
        public ImageType Type { get; set; }
    }
}
