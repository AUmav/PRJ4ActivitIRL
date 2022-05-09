using ActivitIRLApi.Data;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ActivitIRLApi.Authentication;
using ActivitIRLApi.Validaion;


namespace ActivitIRLApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _content;
        private readonly IPasswordHashManager _passwordManager;
        private readonly IMapper _mapper;
        private readonly IInputTypeValidation _typeValidater;

        public RegisterController(ApplicationDbContext content, IMapper mapper, IInputTypeValidation typeValidater, IPasswordHashManager passwordManager)
        {
            _content = content;
            _mapper = mapper;
            _passwordManager = passwordManager;
            _typeValidater = typeValidater;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDTO userCreateDTOData)
        {
            userCreateDTOData.EmailAddress = userCreateDTOData.EmailAddress.ToLower();

            if(!_typeValidater.IsValidEmail(userCreateDTOData.EmailAddress))
            {
                return Ok("Invalid Email Format");
            }
            if(!_typeValidater.IsDateOfBirthValid(userCreateDTOData.DateOfBirth))
            {
                return Ok("Invalid DateOfBirth");
            }
            User user = _mapper.Map<User>(userCreateDTOData);

            if (_content.Users.Any(u =>  u.EmailAddress == user.EmailAddress))
            {
                return Ok("Email Exists");
            }

            _passwordManager.CreatePasswordHash(userCreateDTOData.Password, out byte[] PWHash, out byte[] PWSalt);

            user.PWHash = PWHash;

            user.PWSalt = PWSalt;

            user.Role = "User";

            _content.Users.Add(user);
            await _content.SaveChangesAsync();

            UserGetDTO userCreateDTO = _mapper.Map<UserGetDTO>(user);

            return Ok("User Created");
        }
    }
}
