import { useEffect, useState } from "react";
import { ApiClient, Lesson } from "../api/client";
const apiClient = new ApiClient("https://localhost:7129");
function ActionsForUsers() {
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);//for all lecturers
    const [isLoading, setIsLoading] = useState(false);//for loading
    const [isFetched, setIsFetched] = useState(false);//for button
    const [searchQuery, setSearchQuery] = useState(""); // חיפוש לפי שם מרצה או נושא
    const [searchType, setSearchType] = useState("lecturer");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let result;
            if (searchType === "lecturer") {
                result = await apiClient.name(searchQuery); // שים לב שהפונקציה הזאת צריכה להיות ב-API
                console.log("the lessons for lecturer:", result);
            } else {
                result = await apiClient.title(searchQuery); // שים לב שהפונקציה הזאת צריכה להיות ב-API
                console.log("the lessons for lesson title:", result);
            }
            const lessons = searchType === "lecturer" ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || []): result   ;
            setAllLessons(lessons)
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        const fetchAllLessons = async () => {
            setIsLoading(true);
            try {
                const result = await apiClient.lessonAll();
                console.log(result);
                setAllLessons(result);
                setIsFetched(true);

            } catch (error) {
                console.error('error-failed to fetch', error);
            }
            setIsLoading(false);
            setIsFetched(false);
        }
        fetchAllLessons()
    }, []);
    return (
        <>
           <div>
    <div>
        <button onClick={() => setSearchType('lecturer')}>Search by Lecturer</button>
        <button onClick={() => setSearchType('topic')}>Search by Topic</button>
    </div>
</div>
<div>
    <input
        type="text"
        placeholder={searchType === 'lecturer' ? "Enter a lecturer name" : "Enter a lesson topic"}
        value={searchQuery}
        onChange={handleSearchChange}
    />
    <button onClick={handleSearch}>Search</button>
</div>
<div>
    <h1>All Lessons</h1>
    {isLoading ? (
        <p>Loading...</p>
    ) : (
        <ul>
            {allLessons.length > 0 ? (
                allLessons.map((lesson, index) => (
                    <li key={index}>
                        {/* הצגת שם השיעור */}
                        {lesson.lessonTitle ? lesson.lessonTitle : "No title available"}
                    </li>
                ))
            ) : (
                <p>No lessons found</p>
            )}
        </ul>
    )}
</div>
            {/* <div>
                <div>
                    <button onClick={() => setSearchType('lecturer')}>search by Lecturer</button>
                    <button onClick={() => setSearchType('topic')}>search by Topic</button>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder={searchType === 'lecturer' ? "Enter a lecturer name" : "Enter a lesson topic"}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h1>All Lessons</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {allLessons.map((lesson, index) => (
                            <li key={index}>{lesson.lessonTitle?.toString()}</li>
                        ))}
                    </ul>
                )}
            </div> */}
        </>);
}
export default ActionsForUsers;