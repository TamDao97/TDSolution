using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    public class Customer : BaseEntity
    {
        public string CustomerCode { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? DateBirth { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
    }
}
