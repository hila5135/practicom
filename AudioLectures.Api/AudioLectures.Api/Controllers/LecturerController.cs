using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : Controller
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Lecturer>> GetById(int id)
        {
            var lecturer = await _lecturerService.GetLecturerByIdAsync(id);
            if (lecturer == null) return NotFound();
            return lecturer;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Lecturer lecturer)
        {
            await _lecturerService.AddLecturerAsync(lecturer);
            return CreatedAtAction(nameof(GetById), new { id = lecturer.LecturerId }, lecturer);
        }

    }
}
