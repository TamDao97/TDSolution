using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity.Core
{
    public class Role : BaseEntity
    {
        /// <summary>
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// </summary>
        public virtual string? Name { get; set; }

        /// <summary>
        /// </summary>
        public string? Description { get; set; }
    }
}
