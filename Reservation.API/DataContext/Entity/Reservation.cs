using Reservation.API.DataContext.Enums;
using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    /// <summary>
    /// Đặt bàn
    /// </summary>
    public class Reservation : BaseEntity
    {
        public string ReservationCode { get; set; }
        public Guid IdCustomer { get; set; }
        public Guid IdBranch { get; set; }
        public Guid IdUser { get; set; }
        public Guid? IdRoom { get; set; }
        public DateTime? DateOfBook { get; set; }
        public TimeSpan? TimeOfBook { get; set; }
        public int? TimeInterval { get; set; }
        public string? Note { get; set; }
        public int AdultNumber { get; set; }
        public int ChildNumber { get; set; }
        public ReservationStatusEnums Status { get; set; }
    }
}
