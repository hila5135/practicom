// import { ApiClient, Lesson } from "../api/client";
// import { useState } from "react";
// import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, Paper, TextField, Tooltip, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import DownloadIcon from '@mui/icons-material/Download';
// import SearchIcon from '@mui/icons-material/Search';
// import LessonSearch from "./lessonsSearch";
// import LessonsTitle from "./lessonsTitles";
// type LessonsListProps = {
//     lessons: Lesson[];
//     isLoading: boolean;
// };

// const apiClient = new ApiClient("https://localhost:7129");
// const LessonsList = ({ lessons, isLoading }: LessonsListProps) => {
//     const [currentAudio, setCurrentAudio] = useState<string | null>(null) // הוספת state לאודיו
//     const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// const [searchQuery, setSearchQuery] = useState("");
// const [searchType, setSearchType] = useState("lecturer");
// const [titles, setTitles] = useState<string[]>([]);
// const [isLoadingTitles, setIsLoadingTitles] = useState(false);
// const [showTitles, setShowTitles] = useState(false);
//     const handleDownload = async (fileName: string) => {
//         try {
//             const response = await apiClient.download(fileName); // קריאה לפונקציה להורדת הקובץ
//             if (!response.ok) {
//                 throw new Error('Failed to download file');
//             }
//             const blob = await response.blob();
//             const contentDisposition = response.headers.get("Content-Disposition");
//             let fileNameFromHeader = fileName; // ברירת מחדל היא שם הקובץ שנשלח לפונקציה
//             if (contentDisposition) {
//                 const match = contentDisposition.match(/filename="(.+)"/);
//                 if (match) {
//                     fileNameFromHeader = match[1];
//                 }
//             }
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = fileNameFromHeader;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (error) {
//             console.error("Error downloading the file:", error);
//         }
//     };
//     const navigate = useNavigate();
//  const allTitles = async () => {
//         setIsLoadingTitles(true);
//         try {
//             if (showTitles) {
//                 setShowTitles(false);
//             } else {
//                 let result = await apiClient.title();
//                 setTitles(result);
//                 setShowTitles(true);
//             }
//         } catch (error) {
//             console.error("Error fetching titles:", error);
//         }
//         setIsLoadingTitles(false);
//     };
    
//   return (
//     <div
//       style={{
//         padding: "30px",
//         backgroundColor: "#f4f6f8",
//         borderRadius: "12px",
//         boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", color: "#333" }}>
//         כל השיעורים
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<HelpOutlineIcon/>}
//         sx={{ mt: 2, mb: 4 }}
//         fullWidth
//         onClick={() => navigate("/chat")}
//       >
//         יש לך שאלה על השיעור? שאל את הבוט
//       </Button>
//             <Divider sx={{ my: 2 }} />
  
//       {isLoading ? (
//         <Typography variant="h6" color="text.secondary">
//           טוען שיעורים...
//         </Typography>
//       ) : lessons.length > 0 ? (
//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           {lessons.map((lesson, index) => (
//             <li
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "16px",
//                 marginBottom: "16px",
//                 padding: "16px",
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
//               }}
//             >
                  

//               <Tooltip title="הורד שיעור">
//                 <IconButton
//                   color="secondary"
//                   onClick={() => handleDownload(lesson.lessonName!)}
//                 >
//                   <DownloadIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="האזן לשיעור">
//                 <IconButton
//                   color="primary"
//                   onClick={() => {
//                     if (lesson.lessonUrl) {
//                       window.open(lesson.lessonUrl, "_blank");
//                     }
//                   }}
//                 >
//                   <PlayArrowIcon />
//                 </IconButton>
//               </Tooltip>
//               <div style={{ flex: 1 }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>
//                   {lesson.lessonTitle || "ללא כותרת"}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#555" }}>
//                   {lesson.lessonName || "ללא תיאור"}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: "#777" }}>
//                   מרצה: {lesson.lessonLecturer?.lecturerName || "לא ידוע"}
//                 </Typography>
//               </div>

           
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <Typography variant="body1" color="text.secondary">
//           לא נמצאו שיעורים.
//         </Typography>
//       )}

//       {currentAudio && (
//         <div style={{ marginTop: "30px", textAlign: "center" }}>
//           <audio controls autoPlay style={{ width: "100%" }}>
//             <source src={currentAudio} type="audio/mpeg" />
//             הדפדפן שלך לא תומך בנגן אודיו.
//           </audio>
//         </div>
//       )}
//     </div>
//   );
// };
// export default LessonsList;


import { ApiClient, Lesson } from "../api/client";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";

type LessonsListProps = {
  lessons: Lesson[];
  isLoading: boolean;
};

const apiClient = new ApiClient("https://localhost:7129");

const LessonsList = ({ lessons, isLoading }: LessonsListProps) => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [downloadingLessonName, setDownloadingLessonName] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDownload = async (fileName: string) => {
    setDownloadingLessonName(fileName);
    try {
      const response = await apiClient.download(fileName);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileNameFromHeader = fileName;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          fileNameFromHeader = match[1];
        }
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileNameFromHeader;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloadingLessonName(null);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f8",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", color: "#333" }}>
        כל השיעורים
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<HelpOutlineIcon />}
        sx={{ mt: 2, mb: 4 }}
        fullWidth
        onClick={() => navigate("/chat")}
      >
        יש לך שאלה על השיעור? שאל את הבוט
      </Button>

      <Divider sx={{ my: 2 }} />

      {isLoading ? (
        <Typography variant="h6" color="text.secondary">
          טוען שיעורים...
        </Typography>
      ) : lessons.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {lessons.map((lesson, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
                padding: "16px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)"
              }}
            >
              <Tooltip title="הורד שיעור">
                <IconButton
                  color="secondary"
                  disabled={downloadingLessonName === lesson.lessonName}
                  onClick={() => handleDownload(lesson.lessonName!)}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="האזן לשיעור">
                <IconButton
                  color="primary"
                  onClick={() => {
                    if (lesson.lessonUrl) {
                      window.open(lesson.lessonUrl, "_blank");
                    }
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Tooltip>

              <div style={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>
                  {lesson.lessonTitle || "ללא כותרת"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {lesson.lessonName || "ללא תיאור"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#777" }}>
                  מרצה: {lesson.lessonLecturer?.lecturerName || "לא ידוע"}
                </Typography>
                {downloadingLessonName === lesson.lessonName && (
                  <Typography variant="body2" sx={{ color: "orange", mt: 1 }}>
                    ...מוריד שיעור
                  </Typography>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body1" color="text.secondary">
          לא נמצאו שיעורים.
        </Typography>
      )}

      {currentAudio && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <audio controls autoPlay style={{ width: "100%" }}>
            <source src={currentAudio} type="audio/mpeg" />
            הדפדפן שלך לא תומך בנגן אודיו.
          </audio>
        </div>
      )}
    </div>
  );
};

export default LessonsList;
