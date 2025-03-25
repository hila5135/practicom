// import { Lesson } from "../api/client";


// type LessonProps = {
//     lesson: Lesson;
// };
// const lessonItem=({ lesson }: LessonProps)=>{
//     return (
        
//             <>
//                    <h3>{lesson.lessonName}, {lesson.lessonTitle}</h3>
                
//                 {/* אם יש URL לשמע */}
//                 {lesson.lessonUrl?.endsWith('.mp3') && (
//                     <div>
//                     <audio controls>
//                         <source src={lesson.lessonUrl} type="audio/mpeg" />
//                         Your browser does not support the audio element.
//                     </audio>
//                     <a href={lesson.lessonUrl} download>
//                             <button>הורד את השיעור</button>
//                         </a>
//                     </div>
//                 )}

//                 {/* אם יש URL לוידאו */}
//                 {lesson.lessonUrl?.endsWith('.mp4') && (
//                     <div>
//                     <video width="320" height="240" controls>
//                         <source src={lesson.lessonUrl} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                     <a href={lesson.lessonUrl} download>
//                             <button>הורד את הוידאו</button>
//                         </a>
//                     </div>
//                 )}
//             </>
//         );
//     }
// export default lessonItem;
import { Lesson } from "../api/client";

type LessonProps = {
    lesson: Lesson;
};

const LessonItem = ({ lesson }: LessonProps) => {
    return (
        <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h3>{lesson.lessonName}, {lesson.lessonTitle}</h3>
            
            {/* אם יש URL לשמע */}
            {lesson.lessonUrl?.endsWith('.mp3') && (
                <div>
                    <audio controls>
                        <source src={lesson.lessonUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            {/* אם יש URL לוידאו */}
            {lesson.lessonUrl?.endsWith('.mp4') && (
                <div>
                    <video width="320" height="240" controls>
                        <source src={lesson.lessonUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}

export default LessonItem;
