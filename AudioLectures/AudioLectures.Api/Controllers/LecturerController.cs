using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using AudioLectures.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        private readonly ILecturerService _lecturerService;

        public LecturerController(ILecturerService lecturerService)
        {
            _lecturerService = lecturerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Lecturer>> GetAll()
        {
            return await _lecturerService.GetAllLecturersAsync();
        }

        [HttpGet("id/{LecturerId}")]
        public async Task<ActionResult<Lecturer>> GetById(int LecturerId)
        {
            var lecturer = await _lecturerService.GetLecturerByIdAsync(LecturerId);
            if (lecturer == null) return NotFound();
            return lecturer;
        }
        [HttpGet("name/{LecturerName}")]
        public async Task<ActionResult<List<Lecturer>>> GetByName(string LecturerName)
        {
            var lecturer = await _lecturerService.GetLecturerByNameAsync(LecturerName);
            if (lecturer == null) return NotFound();
            return lecturer;
        }
        [HttpPost]
        public async Task<ActionResult<Lecturer>> Add([FromBody] LecturerDTO lecturer)
        {
            Lecturer l = await _lecturerService.AddLecturerAsync(lecturer);
            return Ok(l);
        }
        [HttpPut("{LecturerId}")]
        public async Task<IActionResult> Update(int LecturerId, [FromBody] LecturerDTO lecturer)
        {
            Lecturer l = await _lecturerService.UpdateLecturerAsync(LecturerId, lecturer);
            if (l == null)
            {
                return NotFound();
            }
            return Ok(l);
        }
        [HttpDelete("{LecturerId}")]
        public async Task<IActionResult> Delete(int LecturerId)
        {
            await _lecturerService.DeleteLecturerAsync(LecturerId);
            return NoContent();
        }

    }
}
