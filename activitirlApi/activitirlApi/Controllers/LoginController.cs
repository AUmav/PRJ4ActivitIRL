using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Data;
using ActivitIRLApi.Authentication;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _config;
        private readonly ApplicationDbContext _content;
        private readonly PasswordHashManager _passwordHasher;

        public LoginController(ApplicationDbContext content, IConfiguration config)
        {
            _config = config;
            _content = content;
            _passwordHasher = new PasswordHashManager();

        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO loginDTOData)
        {
            if(!_content.Users.Any(e => e.Alias == loginDTOData.UserAlias.Alias))
            {
                return Ok("User Not Found");
            }
            
            if(!)
            
        }


    }
}
