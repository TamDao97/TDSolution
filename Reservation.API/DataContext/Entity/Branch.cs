using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    /// <summary>
    /// Chi nhánh
    /// </summary>
    public class Branch : BaseEntity
    {
        public string BranchCode { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
    }
}
