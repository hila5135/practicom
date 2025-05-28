using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
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
        [HttpGet("title")]
        public async Task<IEnumerable<string>> GetAllTitles()
        {
            return await _lessonService.GetAllTitlesAsync();
        }
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Lesson>> GetById(int id)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(id);
            if (lesson == null) return NotFound();
            return lesson;
        }
        [HttpGet("title/{title}")]
        public async Task<ActionResult<List<Lesson>>> GetByTitle(string title)
        {
            var lesson = await _lessonService.GetLessonByTitleAsync(title);
            if (lesson == null) return NotFound();
            return lesson;
        }
        [HttpGet("name/{name}")]

        public async Task<ActionResult<List<Lesson>>> GetByName(string name)
        {
            var lesson = await _lessonService.GetLessonByNameAsync(name);
            if (lesson == null) return NotFound();
            return lesson;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Lesson>> Add([FromBody] LessonDTO lesson)
        {
            Lesson l = await _lessonService.AddLessonAsync(lesson);
            return Ok(l);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] LessonDTO lesson)
        {
            Lesson l = await _lessonService.UpdateLessonAsync(id, lesson);
            if (l== null)
            {
                return NotFound();
            }
            return Ok(l);
        }

        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _lessonService.DeleteLessonAsync(id);
            return Ok("Lesson deleted successfully");
        }
    }
}
