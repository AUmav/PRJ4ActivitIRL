using ActivitIRLApi.Data;
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
        string Authenticate(string username, string password);
    }

    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {
        private readonly ApplicationDbContext _context;

        private readonly string tokenKey;

        public JWTAuthenticationManager(string tokenKey)
        {
            this.tokenKey = tokenKey;
        }

        public string Authenticate(string username, string password)
        {
            //if (!users.Any(u => u.Key == username && u.Value == password))
            //{
            //    return null;
            //}

            var tokenhandler = new jwtsecuritytokenhandler();
            var key = encoding.ascii.getbytes(tokenkey);
            var tokendescriptor = new securitytokendescriptor
            {
                subject = new claimsidentity(new claim[]
                {
                    new claim(claimtypes.name, username)
                }),
                expires = datetime.utcnow.addhours(1),
                signingcredentials = new signingcredentials(
                    new symmetricsecuritykey(key),
                    securityalgorithms.hmacsha256signature)
            };
            var token = tokenhandler.createtoken(tokendescriptor);
            return tokenhandler.writetoken(token);
            return "LOL";
        }
    }
}
