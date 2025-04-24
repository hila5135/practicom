using AudioLectures.Core.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthService(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }
    //public async Task<string?> GenerateJwtTokenAsync(string username, string userpassword)
    //{
    //    if (username == "hila5135" && userpassword == "5135")
    //    {
    //        return GenerateToken(username, new[] { "Admin" });
    //    }


    //    var user = await _userRepository.GetUserByCredentialsAsync(username,userpassword );
    //  if (user != null)
    //  {
    //    return GenerateToken(username, new[] { "User" });
    //  }

    //  return null; // אם המשתמש לא נמצא, נחזיר null
    //}

    public async Task<string?> GenerateJwtTokenAsync(string username, string userpassword)
    {
        var user = await _userRepository.GetUserByCredentialsAsync(username, userpassword);

        if (user != null)
        {
            // משתמש בתפקיד שמגיע מהמסד (User, Admin וכו׳)
            return GenerateToken(username, new[] { user.UserRole });
        }

        return null;
    }
    private string GenerateToken(string username, string[] roles)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, username),
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
