import { useEffect, useState } from "react";
import { ApiClient, Lesson } from "../api/client";
import { Container, Grid, Button, CircularProgress, Box, Typography } from "@mui/material";
import LessonList from "./lessonsList";
import LessonSearch from "./lessonsSearch";
import LessonsTitle from "./lessonsTitles";

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
                const response = await apiClient.files();
                  const allLessonsData :Lesson []=[];
                  for (const file of response) {
                    const data = await apiClient.name2(file);
                    console.log("the res from one", data);
                    allLessonsData.push(...data);
             
                          }
               setAllLessons(allLessonsData); 
             }
               catch (error) {
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
            } else {
                let result = await apiClient.title();
                setTitles(result);
                setShowTitles(true);
            }
        } catch (error) {
            console.error("Error fetching titles:", error);
        }
        setIsLoadingTitles(false);
    };
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            
            if (searchQuery.trim() === "") {
                // אם אין טקסט בחיפוש, טוענים את כל השיעורים
                const response = await apiClient.files();
                const allLessonsData: Lesson[] = [];
                for (const file of response) {
                    const data = await apiClient.name2(file);
                    console.log("the res from one", data);
                    allLessonsData.push(...data);
                }
                setAllLessons(allLessonsData); 
            }
            else{
            let result = searchType === "lecturer"
                ? await apiClient.name(searchQuery)
                : await apiClient.title2(searchQuery);
                setAllLessons(result);
            }
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
        setIsLoading(false);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4, backgroundColor: "#212121", padding: 3, borderRadius: 2 }}>
            <Grid container spacing={3} sx={{ backgroundColor: "#333", padding: 3, borderRadius: 2 }}>
                {/* צד שמאל – רשימת השיעורים (60%) */}
                <Grid item xs={12} sm={7} sx={{ overflowY: "auto", maxHeight: "80vh" }}>
                    <LessonList lessons={allLessons} isLoading={isLoading} />
                </Grid>

                {/* צד ימין – חיפוש */}
                <Grid item xs={12} sm={3}>
                    <LessonSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        handleSearch={handleSearch}
                    />
                </Grid>

                {/* צד ימין – כפתור הצגת כותרות */}
                <Grid item xs={12} sm={2}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            sx={{
                                marginBottom: 2, 
                                backgroundColor: "#b2995d", 
                                '&:hover': { backgroundColor: "#9c7d49" },
                                fontWeight: "bold", 
                                fontSize: "16px", 
                                padding: "12px 20px"
                            }} 
                            onClick={allTitles}
                        >
                            {showTitles ? "Hide all subjects" : "View all subjects"}
                        </Button>
                        {isLoadingTitles && <CircularProgress size={24} sx={{ color: "#b2995d" }} />}
                        {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ActionsForUsers;
