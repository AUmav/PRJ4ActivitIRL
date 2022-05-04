using ActivitIRLApi.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class EventGetDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Activity { get; set; }
        public string Description { get; set; }
        public string? MaxUsers { get; set; }

        public string City { get; set; }
        public string ZipCode { get; set; }
        public string? State { get; set; }
        public string Country { get; set; }

        public string? MinAge { get; set; }
        public string? MaxAge { get; set; }

        public string? RegistrationDeadline { get; set; }
        public string NumberOfUsers { get; set; }
        public EventUserDTO CreatedBy { get; set; }
        [MaxLength(10000)]
        public byte[]? EventPicture { get; set; }

    }
}
