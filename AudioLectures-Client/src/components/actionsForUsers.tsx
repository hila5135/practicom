import { useEffect, useState } from "react";
import { ApiClient, Lesson } from "../api/client";
import { Container, Grid, Button, CircularProgress, Box, Typography} from "@mui/material";
import LessonList from "./lessonsList";
import LessonSearch from "./lessonsSearch";
import LessonsTitle from "./lessonsTitles";
import { useNavigate } from "react-router-dom";

const apiClient = new ApiClient("https://audiolecturesserver.onrender.com");

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
                const allLessonsData: Lesson[] = await apiClient.lessonAll();
                setAllLessons(allLessonsData);
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
    const navigate = useNavigate();
    console.log(navigate);
    
    const handleSearch = async () => {

        setIsLoading(true);
        try {
            if (searchQuery.trim() === "") {
                const allLessonsData: Lesson[] = await apiClient.lessonAll();
                setAllLessons(allLessonsData);
                setAllLessons(allLessonsData);
            } else {
                if (searchType === "lecturer") {
                    const lecturers = await apiClient.name(searchQuery);
                    // חילוץ כל השיעורים מכל המרצים
                    const allLessonsData: Lesson[] = lecturers
                        .flatMap(l => l.lecturerLessons ?? [])
                        .filter((lesson): lesson is Lesson => lesson !== undefined);
                    setAllLessons(allLessonsData);
                } else {
                    const result = await apiClient.title2(searchQuery);
                    setAllLessons(result);
                }
            }
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
        setIsLoading(false);
    };

    
   
return (
    // <Container
    //   maxWidth="xl"
    //   sx={{
    //     mt: 5,
    //     p: 4,
    //     backgroundColor: "#f9f9f9",
    //     borderRadius: 2,
    //   }}
    // >
    <Container
  maxWidth={false}
  disableGutters
  sx={{
    mt: 5,
    px: 4,
    backgroundColor: "#f9f9f9",
    borderRadius: 0,
  }}
>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 , marginTop: 10, color: "#1976d2"}}
      >
        מערכת שיעורים
      </Typography>
  
      <Grid container spacing={3}>
     

        {/* צד שמאל: בוט ושאלות */}
        <Grid item xs={12} md={4}>
         
         
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 2,
              p: 3,
              boxShadow: 2,
            }}
          >
            
   {/* <Button
        variant="contained"
        color="primary"
        startIcon={<HelpOutlineIcon/>}
        sx={{ mt: 2, mb: 4 }}
        fullWidth
        onClick={() => navigate("/chat")}
      >
        יש לך שאלה על השיעור? שאל את הבוט
      </Button>
            <Divider sx={{ my: 2 }} />
   */}
            {/* <Button
              variant="outlined"
              onClick={allTitles}
              fullWidth
              sx={{ textTransform: "none" }}
            >
              {showTitles ? "הסתר נושאים" : "הצג את כל הנושאים"}
            </Button>
   */}
            {/* {isLoadingTitles && (
              <Box mt={2} textAlign="center">
                <CircularProgress size={24} />
              </Box>
            )} */}
  
  <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "#1976d2",
                }}
              >
                חפש שעורים לפי בחירתך
              </Typography>
    
              <LessonSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchType={searchType}
                setSearchType={setSearchType}
                handleSearch={handleSearch}
              />
  
  <Button
                variant="outlined"
                onClick={allTitles}
                fullWidth
                sx={{ textTransform: "none" }}
              >
                {showTitles ? "הסתר נושאים" : "הצג את כל הנושאים"}
              </Button>
    
              {isLoadingTitles && (
                <Box mt={2} textAlign="center">
                  <CircularProgress size={24} />
                </Box>
              )}
    
              {showTitles && (
                <Box mt={2}>
                  <LessonsTitle titles={titles} isLoading={isLoadingTitles} />
                </Box>
              )}
            
          </Box>
        </Grid>
  
        {/* צד ימין: שיעורים */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 2,
              p: 3,
              boxShadow: 2,
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <LessonList lessons={allLessons} isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>

      
      
    </Container>
  );
  
}

export default ActionsForUsers;
