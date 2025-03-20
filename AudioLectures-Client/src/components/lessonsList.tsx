import { Lesson } from "../api/client";

type LessonsListProps = {
    lessons: Lesson[];
    isLoading: boolean;
};

function LessonsList({ lessons, isLoading }: LessonsListProps) {
    return (
        <div>
            <h1>All Lessons</h1>
            {isLoading ? <p>Loading...</p> : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
                            <li key={index} style={{ display: "flex", gap: "20px", marginBottom: "5px" }}>
                                <span><b>{lesson.lessonTitle || "No title available"}</b></span>
                                <span>{lesson.lessonName || "No description available"}</span>
                                {lesson.lessonUrl && <a href={lesson.lessonUrl} target="_blank" rel="noopener noreferrer">Listen and Download</a>}
                                {/* {lesson.lessonUrl && <a href={lesson.lessonUrl} download>Downloading</a>} */}
                            </li>
                        ))
                    ) : (
                        <p>No lessons found</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default LessonsList;