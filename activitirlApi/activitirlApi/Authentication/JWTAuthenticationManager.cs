using ActivitIRLApi.Data;
using ActivitIRLApi.Models.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ActivitIRLApi.Authentication
{
    public interface IJWTAuthenticationManager
    {
        string Authenticate(User user);
    }

    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {

        private IConfiguration _config;

        public JWTAuthenticationManager(IConfiguration config)
        {
            _config = config;
        }

        public string Authenticate(User user) 
        { 
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.EmailAddress),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.DateOfBirth, user.DateOfBirth.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token); 
        }
    }
}
