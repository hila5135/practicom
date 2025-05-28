using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class LessonRepository :ILessonRepository
    {
        private readonly DataContext _context;  

        public LessonRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lesson>> GetAllAsync() => await _context.Lessons.Include(s => s.LessonLecturer).Include(s => s.LessonUsers).ToListAsync();
        public async Task<IEnumerable<string>> GetAllTitlesAsync() => await _context.Lessons.Select(lesson=> lesson.LessonTitle).Distinct().ToListAsync();

        public async Task<Lesson> GetByIdAsync(int id) => await _context.Lessons.FindAsync(id);
        public async Task<List<Lesson>> GetByTitleAsync(string title) =>  await _context.Lessons.Where(s => s.LessonTitle == title).Include(s=>s.LessonLecturer).ToListAsync();
        public async Task<List<Lesson>> GetByNameAsync(string name) =>  await _context.Lessons.Where(s => s.LessonName == name).Include(s=>s.LessonLecturer).ToListAsync();
        public async Task<Lesson> AddAsync(Lesson lesson)
        {
            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<Lesson> UpdateAsync(int id, Lesson lesson)  
        {
            Lesson s = await _context.Lessons.SingleOrDefaultAsync(act => act.LessonId == id);
            if (s == null) return null;
            else
            {
                s.LessonTitle = lesson.LessonTitle;
                s.LessonDuration = lesson.LessonDuration;
                s.LessonListenersCount=lesson.LessonListenersCount;
                s.LessonUrl = lesson.LessonUrl;
                s.LessonReleaseDate = lesson.LessonReleaseDate;
                s.LessonLecturer = lesson.LessonLecturer;
                s.LessonLecturerId = lesson.LessonLecturerId;
                s.LessonUsers = lesson.LessonUsers;

            }
            await _context.SaveChangesAsync();
            return s;

        }

        public async Task DeleteAsync(int id) { var entity = await _context.Lessons.FindAsync(id); if (entity != null) { _context.Lessons.Remove(entity); await _context.SaveChangesAsync(); } }

    }
}
