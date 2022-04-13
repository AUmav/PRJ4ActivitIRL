﻿using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class UserCreateDTO
    {
        [MaxLength(80)]
        public string? FirstName { get; set; }
        [MaxLength(80)]
        public string? LastName { get; set; }
        [MaxLength(80)]
        public string? Gender { get; set; }
        [MaxLength(20)]
        public DateTime? Birthdate { get; set; }
        [MaxLength(254)]
        public string? EmailAddress { get; set; }
        [MaxLength(60)]
        public string? PWHash { get; set; }
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
    }
}
