// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { ApiClient, Lecturer, Lesson } from '../api/client';

// // const apiClient = new ApiClient("https://localhost:7129");
// // const LecturerDetailsPage: React.FC = () => {
// //   const { lecturerId } = useParams<{ lecturerId: string }>();
// //   const [lecturer, setLecturer] = useState<Lecturer | null>(null);
// //   const [lessons, setLessons] = useState<Lesson[]>([]);

// //   useEffect(() => {
// //     // שליפת פרטי המרצה לפי ID
// //     if (lecturerId) {
// //       apiClient.id(Number(lecturerId))
// //         .then((data) => {
// //           setLecturer(data);
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching lecturer details:", error);
// //         });
// //     }
// //   }, [lecturerId]);

// //   useEffect(() => {
// //     // שליפת כל השיעורים של המרצה לפי ID
// //     if (lecturerId) {
// //       apiClient.id(Number(lecturerId)) // זו פונקציה שמחזירה את השיעורים של המרצה
// //         .then((data) => {
// //           setLessons(data.lecturerLessons || []);
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching lessons:", error);
// //         });
// //     }
// //   }, [lecturerId]);

// //   if (!lecturer) {
// //     return <div>טוען נתונים...</div>;
// //   }

// //   return (
// //     <div>
// //       <h2>שם המרצה: {lecturer.lecturerName}</h2>
      
// //       <h2>השעורים של {lecturer.lecturerName}</h2>
// //       {lessons.length === 0 ? (
// //         <p>לא נמצאו שיעורים עבור מרצה זה.</p>
// //       ) : (
// //         <ul>
// //           {lessons.map((lesson) => (
// //             <li key={lesson.lessonId}>
// //               <a href={`/lessons/${lesson.lessonId}`}>
// //                 {lesson.lessonName}
// //               </a>
// //               <p>{lesson.lessonTitle} , {lesson.lessonName} , {lesson.lessonDuration} , {lesson.lessonDownloadCount}</p>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default LecturerDetailsPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ApiClient, Lecturer, Lesson } from '../api/client';
// import './LecturerDetailsPage.css'; // הוספנו קובץ CSS

// const apiClient = new ApiClient("https://localhost:7129");

// const LecturerDetailsPage: React.FC = () => {
//   const { lecturerId } = useParams<{ lecturerId: string }>();
//   const [lecturer, setLecturer] = useState<Lecturer | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);

//   useEffect(() => {
//     if (lecturerId) {
//       apiClient.id(Number(lecturerId))
//         .then((data) => setLecturer(data))
//         .catch((error) => console.error("Error fetching lecturer details:", error));
//     }
//   }, [lecturerId]);

//   useEffect(() => {
//     if (lecturerId) {
//       apiClient.id(Number(lecturerId))
//         .then((data) => setLessons(data.lecturerLessons || []))
//         .catch((error) => console.error("Error fetching lessons:", error));
//     }
//   }, [lecturerId]);

//   if (!lecturer) {
//     return <div>טוען נתונים...</div>;
//   }

//   return (
//     <div className="lecturer-details">
//       <h2>שם המרצה: {lecturer.lecturerName}</h2>
      
//       <h3>רשימת שיעורים</h3>
//       {lessons.length === 0 ? (
//         <p>לא נמצאו שיעורים עבור מרצה זה.</p>
//       ) : (
//         <div className="lessons-grid">
//           {lessons.map((lesson) => (
//             <div className="lesson-card" key={lesson.lessonId}>
//               <h4>{lesson.lessonName}</h4>
//               <p><strong>כותרת:</strong> {lesson.lessonTitle}</p>
//               <p><strong>משך:</strong> {lesson.lessonDuration} דקות</p>
//               <p><strong>מספר הורדות:</strong> {lesson.lessonDownloadCount}</p>
//               <a href={`/lessons/${lesson.lessonId}`} className="view-link">לצפייה בשיעור</a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LecturerDetailsPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ApiClient, Lecturer, Lesson } from '../api/client';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   CardActions,
//   Box,
// } from '@mui/material';

// const apiClient = new ApiClient("https://localhost:7129");

// const LecturerDetailsPage: React.FC = () => {
//   const { lecturerId } = useParams<{ lecturerId: string }>();
//   const [lecturer, setLecturer] = useState<Lecturer | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);

//   useEffect(() => {
//     if (lecturerId) {
//       apiClient.id(Number(lecturerId))
//         .then((data) => {
//           setLecturer(data);
//           setLessons(data.lecturerLessons || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [lecturerId]);

//   if (!lecturer) {
//     return <Typography variant="h6">טוען נתונים...</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4, direction: 'rtl' }}>
//       <Typography variant="h4" gutterBottom>
//         שם המרצה: {lecturer.lecturerName}
//       </Typography>

//       <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
//         רשימת שיעורים
//       </Typography>

//       {lessons.length === 0 ? (
//         <Typography>לא נמצאו שיעורים עבור מרצה זה.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {lessons.map((lesson) => (
//             <Grid item xs={12} sm={6} md={4} key={lesson.lessonId}>
//               <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 4 }}>
//                 <CardContent>
//                   <Typography variant="h6" color="primary" gutterBottom>
//                     {lesson.lessonName}
//                   </Typography>
//                   <Typography variant="body2"><strong>כותרת:</strong> {lesson.lessonTitle}</Typography>
//                   <Typography variant="body2"><strong>משך:</strong> {lesson.lessonDuration} דקות</Typography>
//                   <Typography variant="body2"><strong>מס' הורדות:</strong> {lesson.lessonDownloadCount}</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     color="secondary"
//                     href={`/lessons/${lesson.lessonId}`}
//                   >
//                     לצפייה בשיעור
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default LecturerDetailsPage;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ApiClient, Lecturer, Lesson } from '../api/client';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   CardActions,
//   Box,
// } from '@mui/material';

// const apiClient = new ApiClient("https://localhost:7129");

// const LecturerDetailsPage: React.FC = () => {
//   const { lecturerId } = useParams<{ lecturerId: string }>();
//   const [lecturer, setLecturer] = useState<Lecturer | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
//   const [currentLessonName, setCurrentLessonName] = useState<string | null>(null);

//   useEffect(() => {
//     if (lecturerId) {
//       apiClient.id(Number(lecturerId))
//         .then((data) => {
//           setLecturer(data);
//           setLessons(data.lecturerLessons || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [lecturerId]);

//   const handlePlayLesson = (audioUrl: string, lessonName: string) => {
//     setCurrentAudioUrl(audioUrl);
//     setCurrentLessonName(lessonName);
//   };

//   if (!lecturer) {
//     return <Typography variant="h6">טוען נתונים...</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4, direction: 'rtl' }}>
//       <Typography variant="h4" gutterBottom>
//         שם המרצה: {lecturer.lecturerName}
//       </Typography>

//       <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
//         רשימת שיעורים
//       </Typography>

//       {lessons.length === 0 ? (
//         <Typography>לא נמצאו שיעורים עבור מרצה זה.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {lessons.map((lesson) => (
//             <Grid item xs={12} sm={6} md={4} key={lesson.lessonId}>
//               <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 4 }}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     color="primary"
//                     gutterBottom
//                     sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//                     onClick={() => handlePlayLesson(lesson.lessonUrl!, lesson.lessonName!)}
//                   >
//                     {lesson.lessonName}
//                   </Typography>
//                   <Typography variant="body2"><strong>כותרת:</strong> {lesson.lessonTitle}</Typography>
//                   <Typography variant="body2"><strong>משך:</strong> {lesson.lessonDuration} דקות</Typography>
//                   <Typography variant="body2"><strong>מס' הורדות:</strong> {lesson.lessonDownloadCount}</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     color="secondary"
//                     href={`/lessons/${lesson.lessonId}`}
//                   >
//                     לצפייה בשיעור
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {currentAudioUrl && (
//         <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <Typography variant="h6" gutterBottom>🔊 מנגן כעת: {currentLessonName}</Typography>
//           <audio src={currentAudioUrl} controls autoPlay style={{ width: '100%' }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default LecturerDetailsPage;
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ApiClient, Lecturer, Lesson } from '../api/client';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   CardActions,
//   Box,
// } from '@mui/material';

// const apiClient = new ApiClient("https://localhost:7129");

// const LecturerDetailsPage: React.FC = () => {
//   const { lecturerId } = useParams<{ lecturerId: string }>();
//   const [lecturer, setLecturer] = useState<Lecturer | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
//   const [currentLessonName, setCurrentLessonName] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (lecturerId) {
//       // איפוס נתונים כדי למנוע תקלות בהצגה חוזרת
//       setLecturer(null);
//       setLessons([]);
//       setCurrentAudioUrl(null);

//       apiClient.id(Number(lecturerId))
//         .then((data) => {
//           setLecturer(data);
//           setLessons(data.lecturerLessons || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [lecturerId]);

//   const handlePlayLesson = (audioUrl: string, lessonName: string) => {
//     console.log("🔗 lesson URL:",audioUrl);
//     setCurrentAudioUrl(audioUrl);
//     setCurrentLessonName(lessonName);
//   };

//   if (!lecturer) {
//     return <Typography variant="h6" sx={{ p: 4 }}>טוען נתונים...</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4, direction: 'rtl' }}>
//       <Typography variant="h4" gutterBottom>
//         שם המרצה: {lecturer.lecturerName}
//       </Typography>

//       <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
//         רשימת שיעורים
//       </Typography>

//       {lessons.length === 0 ? (
//         <Typography>לא נמצאו שיעורים עבור מרצה זה.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {lessons.map((lesson) => (
//             <Grid item xs={12} sm={6} md={4} key={lesson.lessonId}>
//               <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 4 }}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     color="primary"
//                     gutterBottom
//                     sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//                     onClick={() => handlePlayLesson(lesson.lessonUrl!, lesson.lessonName!)}
//                   >
//                     {lesson.lessonName}
//                   </Typography>
//                   <Typography variant="body2"><strong>כותרת:</strong> {lesson.lessonTitle}</Typography>
//                   <Typography variant="body2"><strong>משך:</strong> {lesson.lessonDuration} דקות</Typography>
//                   <Typography variant="body2"><strong>מס' הורדות:</strong> {lesson.lessonDownloadCount}</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     color="secondary"
//                     onClick={() => navigate(`/lessons/${lesson.lessonId}`)}
//                   >
//                     לצפייה בשיעור                    
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
            
//           ))}
//         </Grid>

//       )}

//       {currentAudioUrl && (
//         <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <Typography variant="h6" gutterBottom>🔊 מנגן כעת: {currentLessonName}</Typography>
//           <audio src={currentAudioUrl} controls autoPlay style={{ width: '100%' }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default LecturerDetailsPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiClient, Lecturer, Lesson } from '../api/client';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
  Box,
} from '@mui/material';

const apiClient = new ApiClient("https://localhost:7129");

const LecturerDetailsPage: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentLessonName, setCurrentLessonName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (lecturerId) {
      // איפוס נתונים כדי למנוע תקלות בהצגה חוזרת
      setLecturer(null);
      setLessons([]);
      setCurrentAudioUrl(null);

      apiClient.id(Number(lecturerId))
        .then((data) => {
          setLecturer(data);
          setLessons(data.lecturerLessons || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [lecturerId]);

  const handlePlayLesson = (audioUrl: string, lessonName: string) => {
    console.log("🔗 lesson URL:", audioUrl);
    setCurrentAudioUrl(audioUrl);
    setCurrentLessonName(lessonName);
  };

  if (!lecturer) {
    return <Typography variant="h6" sx={{ p: 4 }}>טוען נתונים...</Typography>;
  }

  return (
    <Box sx={{ p: 4, direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>
        שם המרצה: {lecturer.lecturerName}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        רשימת שיעורים
      </Typography>

      {lessons.length === 0 ? (
        <Typography>לא נמצאו שיעורים עבור מרצה זה.</Typography>
      ) : (
        <Grid container spacing={3}>
          {lessons.map((lesson) => (
            <Grid item xs={12} sm={6} md={4} key={lesson.lessonId}>
              <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handlePlayLesson(lesson.lessonUrl!, lesson.lessonName!)}
                  >
                    {lesson.lessonName}
                  </Typography>
                  <Typography variant="body2"><strong>כותרת:</strong> {lesson.lessonTitle}</Typography>
                  <Typography variant="body2"><strong>משך:</strong> {lesson.lessonDuration} דקות</Typography>
                  <Typography variant="body2"><strong>מס' הורדות:</strong> {lesson.lessonDownloadCount}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePlayLesson(lesson.lessonUrl!, lesson.lessonName!)}
                  >
                    ▶️ השמע
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={currentAudioUrl !== lesson.lessonUrl}
                    onClick={() => {
                      setCurrentAudioUrl(null);
                      setCurrentLessonName(null);
                    }}
                  >
                    ⏹ עצור
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {currentAudioUrl && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>🔊 מנגן כעת: {currentLessonName}</Typography>
          <audio src={currentAudioUrl} controls autoPlay style={{ width: '100%' }} />
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setCurrentAudioUrl(null);
              setCurrentLessonName(null);
            }}
            sx={{ mt: 2 }}
          >
            ⏹ עצור נגן
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LecturerDetailsPage;
