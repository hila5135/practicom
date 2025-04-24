using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IUserRepository _userRepository;

    public AuthController(AuthService authService, IUserRepository userRepository)
    {
      _authService = authService;
      _userRepository = userRepository;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
      var user =await _userRepository.GetUserByCredentialsAsync(model.UserName, model.UserPassword);

    if (user == null)
    {
      return Unauthorized("Invalid username or password");
    }
    var token =await _authService.GenerateJwtTokenAsync(model.UserName, model.UserPassword);

    return Ok(new { Token = token });
    }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterModel model)
  {
    var existingUser =await _userRepository.GetUserByCredentialsAsync(model.UserName, model.UserPassword);

    if (existingUser != null)
    {
      return BadRequest("User already exists");
    }

    // קביעת תפקיד – נניח שכל משתמש חדש יהיה "User" כברירת מחדל
    var newUser = new User
    {
      UserName = model.UserName,
      UserPassword = model.UserPassword,
      UserEmail = model.UserEmail,// כדאי להצפין סיסמאות
      UserRole = "User" // ברירת מחדל
    };

    await _userRepository.AddAsync(newUser);

    var token =await _authService.GenerateJwtTokenAsync(model.UserName, model.UserPassword);
    return Ok(new { Token = token });
  }


}


