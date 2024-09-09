using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    public class Table : BaseEntity
    {
        public string TableCode { get; set; }
        public string TableName { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public int LimitNumber { get; set; }
        public int Status { get; set; }
    }
}
