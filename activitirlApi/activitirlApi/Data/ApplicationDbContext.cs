using ActivitIRLApi.Models;
using ActivitIRLApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ActivitIRLApi.Data
{
    public class ApplicationDbContext : DbContext 
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) { }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Preference> Preferences { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.EmailAddress)
                .IsUnique();
            builder.Entity<User>()
                .HasIndex(u => u.Alias)
                .IsUnique();
        }
    }
}
