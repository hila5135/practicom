using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class LecturerRepository :ILecturerRepository
    {
        public Task<IEnumerable<Lecturer>> GetAllAsync() => Task.FromResult(new List<Lecturer>() as IEnumerable<Lecturer>);
        public Task<Lecturer> GetByIdAsync(int id) => Task.FromResult(new Lecturer());
        public Task AddAsync(Lecturer lecturer) => Task.CompletedTask;
        public Task UpdateAsync(Lecturer lecturer) => Task.CompletedTask;
        public Task DeleteAsync(int id) => Task.CompletedTask;
    }
}
