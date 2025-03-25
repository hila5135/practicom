import { Lesson } from "../api/client";
import LessonItem from "./lessonItem";
import { useState } from "react";
type LessonsListProps = {
    lessons: Lesson[];
    isLoading: boolean;
};
function LessonsList({ lessons, isLoading }: LessonsListProps) {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const handleLessonClick = (lesson: Lesson) => {
        setSelectedLesson(selectedLesson === lesson ? null : lesson);  // Toggle visibility
    };
    const handleDownload = (url: string) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = url.split("/").pop() || "default.mp4"; // מקבל את שם הקובץ מה-URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <div style={{ padding: "20px", backgroundColor: "#f4f6f8", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>All Lessons</h1>
            {isLoading ? (
                <p style={{ fontSize: "18px", color: "#777" }}>Loading...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
                            <li
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    marginBottom: "15px",
                                    padding: "10px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <span style={{ fontWeight: "500", color: "#333", flex: "1" }}>
                                    <b>{lesson.lessonTitle || "No title available"}</b>
                                </span>
                                <span style={{ fontStyle: "italic", color: "#555" }}>
                                    {lesson.lessonName || "No description available"}
                                </span>
                                {/* {lesson.lessonUrl && (
                                    <a href={lesson.lessonUrl} download>
                                        <button
                                            style={{
                                                padding: "8px 16px",
                                                backgroundColor: "#28a745",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            listen
                                        </button>
                                    </a>
                                )} */}
                                <button
                                    onClick={() => handleLessonClick(lesson)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#007BFF",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    listen
                                </button>
                                <button
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "crimson",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => lesson.lessonUrl && handleDownload(lesson.lessonUrl)}
                                >
                                    download now
                                </button>
                            </li>
                        ))
                    ) : (
                        <p style={{ fontSize: "18px", color: "#777" }}>No lessons found</p>
                    )}
                </ul>
            )} 
            {selectedLesson && <LessonItem lesson={selectedLesson} />}
        </div>
    );
}export default LessonsList;
// import { Lesson } from "../api/client";
// import LessonItem from "./lessonItem";
// import { useState } from "react";

// type LessonsListProps = {
//     lessons: Lesson[];
//     isLoading: boolean;
// };

// function LessonsList({ lessons, isLoading }: LessonsListProps) {
//     const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

//     const handleLessonClick = (lesson: Lesson) => {
//         setSelectedLesson(selectedLesson === lesson ? null : lesson);  // Toggle visibility
//     };

//     const handleDownload = (url: string) => {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = url.split("/").pop() || "default.mp4"; // מקבל את שם הקובץ מה-URL
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     };

//     return (
//         <div style={{ padding: "20px", backgroundColor: "#f4f6f8", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//             <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>All Lessons</h1>
//             {isLoading ? (
//                 <p style={{ fontSize: "18px", color: "#777" }}>Loading...</p>
//             ) : (
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                     {lessons.length > 0 ? (
//                         lessons.map((lesson, index) => (
//                             <li
//                                 key={index}
//                                 style={{
//                                     display: "flex",
//                                     gap: "20px",
//                                     marginBottom: "15px",
//                                     padding: "10px",
//                                     backgroundColor: "#fff",
//                                     borderRadius: "8px",
//                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                                 }}
//                             >
//                                 <span style={{ fontWeight: "500", color: "#333", flex: "1" }}>
//                                     <b>{lesson.lessonTitle || "No title available"}</b>
//                                 </span>
//                                 <span style={{ fontStyle: "italic", color: "#555" }}>
//                                     {lesson.lessonName || "No description available"}
//                                 </span>

//                                 {/* כפתור ההורדה */}
//                                 <button
//                                     style={{
//                                         padding: "8px 16px",
//                                         backgroundColor: "crimson",
//                                         color: "#fff",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                     }}
//                                     onClick={() => lesson.lessonUrl && handleDownload(lesson.lessonUrl)} // קריאה לפונקציה handleDownload
//                                 >
//                                     download now
//                                 </button>
//                             </li>
//                         ))
//                     ) : (
//                         <p style={{ fontSize: "18px", color: "#777" }}>No lessons found</p>
//                     )}
//                 </ul>
//             )}

//             {/* הצגת השיעור שנבחר */}
//             {selectedLesson && <LessonItem lesson={selectedLesson} />}
//         </div>
//     );
// }

// export default LessonsList;

// import { Lesson } from "../api/client";
// import LessonItem from "./lessonItem";
// import { useState } from "react";

// type LessonsListProps = {
//     lessons: Lesson[];
//     isLoading: boolean;
// };

// function LessonsList({ lessons, isLoading }: LessonsListProps) {
//     const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

//     const handleLessonClick = (lesson: Lesson) => {
//         setSelectedLesson(selectedLesson === lesson ? null : lesson);  // Toggle visibility
//     };

//     const handleDownload = (url: string) => {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = url.split("/").pop() || "default.mp3"; // מקבל את שם הקובץ מה-URL
//         a.target = "_blank"; // הפתח ב-Tab חדש אם נדרש
//         a.click();
//     };

//     return (
//         <div style={{ padding: "20px", backgroundColor: "#f4f6f8", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//             <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>All Lessons</h1>
//             {isLoading ? (
//                 <p style={{ fontSize: "18px", color: "#777" }}>Loading...</p>
//             ) : (
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                     {lessons.length > 0 ? (
//                         lessons.map((lesson, index) => (
//                             <li
//                                 key={index}
//                                 style={{
//                                     display: "flex",
//                                     gap: "20px",
//                                     marginBottom: "15px",
//                                     padding: "10px",
//                                     backgroundColor: "#fff",
//                                     borderRadius: "8px",
//                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                                 }}
//                             >
//                                 <span style={{ fontWeight: "500", color: "#333", flex: "1" }}>
//                                     <b>{lesson.lessonTitle || "No title available"}</b>
//                                 </span>
//                                 <span style={{ fontStyle: "italic", color: "#555" }}>
//                                     {lesson.lessonName || "No description available"}
//                                 </span>

//                                 {/* כפתור ההורדה */}
//                                 <button
//                                     style={{
//                                         padding: "8px 16px",
//                                         backgroundColor: "crimson",
//                                         color: "#fff",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                     }}
//                                     onClick={() => lesson.lessonUrl && handleDownload(lesson.lessonUrl)} // קריאה לפונקציה handleDownload
//                                 >
//                                     download now
//                                 </button>
//                             </li>
//                         ))
//                     ) : (
//                         <p style={{ fontSize: "18px", color: "#777" }}>No lessons found</p>
//                     )}
//                 </ul>
//             )}

//             {/* הצגת השיעור שנבחר */}
//             {selectedLesson && <LessonItem lesson={selectedLesson} />}
//         </div>
//     );
// }

// export default LessonsList;
