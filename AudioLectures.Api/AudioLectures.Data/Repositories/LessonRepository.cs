using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class LessonRepository :ILessonRepository
    {
        public Task<IEnumerable<Lesson>> GetAllAsync() => Task.FromResult(new List<Lesson>() as IEnumerable<Lesson>);
        public Task<Lesson> GetByIdAsync(int id) => Task.FromResult(new Lesson());
        public Task AddAsync(Lesson lesson) => Task.CompletedTask;
        public Task UpdateAsync(Lesson lesson) => Task.CompletedTask;
        public Task DeleteAsync(int id) => Task.CompletedTask;
    }
}
