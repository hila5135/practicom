namespace AudioLectures.Api.Dtos
{
    public class LessonDTO
    {
        public string LessonName { get; set; }
        public string LessonTitle { get; set; }
        public TimeSpan LessonDuration { get; set; }
        public DateTime LessonRealeaseDate { get; set; }
        public string LessonUrl { get; set; }
        public int LessonLecturerId { get; set; }

    }
}
