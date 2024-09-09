using TD.Lib.Repository.Entity.Base;

namespace Reservation.API.DataContext.Entity.Core
{
    public class User : BaseEntity
    {
        /// <summary>
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// </summary>
        public string? PasswordHash { get; set; }

        ///// <summary>
        ///// </summary>
        //public string? SecurityStamp { get; set; }

        /// <summary>
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// </summary>
        public DateTimeOffset? DateLockout { get; set; }

        /// <summary>
        /// </summary>
        public bool IsLockout { get; set; }

        /// <summary>
        /// </summary>
        public int AccessFailedCount { get; set; }

        /// <summary>
        /// </summary>
        public bool IsAdmin { get; set; }
    }
}
