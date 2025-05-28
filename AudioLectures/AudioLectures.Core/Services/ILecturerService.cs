using AudioLectures.Api.Dtos;
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
       public Task<IEnumerable<Lecturer>> GetAllLecturersAsync();
       public Task<Lecturer> GetLecturerByIdAsync(int id);
       public Task<List<Lecturer>> GetLecturerByNameAsync(string title);
       public Task<Lecturer> AddLecturerAsync(LecturerDTO lecturer);
       public Task<Lecturer> UpdateLecturerAsync(int id,LecturerDTO lecturer);
       public Task DeleteLecturerAsync(int id);
    }
}
