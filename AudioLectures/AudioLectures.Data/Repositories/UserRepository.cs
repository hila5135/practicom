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
    public class UserRepository :IUserRepository    
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync(string? name, string? email, string? role)
        {
            Console.WriteLine(">>> FILTERED REPOSITORY HIT");
            Console.WriteLine($"RAW name = '{name}'");
            Console.WriteLine($"length = {name?.Length}");
            var query = _context.Users.Include(u => u.UserLessons).AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                name = name.Trim();
                query = query.Where(u => u.UserName.Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(email))
            {
                email = email.Trim();
                query = query.Where(u => u.UserEmail.Contains(email));
            }

            if (!string.IsNullOrWhiteSpace(role))
            {
                role = role.Trim();
                query = query.Where(u => u.UserRole.Contains(role));
            }
            Console.WriteLine($"name={name}, email={email}, role={role}");
            Console.WriteLine(">>> QUERY BEFORE EXECUTION");
            Console.WriteLine(query.ToQueryString());
            return await query.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateAsync(int id, User user)
        {
            User u = await _context.Users.SingleOrDefaultAsync(u => u.UserId == id);
            if (u == null) return null;
            else
            {

                u.UserName = user.UserName;
                u.UserPassword = user.UserPassword;
                u.UserEmail = user.UserEmail;
                u.UserRole = user.UserRole;
                u.UserLessons = user.UserLessons;

            }
            await _context.SaveChangesAsync();
            return u;
        }
          public async Task DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    public async Task<User?> GetUserByCredentialsAsync(string userName, string userPassword)
    {
      // חיפוש משתמש לפי שם וסיסמה
      return await _context.Users.FirstOrDefaultAsync(user => user.UserName == userName && user.UserPassword == userPassword);
    }

  }
}
