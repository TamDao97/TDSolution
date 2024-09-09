using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity
{
    public class Room : BaseEntity
    {
        public string RoomCode { get; set; }
        public string RoomName { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public int LimitNumber { get; set; }
    }
}
