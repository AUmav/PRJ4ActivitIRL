using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class UserCreateDTO
    {
        [MaxLength(255)]
        public string? Alias { get; set; }
        [MaxLength(80)]
        public string? FirstName { get; set; }
        [MaxLength(80)]
        public string? LastName { get; set; }
        [MaxLength(255)]
        public string? Password { get; set; }
        [MaxLength(80)]
        public string? Gender { get; set; }
        [MaxLength(20)]
        public string? DateOfBirth { get; set; }
        [MaxLength(254)]
        public string? EmailAddress { get; set; }
        [MaxLength(50)]
        public string? PhoneNumber { get; set; }
        [MaxLength(50)]
        public string? StreetName { get; set; }
        [MaxLength(10)]
        public string? ApartmentNumber { get; set; }
        [MaxLength(50)]
        public string? City { get; set; }
        [MaxLength(50)]
        public string? ZipCode { get; set; }
        [MaxLength(50)]
        public string? Country { get; set; }
    }
}
