using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using AudioLectures.Core.Services;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public LessonService(ILessonRepository lessonRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Lesson>> GetAllLessonsAsync() =>await _lessonRepository.GetAllAsync();
        public async Task<IEnumerable<string>> GetAllTitlesAsync() => await _lessonRepository.GetAllTitlesAsync();

        public async Task<Lesson> GetLessonByIdAsync(int id) =>await _lessonRepository.GetByIdAsync(id);
        public async Task<List<Lesson>> GetLessonByTitleAsync(string title) => await _lessonRepository.GetByTitleAsync(title);
        public async Task<List<Lesson>> GetLessonByNameAsync(string name) => await _lessonRepository.GetByNameAsync(name);

        public async Task<Lesson> AddLessonAsync(LessonDTO lesson)
        {
            var lessonMap = _mapper.Map<Lesson>(lesson);
            return await _lessonRepository.AddAsync(lessonMap);
        }
        public async Task<Lesson> UpdateLessonAsync(int id, LessonDTO lesson)
        {
            var lessonMap = _mapper.Map<Lesson>(lesson);
            return await _lessonRepository.UpdateAsync(id, lessonMap);
        }

        public async Task DeleteLessonAsync(int id) =>await _lessonRepository.DeleteAsync(id);
    }
}
