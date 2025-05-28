    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace AudioLectures.Core.Models
    {
       public class Lesson 
        {
            public int LessonId { get; set; }
            public string LessonName { get; set; }
            public string LessonTitle { get; set; }
            public TimeSpan LessonDuration { get; set; }
            public DateTime LessonReleaseDate { get; set; }
            public int LessonListenersCount { get; set; }
            public int LessonDownloadCount { get; set; }
            public string LessonUrl { get; set; }

            public int LessonLecturerId { get; set; }
            public Lecturer LessonLecturer { get; set; }
            public List<User> LessonUsers { get; set; }

        }
    }
