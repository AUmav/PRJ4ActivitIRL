namespace ActivitIRLApi.Models.DTOs
{
    public class EventGet
    {

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
        public string CreatedBy { get; set; }
        public string ProfilePicture { get; set; }
        public string CommentList { get; set; }

    }
}
