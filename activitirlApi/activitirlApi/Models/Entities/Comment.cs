namespace ActivitIRLApi.Models.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }//Primary key
        public string? Comments { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
    }
}
