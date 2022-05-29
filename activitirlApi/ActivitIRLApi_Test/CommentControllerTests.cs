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
using Microsoft.AspNetCore.Mvc;
using EntityFramework.Testing;
using System.Linq;

namespace ActivitIRLApi_Test
{
    public class CommentControllerTests : IClassFixture<TestDatabaseFixture>
    {
        public CommentControllerTests(TestDatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        public TestDatabaseFixture Fixture { get; }

        [Fact]
        public void GetComment_Id_ReturnsTrue()
        {
            //Arrange
            //create db context
            using var context = Fixture.CreateContext();

            var controller = new CommentController(context);

            //Act
            var result = controller.GetComment(1);

            //Assert
            Assert.Equal(1.ToString(), result.ToString());
        }

        //[Fact]
        //public void GetComment_Comments_ReturnsTrue()
        //{
        //    var context = Fixture.CreateContext();

        //    var controller = new CommentController(context);

        //    var result = controller.GetComment(1).Comments;
        //}

        //[Fact]
        //public void CommentId()
        //{
        //    var c = new Comment { CommentId = 1, Comments = "lol" };

        //    c.Comments = "lal";

        //    Assert.Equal("lal", c.Comments);
        //}

        //Jeg får samme fejl, ligegyldig hvordan jeg laver testen. (Option 'SINGLE_USER' cannot be set in database 'master' .. )

    }
}
