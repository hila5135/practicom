using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AudioLectures.Core.Repositories;
using AudioLectures.Core.Services;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Service
{
  public class UserService : IUserService
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
      _userRepository = userRepository;
      _mapper = mapper;
    }
    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _userRepository.GetAllAsync();
    public async Task<User> GetUserByIdAsync(int id) => await _userRepository.GetByIdAsync(id);
    public async Task<User> AddUserAsync(UserDTO user)
    {
      var userMap = _mapper.Map<User>(user);
      return await _userRepository.AddAsync(userMap);
    }
    public async Task<User> UpdateUserAsync(int id, UserDTO user)
    {
      var userMap = _mapper.Map<User>(user);
      return await _userRepository.UpdateAsync(id, userMap);
    }
    public async Task DeleteUserAsync(int id) => await _userRepository.DeleteAsync(id);
    public async Task<User> Authenticate(string userName, string userPassword)
    {
      // אם שם המשתמש והסיסמה הם hila5135 → המשתמש מנהל
      if (userName == "hila5135" && userPassword == "5135")
      {
        return new User
        {
          UserName = userName,
          UserPassword = userPassword,
          UserEmail = null,
          UserRole = "manager"
        };
      }

      // בדיקה אם המשתמש קיים במאגר הנתונים
      var user = await _userRepository.GetUserByCredentialsAsync(userName, userPassword);
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
