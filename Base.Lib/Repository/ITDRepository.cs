using Microsoft.EntityFrameworkCore;
using TD.Lib.Repository.Entity.Base;

namespace TD.Lib.Repository
{
    public interface ITDRepository<T> where T : BaseEntity
    {
        IQueryable<T> Table { get; }
        IQueryable<T> TableNoTracking { get; }
        Task<T> GetByIdAsync(object id);
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(T entity);
        Task CreateMultiAsync(IEnumerable<T> entities);
        Task UpdateMultiAsync(IEnumerable<T> entities);
        Task DeleteMultiAsync(IEnumerable<T> entities);
    }

    public class TDRepository<T> : ITDRepository<T> where T : BaseEntity
    {
        private readonly DbContext _context;
        private DbSet<T> _entities;

        public TDRepository(DbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public virtual IQueryable<T> Table => _entities.Where(r => !r.IsDeleted);
        public virtual IQueryable<T> TableNoTracking => _entities.AsNoTracking().Where(r => !r.IsDeleted);

        public virtual async Task<T> GetByIdAsync(object id)
        {
            return await _entities.FindAsync(id);
        }

        public virtual async Task<T> CreateAsync(T entity)
        {
            return (await _entities.AddAsync(entity)).Entity;
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            return _entities.Update(entity).Entity;
        }

        public virtual async Task<T> DeleteAsync(T entity)
        {
            return _entities.Remove(entity).Entity;
        }

        public virtual async Task CreateMultiAsync(IEnumerable<T> entities)
        {
            await _entities.AddRangeAsync(entities);
        }

        public virtual async Task UpdateMultiAsync(IEnumerable<T> entities)
        {
            _entities.UpdateRange(entities);
        }

        public virtual async Task DeleteMultiAsync(IEnumerable<T> entities)
        {
            _entities.RemoveRange(entities);
        }
    }
}
