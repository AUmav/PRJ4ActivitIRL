using ActivitIRLApi.Models.Entities;

namespace ActivitIRLApi.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Activity { get; set; }
        public string? Description { get; set; }
        public string? MaxUsers { get; set; }

        public string? StreetName { get; set; }
        public string ApartmentNumber { get; set; }
        public string? City { get; set; }
        public string ZipCode { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }

        public string? MinAge { get; set; }
        public string? MaxAge { get; set; }
        public string CreatedAt { get; set; } //Derived
        public string RegistrationDeadline { get; set; }
        public string NumberOfUsers { get; set; } // Derived. 
        public List<User>? ListOfUsers { get; set; } //Kunne ikke lave med UserId
        
        public User CreatedBy; // Foreign key
        //picture JPEG

        public List<Comment>? Comments { get; set; } //Foreign key

        
    }
}
