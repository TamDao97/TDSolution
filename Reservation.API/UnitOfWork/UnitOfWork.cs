using Reservation.API.DataContext;

namespace Reservation.API.UnitOfWork
{
    public interface IUnitOfWork : TD.Lib.Repository.ITDUnitOfWork, IDisposable
    {
    }

    public class UnitOfWork : TD.Lib.Repository.TDUnitOfWork, IUnitOfWork
    {
        ReservationDbContext _reservationDbContext;
        public UnitOfWork(ReservationDbContext reservationDbContext) : base(reservationDbContext)
        {
            _reservationDbContext = reservationDbContext;
        }
    }
}
