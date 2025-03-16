using AudioLectures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Services
{
    public interface ILecturerService
    {
        Task<IEnumerable<Lecturer>> GetAllLecturersAsync();
        Task<Lecturer> GetLecturerByIdAsync(int id);
        Task AddLecturerAsync(Lecturer lecturer);
        Task UpdateLecturerAsync(Lecturer lecturer);
        Task DeleteLecturerAsync(int id);
    }
}
