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
using ActivitIRLApi.Authentication;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IMapper _mapper;
        private readonly PasswordHashManager _passwordHasher;

        public UserController(ApplicationDbContext content,IMapper mapper)
        {
            _content = content;
            _mapper = mapper;
            _passwordHasher = new PasswordHashManager();
        }



        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<UserGetDTO>> GetUsers()
        {
            var domainUser = await _content.Users.ToListAsync();
           
            return _mapper.Map<UserGetDTO>(domainUser);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserGetDTO>> GetUser(int? id)
        {
            var domainUser = await _content.Users.FindAsync(id);

            if (domainUser == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserGetDTO>(domainUser);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int? id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _content.Entry(user).State = EntityState.Modified;

            try
            {
                await _content.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody]UserCreateDTO user)
        {
            if(_content.Users.Any( u => u.Alias == user.Alias || u.EmailAddress == user.EmailAddress))
            {
                Ok("Alias Or Email Exists");
            }

            User domainUser = _mapper.Map<User>(user);

            _passwordHasher.CreatePasswordHash(user.Password, out byte[] PWHash, out byte[] PWSalt);

            domainUser.PWHash = PWHash;

            domainUser.PWSalt = PWSalt;

            _content.Users.Add(domainUser);
            await _content.SaveChangesAsync();

            UserGetDTO userCreateDTO = _mapper.Map<UserGetDTO>(domainUser);
            
            return CreatedAtAction("GetUser", new { id = userCreateDTO.UserId }, userCreateDTO);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int? id)
        {
            var user = await _content.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _content.Users.Remove(user);
            await _content.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int? id)
        {
            return _content.Users.Any(e => e.UserId == id);
        }
    }
}
