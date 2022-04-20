﻿
namespace ActivitIRLApi.Models.DTOs
{
    public class EventCreateDTO
    {
        public string Title { get; set; }
        public string Date { get; set; }
        public string Activity { get; set; }
        public string Description { get; set; }
        public string? MaxUsers { get; set; }

        public string StreetName { get; set; }
        public string ApartmentNumber { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string? State { get; set; }
        public string Country { get; set; }

        public string? MinAge { get; set; }
        public string? MaxAge { get; set; }
    
        public string? RegistrationDeadline { get; set; }
    }
}
