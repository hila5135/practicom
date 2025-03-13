using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Models
{
    public class Lecturer
    {
        public int LecturerId { get; set; }
        public string LecturerName { get; set; }
        public List<Lesson> LecturerLessons { get; set; }
    }
}
