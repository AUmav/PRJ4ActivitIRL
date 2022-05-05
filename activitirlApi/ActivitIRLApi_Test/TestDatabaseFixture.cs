using ActivitIRLApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using ActivitIRLApi.Data;

namespace ActivitIRLApi_Test
{
    public class TestDatabaseFixture
    {
        private const string ConnectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        public TestDatabaseFixture()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.EnsureCreated();

                        context.AddRange(
                            new User { UserId = 1, FirstName = "Jens", LastName = "Jensen", 
                                EmailAddress = "Jens@gmail.com"},
                            new User { UserId = 2, FirstName = "Lars", LastName = "Larsen",
                                EmailAddress = "Lars@gmail.com"});
                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public ApplicationDbContext CreateContext()
            => new ApplicationDbContext(
                new DbContextOptionsBuilder<ApplicationDbContext>()
                    .UseSqlServer(ConnectionString)
                    .Options);
    }
}
