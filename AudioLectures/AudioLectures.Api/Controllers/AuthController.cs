using AudioLectures.Core.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        var token = _authService.GenerateJwtToken(model.UserName, model.UserPassword);

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized();
        }

        return Ok(new { Token = token });
    }
}


