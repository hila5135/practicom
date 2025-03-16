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
    public class LecturerService :ILecturerService
    {
        private readonly ILecturerRepository _lecturerRepository;
        public LecturerService(ILecturerRepository lecturerRepository)
        {
            _lecturerRepository = lecturerRepository;
        }
        public Task<IEnumerable<Lecturer>> GetAllLecturersAsync() => _lecturerRepository.GetAllAsync();
        public Task<Lecturer> GetLecturerByIdAsync(int id) => _lecturerRepository.GetByIdAsync(id);
        public Task AddLecturerAsync(Lecturer lecturer) => _lecturerRepository.AddAsync(lecturer);
        public Task UpdateLecturerAsync(Lecturer lecturer) => _lecturerRepository.UpdateAsync(lecturer);
        public Task DeleteLecturerAsync(int id) => _lecturerRepository.DeleteAsync(id);
    }
}
