using System.Threading.Tasks;
using ActivitIRLApi.Controllers;
using ActivitIRLApi.Data;
using ActivitIRLApi.Models.Entities;
using AutoMapper;
using Xunit;
using Moq;
using FluentAssertions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ActivitIRLApi_Test
{
    public class UserControllerTests : IClassFixture<TestDatabaseFixture>
    {
        public UserControllerTests(TestDatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        public TestDatabaseFixture Fixture { get; }


    }
}

/*
 
        [Fact]
        public async Task GetUser_ShouldReturn200Status()
        {
            var users = new List<User>()
            {
                new User() { UserId = 1, FirstName = "Jens", LastName = "Jensen"},
                new User() { UserId = 2, FirstName = "Lars", LastName = "Larsen"},
                new User() { UserId = 3, FirstName = "Bo", LastName = "Boesen"}
            };

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseInMemoryDatabase("UserControllerTest");
            var dbContextMock = new Mock<ApplicationDbContext>(optionsBuilder.Options);

            //auto mapper configuration
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new UserTestMappingProfile());
            });
            var mapper = config.CreateMapper();

            //Can't convert from list type to EfCore type right now..
            //Maybe implement repository design pattern to mock EF Core LINQ queries?
            dbContextMock.Setup(x => x.Users).Returns(value: users);




            //dbContextMock.Setup(_ => _.GetUser()).ReturnsAsync(users.GetUsers());
            //var uut = new UserController(dbContextMock.Object, mapper.Object);

            //var result = await uut.GetUser();

            //result.StatusCode.Should.Be(200);
        }*/