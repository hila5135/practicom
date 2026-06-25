using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using AudioLectures.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IUserRepository _userRepository;
    private readonly EmailService _emailService;

    public AuthController(AuthService authService, IUserRepository userRepository, EmailService emailService)
    {
        _authService = authService;
        _userRepository = userRepository;
        _emailService = emailService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userRepository.GetUserByCredentialsAsync(model.UserName, model.UserPassword);

        if (user == null)
        {
            return Unauthorized("Invalid username or password");
        }
        var token = await _authService.GenerateJwtTokenAsync(model.UserName, model.UserPassword);

        return Ok(new { Token = token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var start = DateTime.Now;


        var existingUser = await _userRepository.GetUserByCredentialsAsync(model.UserName, model.UserPassword);
        Console.WriteLine($"Check user: {(DateTime.Now - start).TotalMilliseconds} ms");
        if (existingUser != null)
        {
            return BadRequest("User already exists");
        }

        var newUser = new User
        {
            UserName = model.UserName,
            UserPassword = model.UserPassword,
            UserEmail = model.UserEmail,
            UserRole = "User" 
        };

        await _userRepository.AddAsync(newUser);
        Console.WriteLine($"Add user: {(DateTime.Now - start).TotalMilliseconds} ms");
        start = DateTime.Now;


        var token = await _authService.GenerateJwtTokenAsync(model.UserName, model.UserPassword);
        Console.WriteLine($"JWT: {(DateTime.Now - start).TotalMilliseconds} ms");
        return Ok(new { Token = token });
    }


}


