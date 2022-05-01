using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class EventUserDTO
    {
        [MaxLength(255)]
        public string? Alias { get; set; }
        [MaxLength(80)]
        public string? FirstName { get; set; }
        [MaxLength(80)]
        public string? LastName { get; set; }
        [MaxLength(254)]
        public string? EmailAddress { get; set; }
        [MaxLength(10000)]
        public byte[] ProfilePicture { get; set; }
    }
}
