namespace ActivitIRLApi.Models.Entities
{
    public class User
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? Birthdate { get; set; }

        public string? EmailAddress { get; set; }
        public string? Password { get; set; }
        public int? PhoneNumber { get; set; }

        public string? StreetName { get; set; }
        public int? ApartmentNumber { get; set; }
        public string? City { get; set; }
        public int? ZipCode { get; set; }
        public string? Country { get; set; }

        public int? UserId { get; set; } //Primary key

        //public List<string>? preferences { get; set; }
    }
}
