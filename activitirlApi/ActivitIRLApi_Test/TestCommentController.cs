using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivitIRLApi.Controllers;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Data;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

//Had a bunch of trouble with testing against production database. Testing against in memory database instead.
//https://stackoverflow.com/questions/23363073/tests-not-running-in-test-explorer

namespace ActivitIRLApi_Test
{
    [TestFixture]
    public class CommentController_Test
    {
        private CommentController? _commentController;
        private ApplicationDbContext? _dbContext;

        [SetUp]
        public void SetUp()
        {
            _dbContext = new ApplicationDbContext(
                new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "db")
                .EnableSensitiveDataLogging()
                .Options);

            _commentController = new CommentController(_dbContext);
            _dbContext.Comments.RemoveRange(_dbContext.Comments);

            _dbContext.SaveChanges();

            var Comments = new List<Comment>
            {
                new Comment { CommentId = 1, Comments = "Hi comment 1"},
                new Comment { CommentId = 2, Comments = "Hi comment 2"},
                new Comment { CommentId = 3, Comments = "Hi comment 3"}
            };

            _dbContext.Comments.AddRange(Comments);
            _dbContext.SaveChanges();
        }

        //[Test]
        //public void GetComments_ReturnsTrue()
        //{
        //    ActionResult<List<Comment>> comments = _commentController.GetComments(); //??
        //    Assert.NotNull(comments);
        //    Assert.AreEqual(3, comments.Value.Count);
        //}

        //[TestCase(1)]
        [Test]
        public void GetCommentId_SUI(int id)
        {
            id = 1;
            var comment = _commentController.GetComment(id);
            Assert.AreEqual(comment.Id, id);
        }

        

    }
}