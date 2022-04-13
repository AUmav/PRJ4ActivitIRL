﻿#nullable disable
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

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UsersController(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
             
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<UserGetDTO>> GetUsers()
        {
            var domainUser = await _context.Users.ToListAsync();
           
            return _mapper.Map<UserGetDTO>(domainUser);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserGetDTO>> GetUser(int? id)
        {
            var domainUser = await _context.Users.FindAsync(id);

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

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody]UserCreateDTO user)
        {
            User domainUser = _mapper.Map<User>(user);  

            _context.Users.Add(domainUser);
            await _context.SaveChangesAsync();

            UserGetDTO userCreateDTO = _mapper.Map<UserGetDTO>(domainUser);
            
            return CreatedAtAction("GetUser", new { id = userCreateDTO.UserId }, userCreateDTO);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int? id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int? id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}