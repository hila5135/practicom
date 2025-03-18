namespace AudioLectures.Api.Dtos
{
    public class LessonDTO
    {
        public string LessonTitle { get; set; }
        public string Genre { get; set; }
        public DateTime LessonRealeaseDate { get; set; }
        public string LessonUrl { get; set; }


        public int SingerId { get; set; }

    }
}
