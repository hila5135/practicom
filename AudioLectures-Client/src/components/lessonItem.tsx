
import { Lesson } from "../api/client";
import { ApiClient } from "../api/client";

type LessonProps = {
    lesson: Lesson;
};
const apiClient = new ApiClient("https://audiolecturesserver.onrender.com");
const LessonItem = ({ lesson }: LessonProps) => {
    console.log("lesson url", lesson.lessonUrl);
    
    return (
        <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h3>{lesson.lessonName}, {lesson.lessonTitle}</h3>
            
            {lesson.lessonUrl?.endsWith('.mp3') && (
                <div>
                    <audio controls>
                        <source src={lesson.lessonUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            {lesson.lessonName && (
                <button onClick={() => apiClient.download(lesson.lessonName!)}>
                    Download
                </button>
            )}
        </div>
    );
}

export default LessonItem;
