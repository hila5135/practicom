using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data.Repositories
{
    public class UserRepository :IUserRepository///actions on users
    {
        public Task<IEnumerable<User>> GetAllAsync() => Task.FromResult(new List<User>() as IEnumerable<User>);
        public Task<User> GetByIdAsync(int id) => Task.FromResult(new User());
        public Task AddAsync(User user) => Task.CompletedTask;
        public Task UpdateAsync(User user) => Task.CompletedTask;
        public Task DeleteAsync(int id) => Task.CompletedTask;
    }
}
