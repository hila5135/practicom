using AudioLectures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Repositories
{
    public interface ILecturerRepository
    {
        Task<IEnumerable<Lecturer>> GetAllAsync();
        Task<Lecturer> GetByIdAsync(int id);
        Task<List<Lecturer>> GetByNameAsync(string name);
        Task<Lecturer> AddAsync(Lecturer lecturer);
        Task<Lecturer> UpdateAsync(int id,Lecturer lecturer);
        Task DeleteAsync(int id);
    }
}
