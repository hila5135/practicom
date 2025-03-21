import LessonList from "./lessonsList";
import LessonSearch from "./lessonsSearch";
import LessonsTitle from "./lessonsTitles";

import { useEffect, useState } from "react";
import { ApiClient, Lesson } from "../api/client";
const apiClient = new ApiClient("https://localhost:7129");

function ActionsForUsers() {
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("lecturer");
    const [titles, setTitles] = useState<string[]>([]);
    const [isLoadingTitles, setIsLoadingTitles] = useState(false);
    const [showTitles, setShowTitles] = useState(false);

    useEffect(() => {
        const fetchAllLessons = async () => {
            setIsLoading(true);
            try {
                const result = await apiClient.lessonAll();
                setAllLessons(result);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
            setIsLoading(false);
        };
        fetchAllLessons();
    }, []);

    const allTitles = async () => {
        setIsLoadingTitles(true);
        try {
            if (showTitles) {
                setShowTitles(false);
                return;
            }
            
            let result = await apiClient.title();
            setTitles(result);
            setShowTitles(true);
        } catch (error) {
            console.error("Error fetching titles:", error);
        }
        setIsLoadingTitles(false);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let result = searchType === "lecturer"
                ? await apiClient.name(searchQuery)
                : await apiClient.title2(searchQuery);

            const lessons = searchType === "lecturer"
                ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
                : result;

            setAllLessons(lessons);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
        setIsLoading(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            {/* צד שמאל – רשימת השיעורים (60%) */}
            <div style={{ width: "60%" }}>
                <LessonList lessons={allLessons} isLoading={isLoading} />
            </div>

            <div style={{ width: "20%" }}>
                <LessonSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    handleSearch={handleSearch}
                />
            </div>

            <div style={{ width: "15%" }}>
                <button onClick={allTitles} style={{ marginBottom: "10px" }}>
                {showTitles ? "Hide all subjects" : "View all subjects"}                </button>
                {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
            </div>
        </div>
    );
}

export default ActionsForUsers;
