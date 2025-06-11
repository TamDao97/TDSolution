using Microsoft.EntityFrameworkCore;
using Reservation.API.DataContext.Entity;
using Reservation.API.DataContext.Entity.Core;

namespace Reservation.API.DataContext
{
    public class ReservationDbContext : DbContext
    {
        public ReservationDbContext()
        {
        }

        public ReservationDbContext(DbContextOptions<ReservationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Page> Pages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Entity.Reservation> Reservations { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Table> Tables { get; set; }
    }
}
