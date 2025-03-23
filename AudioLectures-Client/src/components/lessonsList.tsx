// import { Lesson } from "../api/client";

// type LessonsListProps = {
//     lessons: Lesson[];
//     isLoading: boolean;
// };

// function LessonsList({ lessons, isLoading }: LessonsListProps) {
//     return (
//         <div>
//             <h1>All Lessons</h1>
//             {isLoading ? <p>Loading...</p> : (
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                     {lessons.length > 0 ? (
//                         lessons.map((lesson, index) => (
//                             <li key={index} style={{ display: "flex", gap: "20px", marginBottom: "5px" }}>
//                                 <span><b>{lesson.lessonTitle || "No title available"}</b></span>
//                                 <span>{lesson.lessonName || "No description available"}</span>
//                                 {lesson.lessonUrl && <a href={lesson.lessonUrl} target="_blank" rel="noopener noreferrer">Listen and Download</a>}
//                                 {/* {lesson.lessonUrl && <a href={lesson.lessonUrl} download>Downloading</a>} */}
//                             </li>
//                         ))
//                     ) : (
//                         <p>No lessons found</p>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default LessonsList;

import { Lesson } from "../api/client";

type LessonsListProps = {
    lessons: Lesson[];
    isLoading: boolean;
};

function LessonsList({ lessons, isLoading }: LessonsListProps) {
    return (
        <div style={{ padding: "20px", backgroundColor: "#f4f6f8", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>All Lessons</h1>
            {isLoading ? (
                <p style={{ fontSize: "18px", color: "#777" }}>Loading...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
                            <li key={index} style={{ display: "flex", gap: "20px", marginBottom: "15px", padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                                <span style={{ fontWeight: "500", color: "#333", flex: "1" }}>
                                    <b>{lesson.lessonTitle || "No title available"}</b>
                                </span>
                                <span style={{ fontStyle: "italic", color: "#555" }}>{lesson.lessonName || "No description available"}</span>
                                {lesson.lessonUrl && <a href={lesson.lessonUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#007BFF", textDecoration: "none" }}>Listen and Download</a>}
                            </li>
                        ))
                    ) : (
                        <p style={{ fontSize: "18px", color: "#777" }}>No lessons found</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default LessonsList;