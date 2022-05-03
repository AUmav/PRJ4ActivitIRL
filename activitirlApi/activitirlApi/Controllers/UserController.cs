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
using ActivitIRLApi.Validaion;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IMapper _mapper;
        private readonly InputTypeValidation _typeValidater;

        public UserController(ApplicationDbContext content,IMapper mapper)
        {
            _content = content;
            _mapper = mapper;
            _typeValidater = new InputTypeValidation();
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserGetDTO>> GetUser()
        {
            User user = GetCurrentUser();

            var domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            if (domainUser == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserGetDTO>(domainUser);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ChangeUser([FromBody] UserPutDTO moddedUser)
        {
            User user = GetCurrentUser();

            var domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            if (domainUser == null)
            {
                return NotFound();
            }

            ModUser(ref domainUser, moddedUser);

            await _content.SaveChangesAsync();

            return Ok("User Updated");

        }

        [HttpDelete("{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            if(_typeValidater.IsValidEmail(email))
            {
                return BadRequest("Invalid Email address!");
            }

            var domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == email);

            if (domainUser == null)
            {
                return NotFound("Email not found!");
            }

            _content.Users.Remove(domainUser);

            await _content.SaveChangesAsync();

            return Ok($"User with the email = {email} deleted!");
        }

        private void ModUser(ref User user, UserPutDTO mods)
        {
            user.ApartmentNumber = int.Parse(mods.ApartmentNumber);
            user.City = mods.City;
            user.Country = mods.Country;
            user.DateOfBirth = DateTime.Parse(mods.DateOfBirth);
            user.FirstName = mods.FirstName;
            user.Gender = mods.Gender;
            user.LastName = mods.LastName;
            user.PhoneNumber = int.Parse(mods.PhoneNumber);
            user.ProfilePicture = mods.ProfilePicture;
            user.StreetName = mods.StreetName;
            user.ZipCode = int.Parse(mods.ZipCode);

        }


        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new User
                {
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
