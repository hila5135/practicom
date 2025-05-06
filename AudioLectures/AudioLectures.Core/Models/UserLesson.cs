using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Models
{
    public class UserLesson
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
