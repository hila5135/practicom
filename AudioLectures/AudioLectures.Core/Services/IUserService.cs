using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Services
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAllUsersAsync();
      public  Task<User> GetUserByIdAsync(int id);
      public  Task<User> AddUserAsync(UserDTO user);
      public  Task<User> UpdateUserAsync(int id,UserDTO user);
       public Task DeleteUserAsync(int id);
        public Task<User> Authenticate(string userName, string userPassword);
    }
}
