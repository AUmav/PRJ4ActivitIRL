using System.ComponentModel.DataAnnotations;


namespace ActivitIRLApi.Models.DTOs
{
    public class UserAliasDTO
    {
        [MaxLength(255)]
        public string Alias { get; set; }
    }
}
