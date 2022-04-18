
namespace ActivitIRLApi.Models.DTOs
{
    public class EventCreateDTO
    {
        public string? Title { get; set; }
        public string Date { get; set; }
        public string? Activity { get; set; }
        public string? Description { get; set; }
        public string MaxUsers { get; set; }

        public string? StreetName { get; set; }
        public string ApartmentNumber { get; set; }
        public string? City { get; set; }
        public string ZipCode { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }

        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public string CreatedAt { get; set; }
        public string RegistrationDeadline { get; set; }

        public string? CreatedBy;
    }
}
