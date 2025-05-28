using AudioLectures.Api.Dtos;
using AudioLectures.Core.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core
{
   public class MappingProfile : Profile
    {

        public MappingProfile() {
           CreateMap<User,UserDTO>().ReverseMap();
           CreateMap<Lesson,LessonDTO>().ReverseMap();
           CreateMap<Lecturer,LecturerDTO>().ReverseMap();
        }
    }
}
