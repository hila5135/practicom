namespace AudioLectures.Api.Dtos
{
    public class LessonDTO
    {
        public TimeSpan LessonDuration { get; set; }
        public string LessonTitle { get; set; }
        public DateTime LessonRealeaseDate { get; set; }
        public string LessonUrl { get; set; }
        public int LessonLecturerId { get; set; }

    }
}
