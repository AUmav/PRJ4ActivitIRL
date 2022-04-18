#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivitIRLApi.Data;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IMapper _mapper;

        public UserController(ApplicationDbContext content,IMapper mapper)
        {
            _content = content;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserGetDTO>> GetUser()
        {
            User user = GetCurrentUser();

            var domainUser = await _content.Users.FirstOrDefaultAsync(u => u.Alias == user.Alias);

            if (domainUser == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserGetDTO>(domainUser);
        }

        // DELETE: api/Users/5
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(UserGetDTO userGetDTO)
        {

            return NoContent();
        }

        private bool UserExists(int? id)
        {
            return _content.Users.Any(e => e.UserId == id);
        }

        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new User
                {
                    Alias = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    EmailAddress = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                    Gender = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Gender)?.Value,
                    DateOfBirth = DateTime.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.DateOfBirth)?.Value)
                };
            }
            return null;
        }
    }
}
