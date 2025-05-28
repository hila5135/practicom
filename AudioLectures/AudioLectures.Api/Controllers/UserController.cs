using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using AudioLectures.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        //[Authorize(policy:"AdminOnly")]
        [HttpGet]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userService.GetAllUsersAsync();
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
        //[Authorize(policy:"EditorOrAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok("the request secceeded");
        }
        
    }
}
