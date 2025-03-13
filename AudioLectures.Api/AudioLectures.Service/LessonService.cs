using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using AudioLectures.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Service
{
    public class LessonService :ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public Task<IEnumerable<Lesson>> GetAllLessonsAsync() => _lessonRepository.GetAllAsync();
        public Task<Lesson> GetLessonByIdAsync(int id) => _lessonRepository.GetByIdAsync(id);
        public Task AddLessonAsync(Lesson lesson) => _lessonRepository.AddAsync(lesson);
        public Task UpdateLessonAsync(Lesson lesson) => _lessonRepository.UpdateAsync(lesson);
        public Task DeleteLessonAsync(int id) => _lessonRepository.DeleteAsync(id);
    }
}
