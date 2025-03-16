using AudioLectures.Core.Models;
using AudioLectures.Core.Services;
using AudioLectures.Service;
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

        [HttpGet("{LecturerId}")]
        public async Task<ActionResult<Lecturer>> GetById(int LecturerId)
        {
            var lecturer = await _lecturerService.GetLecturerByIdAsync(LecturerId);
            if (lecturer == null) return NotFound();
            return lecturer;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Lecturer lecturer)
        {
            await _lecturerService.AddLecturerAsync(lecturer);
            return CreatedAtAction(nameof(GetById), new { LecturerId = lecturer.LecturerId }, lecturer);
        }
        [HttpPut("{LecturerId}")]
        public async Task<IActionResult> Update(int LecturerId, [FromBody] Lecturer lecturer)
        {
            // אם הLecturerId בנתיב לא תואם לזה שבאובייקט, מחזירים BadRequest
            if (LecturerId != lecturer.LecturerId)
            {
                return BadRequest("Lecturer ID mismatch.");
            }

            // שוודא שהLecturer יש שיעורים
            if (lecturer.LecturerLessons == null || !lecturer.LecturerLessons.Any())
            {
                return BadRequest("Lecturer must have at least one lesson.");
            }

            // נוודא שכל שיעור שיש לו LecturerValid תואם למרצה
            foreach (var lesson in lecturer.LecturerLessons)
            {
                if (lesson.LessonLecturer == null || lesson.LessonLecturer.LecturerId != lecturer.LecturerId)
                {
                    return BadRequest("Each lesson must have a valid lecturer.");
                }

                // במקרה של שיעור עם LecturerId אבל בלי Lecturer מלא, עדכן אותו כאן (אם צריך)
                if (lesson.LessonLecturer != null && lesson.LessonLecturer.LecturerId != lecturer.LecturerId)
                {
                    lesson.LessonLecturer = new Lecturer
                    {
                        LecturerId = lecturer.LecturerId,
                        LecturerName = lecturer.LecturerName
                    };
                }
            }

            // עכשיו נבצע את העדכון של המרצה
            try
            {
                await _lecturerService.UpdateLecturerAsync(lecturer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NoContent(); // לא מחזירים תוכן כי העדכון בוצע בהצלחה
        }
        //[HttpPut("{LecturerId}")]
        //public async Task<IActionResult> Update(int LecturerId, [FromBody] Lecturer lecturer)
        //{
        //    if (LecturerId != lecturer.LecturerId) return BadRequest();
        //    await _lecturerService.UpdateLecturerAsync(lecturer);
        //    return NoContent();
        //}
        [HttpDelete("{LecturerId}")]
        public async Task<IActionResult> Delete(int LecturerId)
        {
            await _lecturerService.DeleteLecturerAsync(LecturerId);
            return NoContent();
        }
    }
}
