// // // // // import LessonList from "./lessonsList";
// // // // // import LessonSearch from "./lessonsSearch";
// // // // // import LessonsTitle from "./lessonsTitles";

// // // // // import { useEffect, useState } from "react";
// // // // // import { ApiClient, Lesson } from "../api/client";
// // // // // const apiClient = new ApiClient("https://localhost:7129");

// // // // // function ActionsForUsers() {
// // // // //     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// // // // //     const [isLoading, setIsLoading] = useState(false);
// // // // //     const [searchQuery, setSearchQuery] = useState("");
// // // // //     const [searchType, setSearchType] = useState("lecturer");
// // // // //     const [titles, setTitles] = useState<string[]>([]);
// // // // //     const [isLoadingTitles, setIsLoadingTitles] = useState(false);
// // // // //     const [showTitles, setShowTitles] = useState(false);

// // // // //     useEffect(() => {
// // // // //         const fetchAllLessons = async () => {
// // // // //             setIsLoading(true);
// // // // //             try {
// // // // //                 const result = await apiClient.lessonAll();
// // // // //                 setAllLessons(result);
// // // // //             } catch (error) {
// // // // //                 console.error("Error fetching lessons:", error);
// // // // //             }
// // // // //             setIsLoading(false);
// // // // //         };
// // // // //         fetchAllLessons();
// // // // //     }, []);

// // // // //     const allTitles = async () => {
// // // // //         setIsLoadingTitles(true);
// // // // //         try {
// // // // //             if (showTitles) {
// // // // //                 setShowTitles(false);
// // // // //                 return;
// // // // //             }
            
// // // // //             let result = await apiClient.title();
// // // // //             setTitles(result);
// // // // //             setShowTitles(true);
// // // // //         } catch (error) {
// // // // //             console.error("Error fetching titles:", error);
// // // // //         }
// // // // //         setIsLoadingTitles(false);
// // // // //     };

// // // // //     const handleSearch = async () => {
// // // // //         setIsLoading(true);
// // // // //         try {
// // // // //             let result = searchType === "lecturer"
// // // // //                 ? await apiClient.name(searchQuery)
// // // // //                 : await apiClient.title2(searchQuery);

// // // // //             const lessons = searchType === "lecturer"
// // // // //                 ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
// // // // //                 : result;

// // // // //             setAllLessons(lessons);
// // // // //         } catch (error) {
// // // // //             console.error("Error fetching lessons:", error);
// // // // //         }
// // // // //         setIsLoading(false);
// // // // //     };

// // // // //     return (
// // // // //         <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
// // // // //             {/* צד שמאל – רשימת השיעורים (60%) */}
// // // // //             <div style={{ width: "60%" }}>
// // // // //                 <LessonList lessons={allLessons} isLoading={isLoading} />
// // // // //             </div>

// // // // //             <div style={{ width: "20%" }}>
// // // // //                 <LessonSearch
// // // // //                     searchQuery={searchQuery}
// // // // //                     setSearchQuery={setSearchQuery}
// // // // //                     searchType={searchType}
// // // // //                     setSearchType={setSearchType}
// // // // //                     handleSearch={handleSearch}
// // // // //                 />
// // // // //             </div>

// // // // //             <div style={{ width: "15%" }}>
// // // // //                 <button onClick={allTitles} style={{ marginBottom: "10px" }}>
// // // // //                 {showTitles ? "Hide all subjects" : "View all subjects"}                </button>
// // // // //                 {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default ActionsForUsers;


// // // // import { useEffect, useState } from "react";
// // // // import { ApiClient, Lesson } from "../api/client";
// // // // import { Container, Grid, Button, CircularProgress, Typography, Box, Grid2 } from "@mui/material";
// // // // import LessonList from "./lessonsList";
// // // // import LessonSearch from "./lessonsSearch";
// // // // import LessonsTitle from "./lessonsTitles";

// // // // const apiClient = new ApiClient("https://localhost:7129");

// // // // function ActionsForUsers() {
// // // //     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// // // //     const [isLoading, setIsLoading] = useState(false);
// // // //     const [searchQuery, setSearchQuery] = useState("");
// // // //     const [searchType, setSearchType] = useState("lecturer");
// // // //     const [titles, setTitles] = useState<string[]>([]);
// // // //     const [isLoadingTitles, setIsLoadingTitles] = useState(false);
// // // //     const [showTitles, setShowTitles] = useState(false);

// // // //     useEffect(() => {
// // // //         const fetchAllLessons = async () => {
// // // //             setIsLoading(true);
// // // //             try {
// // // //                 const result = await apiClient.lessonAll();
// // // //                 setAllLessons(result);
// // // //             } catch (error) {
// // // //                 console.error("Error fetching lessons:", error);
// // // //             }
// // // //             setIsLoading(false);
// // // //         };
// // // //         fetchAllLessons();
// // // //     }, []);

// // // //     const allTitles = async () => {
// // // //         setIsLoadingTitles(true);
// // // //         try {
// // // //             if (showTitles) {
// // // //                 setShowTitles(false);
// // // //                 return;
// // // //             }
            
// // // //             let result = await apiClient.title();
// // // //             setTitles(result);
// // // //             setShowTitles(true);
// // // //         } catch (error) {
// // // //             console.error("Error fetching titles:", error);
// // // //         }
// // // //         setIsLoadingTitles(false);
// // // //     };

// // // //     const handleSearch = async () => {
// // // //         setIsLoading(true);
// // // //         try {
// // // //             let result = searchType === "lecturer"
// // // //                 ? await apiClient.name(searchQuery)
// // // //                 : await apiClient.title2(searchQuery);

// // // //             const lessons = searchType === "lecturer"
// // // //                 ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
// // // //                 : result;

// // // //             setAllLessons(lessons);
// // // //         } catch (error) {
// // // //             console.error("Error fetching lessons:", error);
// // // //         }
// // // //         setIsLoading(false);
// // // //     };

// // // //     return (
// // // //         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
// // // //             <Grid2 container spacing={2}>

// // // //                 {/* צד שמאל – רשימת השיעורים (60%) */}
// // // //                 <Grid2 item xs={12} sm={7} sx={{ mb: 3 }}>
// // // //                     <LessonList lessons={allLessons} isLoading={isLoading} />
// // // //                 </Grid2>

// // // //                 {/* צד ימין – חיפוש */}
// // // //                 <Grid2 item xs={12} sm={3}>
// // // //                     <LessonSearch
// // // //                         searchQuery={searchQuery}
// // // //                         setSearchQuery={setSearchQuery}
// // // //                         searchType={searchType}
// // // //                         setSearchType={setSearchType}
// // // //                         handleSearch={handleSearch}
// // // //                     />
// // // //                 </Grid2>

// // // //                 {/* צד ימין – כפתור הצגת כותרות */}
// // // //                 <Grid2 item xs={12} sm={2}>
// // // //                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// // // //                         <Button 
// // // //                             variant="contained" 
// // // //                             color="primary" 
// // // //                             sx={{ marginBottom: 2 }} 
// // // //                             onClick={allTitles}
// // // //                         >
// // // //                             {showTitles ? "Hide all subjects" : "View all subjects"}
// // // //                         </Button>
// // // //                         {isLoadingTitles && <CircularProgress size={24} />}
// // // //                         {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
// // // //                     </Box>
// // // //                 </Grid2>
// // // //             </Grid2>
// // // //         </Container>
// // // //     );
// // // // }

// // // // export default ActionsForUsers;

// // // import { useEffect, useState } from "react";
// // // import { ApiClient, Lesson } from "../api/client";
// // // import { Container, Grid, Button, CircularProgress, Box } from "@mui/material";
// // // import LessonList from "./lessonsList";
// // // import LessonSearch from "./lessonsSearch";
// // // import LessonsTitle from "./lessonsTitles";

// // // const apiClient = new ApiClient("https://localhost:7129");

// // // function ActionsForUsers() {
// // //     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// // //     const [isLoading, setIsLoading] = useState(false);
// // //     const [searchQuery, setSearchQuery] = useState("");
// // //     const [searchType, setSearchType] = useState("lecturer");
// // //     const [titles, setTitles] = useState<string[]>([]);
// // //     const [isLoadingTitles, setIsLoadingTitles] = useState(false);
// // //     const [showTitles, setShowTitles] = useState(false);

// // //     useEffect(() => {
// // //         const fetchAllLessons = async () => {
// // //             setIsLoading(true);
// // //             try {
// // //                 const result = await apiClient.lessonAll();
// // //                 setAllLessons(result);
// // //             } catch (error) {
// // //                 console.error("Error fetching lessons:", error);
// // //             }
// // //             setIsLoading(false);
// // //         };
// // //         fetchAllLessons();
// // //     }, []);

// // //     const allTitles = async () => {
// // //         setIsLoadingTitles(true);
// // //         try {
// // //             if (showTitles) {
// // //                 setShowTitles(false);
// // //                 return;
// // //             }
            
// // //             let result = await apiClient.title();
// // //             setTitles(result);
// // //             setShowTitles(true);
// // //         } catch (error) {
// // //             console.error("Error fetching titles:", error);
// // //         }
// // //         setIsLoadingTitles(false);
// // //     };

// // //     const handleSearch = async () => {
// // //         setIsLoading(true);
// // //         try {
// // //             let result = searchType === "lecturer"
// // //                 ? await apiClient.name(searchQuery)
// // //                 : await apiClient.title2(searchQuery);

// // //             const lessons = searchType === "lecturer"
// // //                 ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
// // //                 : result;

// // //             setAllLessons(lessons);
// // //         } catch (error) {
// // //             console.error("Error fetching lessons:", error);
// // //         }
// // //         setIsLoading(false);
// // //     };

// // //     return (
// // //         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
// // //             <Grid container spacing={3}> {/* הגדלתי את ה-spacing ל-3 כדי להוסיף רווחים נוספים */}
// // //                 {/* צד שמאל – רשימת השיעורים (60%) */}
// // //                 <Grid item xs={12} sm={7}>
// // //                     <LessonList lessons={allLessons} isLoading={isLoading} />
// // //                 </Grid>

// // //                 {/* צד ימין – חיפוש */}
// // //                 <Grid item xs={12} sm={3}>
// // //                     <LessonSearch
// // //                         searchQuery={searchQuery}
// // //                         setSearchQuery={setSearchQuery}
// // //                         searchType={searchType}
// // //                         setSearchType={setSearchType}
// // //                         handleSearch={handleSearch}
// // //                     />
// // //                 </Grid>

// // //                 {/* צד ימין – כפתור הצגת כותרות */}
// // //                 <Grid item xs={12} sm={2}>
// // //                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// // //                         <Button 
// // //                             variant="contained" 
// // //                             color="primary" 
// // //                             sx={{ marginBottom: 2 }} 
// // //                             onClick={allTitles}
// // //                         >
// // //                             {showTitles ? "Hide all subjects" : "View all subjects"}
// // //                         </Button>
// // //                         {isLoadingTitles && <CircularProgress size={24} />}
// // //                         {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
// // //                     </Box>
// // //                 </Grid>
// // //             </Grid>
// // //         </Container>
// // //     );
// // // }

// // // export default ActionsForUsers;
// // import { useEffect, useState } from "react";
// // import { ApiClient, Lesson } from "../api/client";
// // import { Container, Grid, Button, CircularProgress, Box, Typography } from "@mui/material";
// // import LessonList from "./lessonsList";
// // import LessonSearch from "./lessonsSearch";
// // import LessonsTitle from "./lessonsTitles";

// // const apiClient = new ApiClient("https://localhost:7129");

// // function ActionsForUsers() {
// //     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [searchType, setSearchType] = useState("lecturer");
// //     const [titles, setTitles] = useState<string[]>([]);
// //     const [isLoadingTitles, setIsLoadingTitles] = useState(false);
// //     const [showTitles, setShowTitles] = useState(false);

// //     useEffect(() => {
// //         const fetchAllLessons = async () => {
// //             setIsLoading(true);
// //             try {
// //                 const result = await apiClient.lessonAll();
// //                 setAllLessons(result);
// //             } catch (error) {
// //                 console.error("Error fetching lessons:", error);
// //             }
// //             setIsLoading(false);
// //         };
// //         fetchAllLessons();
// //     }, []);

// //     const allTitles = async () => {
// //         setIsLoadingTitles(true);
// //         try {
// //             if (showTitles) {
// //                 setShowTitles(false);
// //                 return;
// //             }

// //             let result = await apiClient.title();
// //             setTitles(result);
// //             setShowTitles(true);
// //         } catch (error) {
// //             console.error("Error fetching titles:", error);
// //         }
// //         setIsLoadingTitles(false);
// //     };

// //     const handleSearch = async () => {
// //         setIsLoading(true);
// //         try {
// //             let result = searchType === "lecturer"
// //                 ? await apiClient.name(searchQuery)
// //                 : await apiClient.title2(searchQuery);

// //             const lessons = searchType === "lecturer"
// //                 ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
// //                 : result;

// //             setAllLessons(lessons);
// //         } catch (error) {
// //             console.error("Error fetching lessons:", error);
// //         }
// //         setIsLoading(false);
// //     };

// //     return (
// //         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
// //             <Grid container spacing={3}>
// //                 {/* צד שמאל – רשימת השיעורים (60%) */}
// //                 <Grid item xs={12} sm={7} md={7} sx={{ mb: 3 }}>
// //                     <Box
// //                         sx={{
// //                             height: 400, // הגדרת גובה קבוע לריבוע
// //                             overflowY: 'auto', // גלילה אם התוכן עולה על הגובה
// //                             border: '1px solid #ddd',
// //                             padding: 2,
// //                             borderRadius: 2
// //                         }}
// //                     >
// //                         <LessonList lessons={allLessons} isLoading={isLoading} />
// //                     </Box>
// //                 </Grid>

// //                 {/* צד ימין – חיפוש */}
// //                 <Grid item xs={12} sm={4} md={3}>
// //                     <LessonSearch
// //                         searchQuery={searchQuery}
// //                         setSearchQuery={setSearchQuery}
// //                         searchType={searchType}
// //                         setSearchType={setSearchType}
// //                         handleSearch={handleSearch}
// //                     />
// //                 </Grid>

// //                 {/* צד ימין – כפתור הצגת כותרות */}
// //                 <Grid item xs={12} sm={12} md={2}>
// //                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// //                         <Button
// //                             variant="contained"
// //                             color="primary"
// //                             sx={{ marginBottom: 2, width: '100%' }}
// //                             onClick={allTitles}
// //                         >
// //                             {showTitles ? "Hide all subjects" : "View all subjects"}
// //                         </Button>
// //                         {isLoadingTitles && <CircularProgress size={24} />}
// //                         {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
// //                     </Box>
// //                 </Grid>
// //             </Grid>
// //         </Container>
// //     );
// // }

// // export default ActionsForUsers;
// import { useEffect, useState } from "react";
// import { ApiClient, Lesson } from "../api/client";
// import { Container, Grid, Button, CircularProgress, Box, Typography } from "@mui/material";
// import LessonList from "./lessonsList";
// import LessonSearch from "./lessonsSearch";
// import LessonsTitle from "./lessonsTitles";

// const apiClient = new ApiClient("https://localhost:7129");

// function ActionsForUsers() {
//     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchType, setSearchType] = useState("lecturer");
//     const [titles, setTitles] = useState<string[]>([]);
//     const [isLoadingTitles, setIsLoadingTitles] = useState(false);
//     const [showTitles, setShowTitles] = useState(false);

//     useEffect(() => {
//         const fetchAllLessons = async () => {
//             setIsLoading(true);
//             try {
//                 const result = await apiClient.lessonAll();
//                 setAllLessons(result);
//             } catch (error) {
//                 console.error("Error fetching lessons:", error);
//             }
//             setIsLoading(false);
//         };
//         fetchAllLessons();
//     }, []);

//     const allTitles = async () => {
//         setIsLoadingTitles(true);
//         try {
//             if (showTitles) {
//                 setShowTitles(false);
//                 return;
//             }

//             let result = await apiClient.title();
//             setTitles(result);
//             setShowTitles(true);
//         } catch (error) {
//             console.error("Error fetching titles:", error);
//         }
//         setIsLoadingTitles(false);
//     };

//     const handleSearch = async () => {
//         setIsLoading(true);
//         try {
//             let result = searchType === "lecturer"
//                 ? await apiClient.name(searchQuery)
//                 : await apiClient.title2(searchQuery);

//             const lessons = searchType === "lecturer"
//                 ? result.flatMap((lecturer: any) => lecturer.lecturerLessons || [])
//                 : result;

//             setAllLessons(lessons);
//         } catch (error) {
//             console.error("Error fetching lessons:", error);
//         }
//         setIsLoading(false);
//     };

//     return (
//         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//             <Grid container spacing={3}>
//                 {/* צד שמאל – רשימת השיעורים (60%) */}
//                 <Grid item xs={12} sm={7} md={7} sx={{ mb: 3 }}>
//                     <Box
//                         sx={{
//                             height: 500, // גובה קבוע לריבוע
//                             overflowY: 'auto', // גלילה אם התוכן עולה על הגובה
//                             border: '1px solid #ddd',
//                             borderRadius: 3, // פינות מעוגלות
//                             boxShadow: 3, // הוספת צליל למראה מודרני
//                             backgroundColor: '#f9f9f9', // צבע רקע בהיר
//                             padding: 2,
//                             display: 'flex',
//                             flexDirection: 'column',
//                         }}
//                     >
//                         {/* רשימת השיעורים */}
//                         <LessonList lessons={allLessons} isLoading={isLoading} />
//                     </Box>
//                 </Grid>

//                 {/* צד ימין – חיפוש */}
//                 <Grid item xs={12} sm={4} md={3}>
//                     <LessonSearch
//                         searchQuery={searchQuery}
//                         setSearchQuery={setSearchQuery}
//                         searchType={searchType}
//                         setSearchType={setSearchType}
//                         handleSearch={handleSearch}
//                     />
//                 </Grid>

//                 {/* צד ימין – כפתור הצגת כותרות */}
//                 <Grid item xs={12} sm={12} md={2}>
//                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             sx={{
//                                 marginBottom: 2,
//                                 width: '100%',
//                                 padding: '12px 20px', // עיצוב כפתור רחב ונוח
//                                 borderRadius: 2, // פינות מעוגלות לכפתור
//                                 boxShadow: 2, // הוספת צל לכפתור
//                                 '&:hover': {
//                                     boxShadow: 4, // הצללה גדולה יותר בהובר
//                                 },
//                             }}
//                             onClick={allTitles}
//                         >
//                             {showTitles ? "Hide all subjects" : "View all subjects"}
//                         </Button>
//                         {isLoadingTitles && <CircularProgress size={24} />}
//                         {showTitles && <LessonsTitle titles={titles} isLoading={isLoadingTitles} />}
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

// export default ActionsForUsers;

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
            } else {
                // אם התצוגה סגורה, נטען את הכותרות מחדש
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


