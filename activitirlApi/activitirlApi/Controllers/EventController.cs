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

        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _content.Events.ToListAsync();
        }


        [HttpGet("DummyEvent")]
        public EventGetPublicDTO GetDummyEvent()
        {
            var PublicEvent = new EventGetPublicDTO() { EventId = 1, Title = "Aarhus Event", City = "Aarhus C", ZipCode = 8000, Activity = "Fodbold" };

            return PublicEvent;

        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventGetPublicDTO>> GetEvent(int id)
        {
            Event PublicEvent = await _content.Events.FindAsync(id);

            if (PublicEvent == null && PublicEvent.IsHidden)
            {
                return NotFound();
            }

            return _mapper.Map<EventGetPublicDTO>(PublicEvent);
        }

        // PUT: api/Event/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.EventId)
            {
                return BadRequest();
            }

            _content.Entry(@event).State = EntityState.Modified;

            try
            {
                await _content.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/Event
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EventGetPrivateDTO>> CreateEvent([FromBody] EventCreateDTO CreateDTO)
        {
            Event domainEvent = _mapper.Map<Event>(CreateDTO);

            domainEvent.CreatedBy = (Models.Entities.User)_content.Users.Where(u => u.Alias == CreateDTO.CreatedBy.Alias);

            _content.Events.Add(_mapper.Map<Event>(domainEvent));

            await _content.SaveChangesAsync();

            EventGetPrivateDTO privateEvent = _mapper.Map<EventGetPrivateDTO>(domainEvent);
            
            return CreatedAtAction("GetEvent", new { id = privateEvent.EventId }, privateEvent);
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _content.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _content.Events.Remove(@event);
            await _content.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _content.Events.Any(e => e.EventId == id);
        }
    }
}
