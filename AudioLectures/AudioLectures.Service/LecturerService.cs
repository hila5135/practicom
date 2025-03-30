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
    public class LecturerService :ILecturerService
    {
        private readonly ILecturerRepository _lecturerRepository;
        private readonly IMapper _mapper;
        public LecturerService(ILecturerRepository lecturerRepository, IMapper mapper)
        {
            _lecturerRepository = lecturerRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Lecturer>> GetAllLecturersAsync() =>await _lecturerRepository.GetAllAsync();
        public async Task<Lecturer> GetLecturerByIdAsync(int id) => await _lecturerRepository.GetByIdAsync(id);
        public async Task<List<Lecturer>> GetLecturerByNameAsync(string name) => await _lecturerRepository.GetByNameAsync(name);
        public async Task<Lecturer> AddLecturerAsync(LecturerDTO lecturer)
        {
            var lecturerMap=_mapper.Map<Lecturer>(lecturer);
            return await _lecturerRepository.AddAsync(lecturerMap);
        }
        public async Task<Lecturer> UpdateLecturerAsync(int id,LecturerDTO lecturer)
        {
            var lecturerMap = _mapper.Map<Lecturer>(lecturer);
           return await _lecturerRepository.UpdateAsync(id,lecturerMap);
        }
        public async Task DeleteLecturerAsync(int id) =>await _lecturerRepository.DeleteAsync(id);
    }
}
