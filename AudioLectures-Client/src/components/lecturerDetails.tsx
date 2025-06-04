import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const apiClient = new ApiClient("https://audiolecturesserver.onrender.com");

const LecturerDetailsPage: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentLessonName, setCurrentLessonName] = useState<string | null>(null);
  useEffect(() => {
    if (lecturerId) {
      // איפוס נתונים כדי למנוע תקלות בהצגה חוזרת
      setLecturer(null);
      setLessons([]);
      setCurrentAudioUrl(null);

  apiClient.id(Number(lecturerId))
  .then((data) => {
    setLecturer(data);

    if (data.lecturerName) {
      return getLessonsByLecturerName(data.lecturerName);
    } else {
      throw new Error("לא התקבל שם מרצה");
    }
  })
  .then((lecturers) => {
    if (lecturers.length > 0) {
      const foundLecturer = lecturers[0]; // או חיפוש לפי ID אם יש כמה עם אותו שם
      setLessons(foundLecturer.lecturerLessons || []);
    } else {
      console.warn("לא נמצאו מרצים בשם הזה");
      setLessons([]);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
    }
  }, [lecturerId]);


  const getLessonsByLecturerName = (name: string): Promise<Lecturer[]> => {
    return apiClient.name(name); // כבר מחזיר Promise<Lecturer[]>, אין צורך ב-res.json()
  }
    
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
         {currentAudioUrl && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>🔊 מנגן כעת: {currentLessonName}</Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
    לצפיה בשעור עבור לעמוד הצפיות
  </Typography>
          <audio src={currentAudioUrl} controls autoPlay style={{ width: '100%' }} />
          
        </Box>
      )}
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
                    ▶️ הפעל
                  </Button>
                  <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setCurrentAudioUrl(null);
              setCurrentLessonName(null);
            }}
            // sx={{ mt: 2 }}
          >
            ⏹ עצור נגן
          </Button>
                  {/* <Button
                    variant="outlined"
                    color="error"
                    disabled={currentAudioUrl !== lesson.lessonUrl}
                    onClick={() => {
                      setCurrentAudioUrl(null);
                      setCurrentLessonName(null);
                    }}
                  >
                    ⏹ עצור
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

   
    </Box>
  );
};

export default LecturerDetailsPage;
