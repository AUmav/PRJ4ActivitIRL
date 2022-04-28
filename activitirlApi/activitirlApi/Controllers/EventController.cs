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

            privateEvent.CreatedBy = domainEvent.CreatedBy.EmailAddress;

            return CreatedAtAction("GetEvent", new { id = privateEvent.EventId }, privateEvent);
        }

        // DELETE: api/Event/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<EventGetDTO>> GetEvent(int id)
        {

            var @event = await _content.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }


            return _mapper.Map<EventGetDTO>(@event);
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



        private bool EventExists(int id)
        {
            return _content.Events.Any(e => e.EventId == id);
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
