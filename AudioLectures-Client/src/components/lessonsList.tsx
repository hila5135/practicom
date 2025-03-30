import { ApiClient, Lesson } from "../api/client";
import LessonItem from "./lessonItem";
import { useState } from "react";
type LessonsListProps = {
    lessons: Lesson[];
    isLoading: boolean;
};

const apiClient = new ApiClient("https://localhost:7129");


const LessonsList = ({ lessons, isLoading }: LessonsListProps) => {
    const [currentAudio, setCurrentAudio] = useState<string | null>(null) // הוספת state לאודיו
    const handleDownload = async (fileName: string) => {
        try {
            //  await apiClient.download(fileName); // קריאה לפונקציה להורדת הקובץ
            const response = await apiClient.download(fileName); // קריאה לפונקציה להורדת הקובץ
        
        // אם התגובה לא תקינה (כלומר, סטטוס שגיאה), אז נעצור כאן
        if (!response.ok) {
            throw new Error('Failed to download file');
        }

        // אם יש תגובה חיובית, אנו יוצרים אובייקט Blob
        const blob = await response.blob();

        // קבלת שם הקובץ מתוך Content-Disposition
        const contentDisposition = response.headers.get("Content-Disposition");
        let fileNameFromHeader = fileName; // ברירת מחדל היא שם הקובץ שנשלח לפונקציה
        if (contentDisposition) {
            // חפש את שם הקובץ מתוך Content-Disposition
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match) {
                fileNameFromHeader = match[1];
            }
        }

        // יצירת קישור להורדה
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileNameFromHeader;  // שם הקובץ שהתקבל מהכותרת או מהפרמטר
        document.body.appendChild(link); // נוודא שהקישור נמצא בדף לפני שליחתו
        link.click();  // לחץ להוריד את הקובץ
        document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
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
                                <span style={{ fontStyle: "italic", color: "#555" }}>
                                    {lesson.lessonLecturer?.lecturerName || "No description available"}
                                </span>
                                <button
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "crimson",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        if (lesson.lessonUrl) {
                                            window.open(lesson.lessonUrl, "_blank");  // פותח את ה-URL בעמוד חדש
                                        }
                                    }}
                                >
                                    Listen
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
                               
                                    
                                    onClick={() => handleDownload(lesson.lessonName!)}>
                                    Download
                                </button>
                            </li>
                        ))
                    ) : (
                        <p style={{ fontSize: "18px", color: "#777" }}>No lessons found</p>
                    )}
                </ul>
            )}

            {currentAudio && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <audio controls autoPlay>
                        <source src={currentAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default LessonsList;
