using ActivitIRLApi.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class EventGetSignedupDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Activity { get; set; }
        public string Description { get; set; }
        public int? MaxUsers { get; set; }

        public string StreetName { get; set; }
        public int ApartmentNumber { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string? State { get; set; }
        public string Country { get; set; }

        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }
        public int NumberOfUsers { get; set; }
        public bool IsSignedup { get; set; }

        public DateTime? RegistrationDeadline { get; set; }
        
        public EventUserDTO CreatedBy { get; set; }

        [MaxLength(10000)]
        public byte[]? EventPicture { get; set; }

        public List<Comment> CommentList { get; set; }


    }
}
