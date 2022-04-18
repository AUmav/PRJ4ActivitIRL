using System.ComponentModel.DataAnnotations;

namespace ActivitIRLApi.Models.DTOs
{
    public class UserLoginDTO
    {
        [MaxLength(254)]
        public string EmailAddressOrAlias { get; set; }
        [MaxLength(60)]
        public string Password { get; set; }
    }
}
