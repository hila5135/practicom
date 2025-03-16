using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class LecturerRepository :ILecturerRepository
    {
        private readonly DataContext _context;

        public LecturerRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lecturer>> GetAllAsync()
        {
            return await _context.Lecturers.ToListAsync();
        }

        public async Task<Lecturer?> GetByIdAsync(int id)
        {
            return await _context.Lecturers.FindAsync(id);
        }

        public async Task AddAsync(Lecturer lecturer)
        {
            _context.Lecturers.Add(lecturer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Lecturer lecturer)
        {
            _context.Lecturers.Update(lecturer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var lecturer = await GetByIdAsync(id);
            if (lecturer != null)
            {
                _context.Lecturers.Remove(lecturer);
                await _context.SaveChangesAsync();
            }
        }
    }
}
