using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Services
{
    public interface ILessonService
    {
        Task<IEnumerable<Lesson>> GetAllLessonsAsync();
        Task<IEnumerable<string>> GetAllTitlesAsync();
        Task<Lesson> GetLessonByIdAsync(int id);
        Task<List<Lesson>> GetLessonByTitleAsync(string title);
        Task<List<Lesson>> GetLessonByNameAsync(string name);
        Task<Lesson> AddLessonAsync(LessonDTO lesson);
        Task<Lesson> UpdateLessonAsync(int id, LessonDTO lesson);
        Task DeleteLessonAsync(int id);
    }
}
