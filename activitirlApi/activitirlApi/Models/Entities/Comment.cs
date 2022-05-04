using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.Entities
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }//Primary key
        [MaxLength(1000)]
        public string? Comments { get; set; }
        public string Created { get; set; }
        public User CreatedBy { get; set; }
        public Event CreatedIn { get; set; }
    }
}
