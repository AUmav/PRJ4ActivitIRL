using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class UserLoginDTO
    {
        [MaxLength(254)]
        public string EmailAddress { get; set; }
        [MaxLength(60)]
        public byte[] Password { get; set; }
        [MaxLength(255)]
        public UserAliasDTO UserAlias { get; set; }
    }
}
