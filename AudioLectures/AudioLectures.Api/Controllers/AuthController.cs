////using AudioLectures.Core.Models;
////using Microsoft.AspNetCore.Mvc;
////using Microsoft.IdentityModel.Tokens;
////using System.IdentityModel.Tokens.Jwt;
////using System.Security.Claims;
////using System.Text;

////[Route("api/[controller]")]
////[ApiController]
////public class AuthController : ControllerBase
////{
////    private readonly IConfiguration _configuration;

////    public AuthController(IConfiguration configuration)
////    {
////        _configuration = configuration;
////    }

////    [HttpPost]
////    public IActionResult Login([FromBody] LoginModel loginModel)
////    {
////        if (loginModel.UserName == "hila5135" && loginModel.UserPassword == "5135")
////        {
////            var claims = new List<Claim>()
////            {
////                new Claim(ClaimTypes.Name, "hila5135"),
////                new Claim(ClaimTypes.Role, "manager")
////            };

////            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
////            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
////            var tokeOptions = new JwtSecurityToken(
////                issuer: _configuration.GetValue<string>("JWT:Issuer"),
////                audience: _configuration.GetValue<string>("JWT:Audience"),
////                claims: claims,
////                expires: DateTime.Now.AddMinutes(6),
////                signingCredentials: signinCredentials
////            );
////            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
////            return Ok(new { Token = tokenString });
////        }
////        return Unauthorized();
////    }
////}

//using AudioLectures.Core.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//[Route("api/[controller]")]
//[ApiController]
//public class AuthController : ControllerBase
//{
//    private readonly IConfiguration _configuration;

//    public AuthController(IConfiguration configuration)
//    {
//        _configuration = configuration;
//    }

//    [HttpPost("login")]
//    public IActionResult Login([FromBody] LoginModel loginModel)
//    {
//        // 🔹 כאן צריך לבדוק את שם המשתמש והסיסמה מול ה-DB
//        if (loginModel.UserName == "hila5135" && loginModel.UserPassword == "5135")
//        {
//            string userRole = "manager"; // ✅ כאן אפשר להכניס Role מה-DB

//            var claims = new List<Claim>()
//            {
//                new Claim(ClaimTypes.Name, loginModel.UserName),
//                new Claim("role", userRole) // ✅ הוספת Role לטוקן
//            };

//            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
//            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//            var tokenOptions = new JwtSecurityToken(
//                issuer: _configuration["JWT:Issuer"],
//                audience: _configuration["JWT:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddHours(2), // 🔹 הארכת תוקף הטוקן
//                signingCredentials: signinCredentials
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

//            // ✅ החזרת ה-Role בתגובה כדי שתוכלי לבדוק אותו ב-Frontend
//            return Ok(new
//            {
//                Token = tokenString,
//                Expiration = tokenOptions.ValidTo,
//                Role = userRole
//            });
//        }

//        return Unauthorized("שם משתמש או סיסמה שגויים");
//    }
//}

using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginModel loginModel)
    {
        var user = _userService.Authenticate(loginModel.UserName, loginModel.UserPassword);
        if (user == null)
        {
            return Unauthorized(); // אם המשתמש לא נמצא, מחזירים 401
        }

        // יצירת רשימת ה-Claims הכוללת שם משתמש ותפקיד
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.UserRole) // הוספת התפקיד של המשתמש
        };

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var tokenOptions = new JwtSecurityToken(
            issuer: "your_issuer",
            audience: "your_audience",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        // מחזירים את הטוקן ואת התפקיד של המשתמש לתגובה
        return Ok(new { Token = tokenString, Role = user.UserRole });
    }
}


