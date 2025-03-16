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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public Task<IEnumerable<User>> GetAllUsersAsync() => _userRepository.GetAllAsync();
        public Task<User> GetUserByIdAsync(int id) => _userRepository.GetByIdAsync(id);
        public Task AddUserAsync(User user) => _userRepository.AddAsync(user);
        public Task UpdateUserAsync(User user) => _userRepository.UpdateAsync(user);
        public Task DeleteUserAsync(int id) => _userRepository.DeleteAsync(id);
        public User Authenticate(string userName, string userPassword)
        {
            // אם שם המשתמש והסיסמה הם hila5135 → המשתמש מנהל
            if (userName == "hila5135" && userPassword == "5135")
            {
                return new User
                {
                    UserName = userName,
                    UserPassword = userPassword,
                    UserRole = "manager"
                };
            }

            // בדיקה אם המשתמש קיים במאגר הנתונים
            var user = _userRepository.GetUserByCredentials(userName, userPassword);
            if (user != null)
            {
                user.UserRole = "user"; // משתמש רגיל
                return user;
            }

            // אם המשתמש לא נמצא במערכת → הוא "צופה"
            return new User
            {
                UserName = userName,
                UserPassword = userPassword,
                UserRole = "viewer" // תפקיד "צופה"
            };
        }

    }
}
