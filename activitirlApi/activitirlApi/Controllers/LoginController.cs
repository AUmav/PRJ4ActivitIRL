using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Data;
using ActivitIRLApi.Authentication;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Validaion;

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _config;
        private readonly ApplicationDbContext _content;
        private readonly IPasswordHashManager _passwordManager;
        private readonly IJWTAuthenticationManager _jWTAuthenticationManager;
        private readonly IInputTypeValidation _typeValidater;
        

        public LoginController(ApplicationDbContext content, IConfiguration config, IInputTypeValidation typeValidater, IPasswordHashManager passwordManager, IJWTAuthenticationManager jWTAuthenticationManager)
        {
            _config = config;
            _content = content;
            _passwordManager = passwordManager;
            _jWTAuthenticationManager = jWTAuthenticationManager;
            _jWTAuthenticationManager.Init(config);
            _typeValidater = typeValidater;

        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO loginDTOData)
        {
            User user = null;

            switch (_typeValidater.IsValidEmail(loginDTOData.EmailAddressOrAlias))
            {
                case true:
                    if(_content.Users.Any(e => e.EmailAddress == loginDTOData.EmailAddressOrAlias.ToLower()))
                    {
                        user = _content.Users.FirstOrDefault(e => e.EmailAddress == loginDTOData.EmailAddressOrAlias.ToLower());
                    }
                    break;

                case false:
                    if (_content.Users.Any(e => e.Alias == loginDTOData.EmailAddressOrAlias))
                    {
                        user = _content.Users.FirstOrDefault(e => e.Alias == loginDTOData.EmailAddressOrAlias);
                    }
                    break;
            }

            if(user == null)
            {
                return Ok("Invalid Username or Email");
            }

            if(!_passwordManager.VerifyPasswordHash(loginDTOData.Password, user.PWHash, user.PWSalt))
            {
                return Ok("Wrong Password");
            }

            return Ok(_jWTAuthenticationManager.Authenticate(user));
        }
    }
}

