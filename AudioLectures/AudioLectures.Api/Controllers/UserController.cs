using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using AudioLectures.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AudioLectures.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<IEnumerable<User>> GetAll([FromQuery] string? name,
            [FromQuery] string? email,
            [FromQuery] string? role)
        {
            Console.WriteLine(">>> CONTROLLER DIRECT HIT DB TEST");
            var test = await _userService.GetAllAsync(name, email, role);
            Console.WriteLine($"RESULT COUNT: {test.Count()}");

            return test;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return user;
        }
        [HttpPost]
        public async Task<ActionResult<User>> Add([FromBody] UserDTO user)
        {
            User u = await _userService.AddUserAsync(user);
            return Ok(u);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromBody] UserDTO user)
        {
            User u = await _userService.UpdateUserAsync(id, user);
            if (u == null)
            {
                return NotFound();
            }
            return Ok(u);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok("the request secceeded");
        }
        
    }
}
