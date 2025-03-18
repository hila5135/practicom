using AudioLectures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Repositories
{
    public interface ILessonRepository
    {
        Task<IEnumerable<Lesson>> GetAllAsync();
        Task<Lesson> GetByIdAsync(int id);
        Task<Lesson> AddAsync(Lesson lesson);
        Task<Lesson> UpdateAsync(int id,Lesson lesson);
        Task DeleteAsync(int id);
    }
}
