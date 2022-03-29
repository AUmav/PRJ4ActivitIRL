using ActivitIRLApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivitIRLApi.Data
{
    public class ApplicationDbContext : DbContext 
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) { }

        public DbSet<Event> Events { get; set; }
    }
}
