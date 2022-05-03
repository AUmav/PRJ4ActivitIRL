#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivitIRLApi.Data;
using ActivitIRLApi.Models;
using AutoMapper;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Models.Entities;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IMapper _mapper;

        public EventController(ApplicationDbContext content, IMapper mapper)
        {
            _content = content;
            _mapper = mapper;
        }

       
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<EventGetSignedupDTO>> CreateEvent([FromBody] EventCreateDTO CreateDTO)
        {
            Event domainEvent = _mapper.Map<Event>(CreateDTO);

            User user = GetCurrentUser();

            domainEvent.CreatedBy = _content.Users.FirstOrDefault(u => u.EmailAddress == user.EmailAddress);

            domainEvent.NumberOfUsers = 1;

            domainEvent.CreatedAt = DateTime.Now;   

            _content.Events.Add(_mapper.Map<Event>(domainEvent));

            await _content.SaveChangesAsync();

            EventGetSignedupDTO privateEvent = _mapper.Map<EventGetSignedupDTO>(domainEvent);

            return CreatedAtAction("GetEvent", new { id = privateEvent.EventId }, privateEvent);
        }

        [HttpGet("{id}")]
        [Authorize]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvent(int id)
        {
            User user = GetCurrentUser();

            if(user == null)
            {
                Event eventPublic = await _content.Events.Include(e => e.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);
               
                if (eventPublic == null)
                {
                    return NotFound();
                }

                return Ok(_mapper.Map<EventGetDTO>(eventPublic));

            }

            User domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(e => e.CreatedBy).Include(u => u.ListOfUsers).FirstOrDefaultAsync(u => u.EventId == id);
           
            if (@event == null)
            {
                return NotFound();
            }

            EventGetSignedupDTO signedupEvent = _mapper.Map<EventGetSignedupDTO>(@event);

            signedupEvent.IsSignedup =  @event.ListOfUsers.Contains(domainUser) ? true : false;

            return Ok(signedupEvent);

        }


        [HttpGet]
        public async Task<ActionResult<List<EventGetPublicDTO>>> GetEventList()
        {
            List<Event> @event = await _content.Events.OrderByDescending(p => p.EventId).Take(20).ToListAsync();
            if (@event == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<EventGetPublicDTO>>(@event);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> ChangeEvnet(int id, [FromBody] EventPutDTO eventMod)
        {
            User user = GetCurrentUser();

            User domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(oc => oc.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);

            if (@event == null || user == null)
            {
                return NotFound();
            }

            if(!(@event.CreatedBy == domainUser))
            {
                return Unauthorized();
            }

            ModEvent(ref @event, eventMod);

            await _content.SaveChangesAsync();

            return Ok("Event Updated");
        }



        [HttpPut("Register/{id}")]
        [Authorize]
        public async Task<ActionResult<bool>> Signup(int id)
        {
            User user = GetCurrentUser();

            User domainUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(e => e.ListOfUsers).Include(a => a.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);


            if(@event == null || user == null)
            {
                return NotFound();
            }

            if(!IsUserEligible(domainUser, @event))
            {
                return Unauthorized();
            }

            if(!@event.ListOfUsers.Contains(domainUser))
            {
                @event.ListOfUsers.Add(domainUser);
                @event.NumberOfUsers = @event.ListOfUsers.Count();
                await _content.SaveChangesAsync();

            }
            else
            {
                @event.ListOfUsers.Remove(domainUser);
                @event.NumberOfUsers = @event.ListOfUsers.Count();
                await _content.SaveChangesAsync();
            }

            return true;
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteEvent(int id)
        {

            Event @event = await _content.Events.FirstOrDefaultAsync(u => u.EventId == id);


            if (@event == null)
            {
                return NotFound("Event not found!");
            }

            _content.Events.Remove(@event);

            await _content.SaveChangesAsync();

            return Ok($"User with the id = {id} deleted!");
        }



        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                if (!(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value == null))
                {
                    return new User
                    {
                        EmailAddress = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                        Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                        Gender = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Gender)?.Value,
                        DateOfBirth = DateTime.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.DateOfBirth)?.Value)
                    };
                }
               
            }
            return null;
        }

        private bool IsUserEligible(User user, Event @event)
        {
            int userAge = GetAgeFromDateTime(user.DateOfBirth);
            
            if (userAge > @event.MaxAge || userAge < @event.MinAge || @event.NumberOfUsers >= @event.MaxUsers || @event.CreatedBy.EmailAddress == user.EmailAddress)
            {
                return false;
            }
            
            return true;
        }
        // Inspiration from stackoverflow
        private int GetAgeFromDateTime(DateTime dateOfBirth)
        {
            // Save today's date.
            var today = DateTime.Today;

            // Calculate the age.
            var age = today.Year - dateOfBirth.Year;

            // Go back to the year in which the person was born in case of a leap year
            if (dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }

        private void ModEvent(ref Event @event, EventPutDTO mods)
        {
            @event.Title = mods.Title;
            @event.City = mods.City;
            @event.Country = mods.Country;
            @event.Date = DateTime.Parse(mods.Date);
            @event.MinAge = mods.MinAge;
            @event.MaxAge = mods.MaxAge;
            @event.Description = mods.Description;
            @event.StreetName = mods.StreetName;
            @event.ZipCode = mods.ZipCode;
            @event.State = mods.State;
            @event.MaxUsers = mods.MaxUsers;
            @event.Activity = mods.Activity;
        }
    }
}
