import { Lesson } from "../api/client";

const lessonItem=()=>{

    type LessonProps = {
        lesson: Lesson;
    };
    function LessonPlayer({ lesson }: LessonProps) {
        return (
            <div>
                <h3>{lesson.lessonName} , {lesson.lessonTitle} </h3>
                <audio controls>
                    <source src={lesson.lessonUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    }
}