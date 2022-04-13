using ActivitIRLApi.Models.Entities;

namespace ActivitIRLApi.Models.DTOs
{
    public class EventGetPrivateDTO
    {
        public int EventId { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public string? Activity { get; set; }
        public string? Description { get; set; }
        public int MaxUsers { get; set; }

        public string? StreetName { get; set; }
        public int ApartmentNumber { get; set; }
        public string? City { get; set; }
        public int ZipCode { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }

        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime RegistrationDeadline { get; set; }

        public List<UserAliasDTO>? ListOfUsers { get; set; }

        public UserAliasDTO? CreatedBy;
    }
}
