//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//namespace AudioLectures.Service
//{
//    public class AuthService
//    {
//        private readonly IConfiguration _configuration;

//        public AuthService(IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }

//        public string GenerateJwtToken(string username, string[] roles)
//        {
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//            var claims = new List<Claim>
//        {
//            new Claim(ClaimTypes.Name, username)
//        };

//            // הוספת תפקידים כ-Claims
//            foreach (var role in roles)
//            {
//                claims.Add(new Claim(ClaimTypes.Role, role));
//            }

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.Now.AddMinutes(30),
//                signingCredentials: credentials
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}

using AudioLectures.Core.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository; // אם יש רפוזיטורי למשתמשים

    public AuthService(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    public string GenerateJwtToken(string username, string password)
    {
        // 1. אם נתוני ההתחברות תואמים לערכים קבועים
        if (username == "hila5135" && password == "5135")
        {
            return GenerateToken(username, new[] { "Admin" });
        }

        // 2. בדיקה אם המשתמש קיים במאגר
        var user = _userRepository.GetUserByCredentials(username, password);
        if (user != null)
        {
            // אם המשתמש קיים במאגר - תפקיד User
            return GenerateToken(username, new[] { "User" });
        }

        // 3. אם המשתמש לא קיים במאגר - משתמש חדש, תפקיד Viewer
        return GenerateToken(username, new[] { "Viewer" });
    }

    private string GenerateToken(string username, string[] roles)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username)
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
