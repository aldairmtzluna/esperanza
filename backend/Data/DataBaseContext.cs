using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}