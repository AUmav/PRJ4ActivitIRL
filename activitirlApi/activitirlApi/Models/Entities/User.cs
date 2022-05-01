using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.Entities
{
    public class User
    {
        [MaxLength(255)]
        public string? Alias { get; set; }
        [MaxLength(80)]
        public string? FirstName { get; set; }
        [MaxLength(80)]
        public string? LastName { get; set; }
        [MaxLength(80)]
        public string? Gender { get; set; }
        [MaxLength(20)]
        public DateTime DateOfBirth { get; set; }
        [MaxLength(254)]
        public string? EmailAddress { get; set; }
        [MaxLength(255)]
        public byte[] PWHash { get; set; }
        [MaxLength(255)]
        public byte[] PWSalt { get; set; }
        [MaxLength(50)]
        public int? PhoneNumber { get; set; }
        [MaxLength(50)]
        public string? StreetName { get; set; }
        [MaxLength(10)]
        public int? ApartmentNumber { get; set; }
        [MaxLength(50)]
        public string? City { get; set; }
        [MaxLength(50)]
        public int? ZipCode { get; set; }
        [MaxLength(50)]
        public string? Country { get; set; }
        [Key]
        public int? UserId { get; set; } //Primary key
        [MaxLength(100)]
        public string Role { get; set; }
        [MaxLength(10000)]
        public byte[]? ProfilePicture { get; set; }

        public List<Event>? Events { get; set; } // Foreign keys

        public List<Preference>? preferences { get; set; }
    }
}
