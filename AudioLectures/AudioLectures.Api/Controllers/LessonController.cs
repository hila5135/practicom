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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Lesson lesson)
        {
            await _lessonService.AddLessonAsync(lesson);
            return CreatedAtAction(nameof(GetById), new { id = lesson.LessonId }, lesson);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Lesson lesson)
        {
            if (id != lesson.LessonId)
            {
                return BadRequest();
            }

            // אם ה-lessonLecturerId התקבל, לא נדרש להמיר אובייקט Lecturer
            if (lesson.LessonLecturerId > 0)
            {
                lesson.LessonLecturer = null; // לא צריך להמיר אובייקט
            }

            await _lessonService.UpdateLessonAsync(lesson);
            return NoContent();
        }
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id,[FromBody] Lesson lesson)//עדכון
        //{
        //    if (id != lesson.LessonId) return BadRequest();
        //    await _lessonService.UpdateLessonAsync(lesson);
        //    return NoContent();
        //}

        [Authorize(Roles="manager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _lessonService.DeleteLessonAsync(id);
            return NoContent();
        }
    }
}
