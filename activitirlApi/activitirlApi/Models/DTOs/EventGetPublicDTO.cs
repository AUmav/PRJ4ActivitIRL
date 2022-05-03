namespace ActivitIRLApi.Models
{
    public class EventGetPublicDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string Activity { get; set; }
        public DateTime Date { get; set; }
    }
}
