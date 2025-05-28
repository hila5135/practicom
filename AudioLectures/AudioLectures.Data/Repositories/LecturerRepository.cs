using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class LecturerRepository : ILecturerRepository
    {
        private readonly DataContext _context;
        public LecturerRepository(DataContext context) { _context = context; }

        public async Task<IEnumerable<Lecturer>> GetAllAsync() => await _context.Lecturers.Include(s => s.LecturerLessons).ToListAsync();

        //public async Task<Lecturer> GetByIdAsync(int id) => await _context.Lecturers.FindAsync(id);

        public async Task<Lecturer> GetByIdAsync(int id)
        {
            return await _context.Lecturers
                .Include(l => l.LecturerLessons)
                .FirstOrDefaultAsync(l => l.LecturerId == id);
        }

        public async Task<List<Lecturer>> GetByNameAsync(string name) => await _context.Lecturers.Where(s => s.LecturerName == name).Include(s => s.LecturerLessons).ToListAsync();
        public async Task<Lecturer> AddAsync(Lecturer entity)
        {
            await _context.Lecturers.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Lecturer> UpdateAsync(int id, Lecturer entity)
        {
            Lecturer l = await _context.Lecturers.SingleOrDefaultAsync(act => act.LecturerId == id);
            if (l == null) return null;
            else
            {
                l.LecturerName = entity.LecturerName;
                l.LecturerLessons = entity.LecturerLessons;
            }
            await _context.SaveChangesAsync();
            return l;
        }


        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Lecturers.FindAsync(id);
            if (entity != null)
            {
                _context.Lecturers.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

    }
}
