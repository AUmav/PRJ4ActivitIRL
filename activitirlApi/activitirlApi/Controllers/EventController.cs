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



        [HttpGet("DummyEvent")]
        public EventGetPublicListDTO GetDummyEvent()
        {
            var PublicEvent = new EventGetPublicListDTO() { EventId = "1", Title = "Aarhus Event", City = "Aarhus C", ZipCode = "8000", Activity = "Fodbold" };

            return PublicEvent;

        }

        // POST: api/Event
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<EventGetPrivateDTO>> CreateEvent([FromBody] EventCreateDTO CreateDTO)
        //{
        //    Event domainEvent = _mapper.Map<Event>(CreateDTO);

        //    domainEvent.CreatedBy = (Models.Entities.User)_content.Users.Where(u => u.Alias == CreateDTO.CreatedBy);

        //    _content.Events.Add(_mapper.Map<Event>(domainEvent));

        //    await _content.SaveChangesAsync();

        //    EventGetPrivateDTO privateEvent = _mapper.Map<EventGetPrivateDTO>(domainEvent);
            
        //    return CreatedAtAction("GetEvent", new { id = privateEvent.EventId }, privateEvent);
        //}

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
