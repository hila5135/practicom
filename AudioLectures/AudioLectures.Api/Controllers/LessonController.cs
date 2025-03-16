using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpGet]
        public async Task<IEnumerable<Lesson>> GetAll()
        {
            return await _lessonService.GetAllLessonsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetById(int id)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(id);
            if (lesson == null) return NotFound();
            return lesson;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Lesson lesson)
        {
            await _lessonService.AddLessonAsync(lesson);
            return CreatedAtAction(nameof(GetById), new { id = lesson.LessonId }, lesson);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Lesson lesson)
        {
            if (id != lesson.LessonId)
            {
                return BadRequest();
            }

            if (lesson.LessonLecturerId > 0)
            {
                lesson.LessonLecturer = null; 
            }

            await _lessonService.UpdateLessonAsync(lesson);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _lessonService.DeleteLessonAsync(id);
            return Ok("Lesson deleted successfully");
        }
    }
}
