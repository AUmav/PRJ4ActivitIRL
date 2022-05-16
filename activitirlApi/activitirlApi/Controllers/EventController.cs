#nullable disable
using System.Security.Claims;
using ActivitIRLApi.Data;
using ActivitIRLApi.Models;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Validaion;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IMapper _mapper;
        private readonly IInputTypeValidation _typeValidater;

        public EventController(ApplicationDbContext content, IMapper mapper, IInputTypeValidation typeValidater)
        {
            _content = content;
            _mapper = mapper;
            _typeValidater = typeValidater;
        }

       
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<EventGetSignedupDTO>> CreateEvent([FromBody] EventCreateDTO CreateDTO)
        {
            Event domainEvent = _mapper.Map<Event>(CreateDTO);

            User user = GetCurrentUser();

            domainEvent.CreatedBy = _content.Users.FirstOrDefault(u => u.EmailAddress == user.EmailAddress);

            domainEvent.NumberOfUsers = 1.ToString();

            domainEvent.CreatedAt = DateTime.Now.ToString();

            if (!_typeValidater.IsDateValid(CreateDTO.Date))
            {
                return BadRequest("Date Not Valid");
            }

            if (CreateDTO.RegistrationDeadline != null)
            {
                if (!_typeValidater.IsValidRegistrationDate(CreateDTO.RegistrationDeadline, CreateDTO.Date))
                {
                    return BadRequest("RegistrationDeadline Not Valid");
                }
            }
            else
            {
                domainEvent.RegistrationDeadline = CreateDTO.Date;
            }

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

            User fullUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(e => e.CreatedBy).Include(u => u.ListOfUsers).FirstOrDefaultAsync(u => u.EventId == id);
           
            if (@event == null)
            {
                return NotFound();
            }

            EventGetSignedupDTO signedupEvent = _mapper.Map<EventGetSignedupDTO>(@event);

            signedupEvent.IsSignedup =  @event.ListOfUsers.Contains(fullUser) ? true.ToString() : false.ToString();

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

            User fullUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(oc => oc.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);

            if (@event == null || user == null)
            {
                return NotFound();
            }

            if(!(@event.CreatedBy == fullUser))
            {
                return Unauthorized();
            }

            if(eventMod.Date != null)
            {
                if(!_typeValidater.IsDateValid(eventMod.Date))
                {
                    return BadRequest("Date Not Valid");
                }
            }

            if (eventMod.RegistrationDeadline != null)
            {
                if (!_typeValidater.IsValidRegistrationDate(eventMod.RegistrationDeadline, eventMod.Date))
                {
                    return BadRequest("RegistrationDeadline Not Valid");
                }
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

            User fullUser = await _content.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            Event @event = await _content.Events.Include(e => e.ListOfUsers).Include(a => a.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);


            if(@event == null || user == null)
            {
                return NotFound();
            }

            if(!IsUserEligible(fullUser, @event))
            {
                return Unauthorized();
            }

            if(!@event.ListOfUsers.Contains(fullUser))
            {
                @event.ListOfUsers.Add(fullUser);
            }
            else
            {
                @event.ListOfUsers.Remove(fullUser);
            }

            @event.NumberOfUsers = (@event.ListOfUsers.Count() + 1).ToString();
            await _content.SaveChangesAsync();

            return true;
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            User user = GetCurrentUser();

            Event @event = await _content.Events.Include(p => p.CreatedBy).FirstOrDefaultAsync(u => u.EventId == id);

            if (@event == null)
            {
                return NotFound("Event not found!");
            }

            if(!(@event.CreatedBy.EmailAddress == user.EmailAddress))
            {
                return Unauthorized();
            }

            _content.Events.Remove(@event);

            await _content.SaveChangesAsync();

            return Ok($"Event with the id = {id} deleted!");
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
                        DateOfBirth = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.DateOfBirth)?.Value
                    };
                }
               
            }
            return null;
        }

        private bool IsUserEligible(User user, Event @event)
        {
            int userAge = GetAgeFromDateTime(DateTime.Parse(user.DateOfBirth));
            
            if (userAge > int.Parse(@event.MaxAge) || userAge < int.Parse(@event.MinAge) || int.Parse(@event.NumberOfUsers) >= int.Parse(@event.MaxUsers) || @event.CreatedBy.EmailAddress == user.EmailAddress)
            {
                return false;
            }
            
            return true;
        }
        // Credit to stackoverflow
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
            @event.Title = mods.Title == null ? @event.Title : mods.Title;
            @event.City = mods.City == null ? @event.City : mods.City;
            @event.Country = mods.Country == null ? @event.Country : mods.Country;
            @event.Date = mods.Date == null ? @event.Date : mods.Date;
            @event.MinAge = mods.MinAge == null ? @event.MinAge : mods.MinAge;
            @event.MaxAge = mods.MaxAge == null ? @event.MaxAge : mods.MaxAge;
            @event.Description = mods.Description == null ? @event.Description : mods.Description;
            @event.StreetName = mods.StreetName == null ? @event.StreetName : mods.StreetName;
            @event.ZipCode = mods.ZipCode == null ? @event.ZipCode : mods.ZipCode;
            @event.State = mods.State == null ? @event.State : mods.State;
            @event.MaxUsers = mods.MaxUsers == null ? @event.MaxUsers : mods.MaxUsers;
            @event.Activity = mods.Activity == null ? @event.Activity : mods.Activity;
        }

    }
}
