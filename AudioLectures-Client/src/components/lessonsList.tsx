import { ApiClient, Lesson } from "../api/client";
import { useState } from "react";
import {   IconButton,  Tooltip} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import { Clock,  Headphones, MessageCircle,User } from "lucide-react";
type LessonsListProps = {
    lessons: Lesson[];
    isLoading: boolean;
};

const apiClient = new ApiClient("https://localhost:7129");
const LessonsList = ({ lessons, isLoading }: LessonsListProps) => {
    const [currentAudio, setCurrentAudio] = useState<string | null>(null) // הוספת state לאודיו
   console.log(setCurrentAudio)
    // const [allLessons, setAllLessons] = useState<Lesson[]>([]);
// const [searchQuery, setSearchQuery] = useState("");
// const [searchType, setSearchType] = useState("lecturer");
const [titles, setTitles] = useState<string[]>([]);
console.log(titles)
const [downloadingLesson, setDownloadingLesson] = useState<string | null>(null)
console.log(setDownloadingLesson)
  const [playingLesson, setPlayingLesson] = useState<string | null>(null)
  console.log(setPlayingLesson)
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null)
const [isLoadingTitles, setIsLoadingTitles] = useState(false);
console.log(isLoadingTitles)
const [showTitles, setShowTitles] = useState(false);

 
    const handleDownload = async (fileName: string) => {
        try {
            const response = await apiClient.download(fileName); // קריאה לפונקציה להורדת הקובץ
            if (!response.ok) {
                throw new Error('Failed to download file');
            }
            const blob = await response.blob();
            const contentDisposition = response.headers.get("Content-Disposition");
            let fileNameFromHeader = fileName; // ברירת מחדל היא שם הקובץ שנשלח לפונקציה
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) {
                    fileNameFromHeader = match[1];
                }
            }
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileNameFromHeader;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };
    
    const navigate = useNavigate();
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
    console.log(allTitles)
    const styles = {
      container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        backgroundColor: "#fafbfc",
        minHeight: "100vh",
      },
      header: {
        marginBottom: "40px",
      },
      title: {
        fontSize: "2.5rem",
        fontWeight: "700",
        color: "#1a202c",
        marginBottom: "8px",
        letterSpacing: "-0.025em",
      },
      subtitle: {
        fontSize: "1.125rem",
        color: "#718096",
        marginBottom: "32px",
      },
      aiButton: {
        width: "100%",
        maxWidth: "400px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        padding: "16px 24px",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
        transition: "all 0.3s ease",
        marginBottom: "40px",
      },
      divider: {
        height: "1px",
        background: "#e2e8f0",
        margin: "32px 0",
      },
      loadingContainer: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        color: "#718096",
      },
      loadingSpinner: {
        width: "40px",
        height: "40px",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #667eea",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "16px",
      },
      lessonsList: {
        display: "grid",
        gap: "1px",
        background: "#e2e8f0",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      lessonItem: {
        background: "white",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        transition: "all 0.2s ease",
        cursor: "pointer",
        position: "relative" as const,
      },
      lessonItemHover: {
        background: "#f7fafc",
      },
      lessonAvatar: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "1.25rem",
        fontWeight: "700",
        flexShrink: 0,
      },
      lessonContent: {
        flex: 1,
        minWidth: 0,
      },
      lessonTitle: {
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "#1a202c",
        marginBottom: "4px",
        lineHeight: "1.4",
      },
      lessonName: {
        fontSize: "0.875rem",
        color: "#718096",
        marginBottom: "8px",
        lineHeight: "1.4",
      },
      lessonMeta: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        fontSize: "0.75rem",
        color: "#a0aec0",
      },
      lecturerInfo: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
      },
      statusBadge: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "0.75rem",
        fontWeight: "500",
      },
      downloadingBadge: {
        background: "#fed7d7",
        color: "#c53030",
      },
      playingBadge: {
        background: "#c6f6d5",
        color: "#2f855a",
      },
      actionButtons: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
      },
      actionButton: {
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        background: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        color: "#718096",
      },
      downloadButton: {
        borderColor: "#3182ce",
        color: "#3182ce",
      },
      downloadButtonHover: {
        background: "#3182ce",
        color: "white",
      },
      playButton: {
        borderColor: "#38a169",
        color: "#38a169",
      },
      playButtonHover: {
        background: "#38a169",
        color: "white",
      },
      playButtonActive: {
        background: "#38a169",
        color: "white",
        borderColor: "#38a169",
      },
      moreButton: {
        borderColor: "#e2e8f0",
        color: "#a0aec0",
      },
      moreButtonHover: {
        background: "#f7fafc",
        borderColor: "#cbd5e0",
      },
      emptyState: {
        textAlign: "center" as const,
        padding: "80px 20px",
        color: "#718096",
      },
      emptyTitle: {
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px",
        color: "#4a5568",
      },
      audioPlayer: {
        marginTop: "32px",
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0",
      },
      audioElement: {
        width: "100%",
        height: "40px",
      },
    }
  
  return (
    // <div
    //   style={{
    //     padding: "30px",
    //     backgroundColor: "#f4f6f8",
    //     borderRadius: "12px",
    //     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    //   }}
    // >
    //   <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", color: "#333" }}>
    //     כל השיעורים
    //   </Typography>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     startIcon={<HelpOutlineIcon/>}
    //     sx={{ mt: 2, mb: 4 }}
    //     fullWidth
    //     onClick={() => navigate("/chat")}
    //   >
    //     יש לך שאלה על השיעור? שאל את הבוט
    //   </Button>
    //         <Divider sx={{ my: 2 }} />
  
    //   {isLoading ? (
    //     <Typography variant="h6" color="text.secondary">
    //       טוען שיעורים...
    //     </Typography>
    //   ) : lessons.length > 0 ? (
    //     <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    //       {lessons.map((lesson, index) => (
    //         <li
    //           key={index}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             gap: "16px",
    //             marginBottom: "16px",
    //             padding: "16px",
    //             backgroundColor: "#fff",
    //             borderRadius: "10px",
    //             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    //           }}
    //         >
                  

    //           <Tooltip title="הורד שיעור">
    //             <IconButton
    //               color="secondary"
    //               onClick={() => handleDownload(lesson.lessonName!)}
    //             >
    //               <DownloadIcon />
    //             </IconButton>
    //           </Tooltip>
    //           <Tooltip title="האזן לשיעור">
    //             <IconButton
    //               color="primary"
    //               onClick={() => {
    //                 if (lesson.lessonUrl) {
    //                   window.open(lesson.lessonUrl, "_blank");
    //                 }
    //               }}
    //             >
    //               <PlayArrowIcon />
    //             </IconButton>
    //           </Tooltip>
    //           <div style={{ flex: 1 }}>
    //             <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>
    //               {lesson.lessonTitle || "ללא כותרת"}
    //             </Typography>
    //             <Typography variant="body2" sx={{ color: "#555" }}>
    //               {lesson.lessonName || "ללא תיאור"}
    //             </Typography>
    //             <Typography variant="caption" sx={{ color: "#777" }}>
    //               מרצה: {lesson.lessonLecturer?.lecturerName || "לא ידוע"}
    //             </Typography>
    //           </div>

           
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <Typography variant="body1" color="text.secondary">
    //       לא נמצאו שיעורים.
    //     </Typography>
    //   )}

    //   {currentAudio && (
    //     <div style={{ marginTop: "30px", textAlign: "center" }}>
    //       <audio controls autoPlay style={{ width: "100%" }}>
    //         <source src={currentAudio} type="audio/mpeg" />
    //         הדפדפן שלך לא תומך בנגן אודיו.
    //       </audio>
    //     </div>
    //   )}
    // </div>
    <div style={styles.container}>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .lesson-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          
          .lesson-content {
            width: 100% !important;
          }
          
          .action-buttons {
            width: 100% !important;
            justify-content: flex-end !important;
          }
          
          .lesson-meta {
            flex-wrap: wrap !important;
          }
        }
      `}
    </style>

    {/* Header */}
    <div style={styles.header}>
      <h1 style={styles.title}>כל השיעורים</h1>
      <p style={styles.subtitle}>גלה ולמד מאלפי שיעורים איכותיים</p>

      <button
        style={styles.aiButton}
        onClick={() => navigate("/chat")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.5)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
        }}
      >
        <MessageCircle size={20} />
        <span>יש לך שאלה? שאל את הבוט החכם</span>
      </button>
    </div>

    <div style={styles.divider}></div>

    {/* Content */}
    {isLoading ? (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>טוען שיעורים...</h3>
        <p style={{ fontSize: "0.875rem" }}>אנא המתן רגע</p>
      </div>
    ) : lessons.length > 0 ? (
      <div style={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="lesson-item"
            style={{
              ...styles.lessonItem,
              ...(hoveredLesson === index ? styles.lessonItemHover : {}),
            }}
            onMouseEnter={() => setHoveredLesson(index)}
            onMouseLeave={() => setHoveredLesson(null)}
          >
            {/* Avatar */}
            <div style={styles.lessonAvatar}>{lesson.lessonTitle?.charAt(0) || "ש"}</div>

            {/* Content */}
            <div style={styles.lessonContent} className="lesson-content">
              <h3 style={styles.lessonTitle}>{lesson.lessonTitle || "ללא כותרת"}</h3>
              <p style={styles.lessonName}>{lesson.lessonName || "ללא תיאור"}</p>

              <div style={styles.lessonMeta} className="lesson-meta">
                <div style={styles.lecturerInfo}>
                  <User size={12} />
                  <span>{lesson.lessonLecturer?.lecturerName || "לא ידוע"}</span>
                </div>

                {downloadingLesson === lesson.lessonName && (
                  <div style={{ ...styles.statusBadge, ...styles.downloadingBadge }}>
                    <Clock size={12} />
                    <span>מוריד...</span>
                  </div>
                )}

                {playingLesson === lesson.lessonName && (
                  <div style={{ ...styles.statusBadge, ...styles.playingBadge }}>
                    <Headphones size={12} />
                    <span>מתנגן</span>
                  </div>
                )}
              </div>
            </div>
            <Tooltip title="הורד שיעור">
              <IconButton
                  color="secondary"
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


            </div>
        ))}
      </div>
    ) : (
      <div style={styles.emptyState}>
        <h3 style={styles.emptyTitle}>אין שיעורים זמינים</h3>
        <p>נסה לחפש שיעורים אחרים או לבדוק שוב מאוחר יותר</p>
      </div>
    )}

    {/* Audio Player */}
    {currentAudio && (
      <div style={styles.audioPlayer}>
        <audio controls autoPlay style={styles.audioElement}>
          <source src={currentAudio} type="audio/mpeg" />
          הדפדפן שלך לא תומך בנגן אודיו.
        </audio>
      </div>
    )}
  </div>
  );
};
export default LessonsList;
