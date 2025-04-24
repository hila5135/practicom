import React, { useEffect, useState } from 'react';
import { ApiClient, Lecturer } from '../api/client';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LecturersListPage: React.FC = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const apiClient = new ApiClient("https://localhost:7129");

  useEffect(() => {
    // שליפת המרצים מה-API
    apiClient.lecturerAll()
      .then((data) => {
        setLecturers(data || []);
      })
      .catch((error) => {
        console.error("Error fetching lecturers:", error);
      });
  }, []);

  return (
    <Box sx={{ p: 4, direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom align="center">
        רשימת המרצים
      </Typography>

      {lecturers.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">לא נמצאו מרצים</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {lecturers.map((lecturer) => (
            <Grid item xs={12} sm={6} md={4} key={lecturer.lecturerId}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h6" component="div" color="primary" gutterBottom>
                    {lecturer.lecturerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    מספר השיעורים: {lecturer.lecturerLessons?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`המרצה עם ניסיון רב בתחום ההוראה וההדרכה. מציע שיעורים מגוונים ומעמיקים.`}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button
                    component={Link}
                    to={`/lecturers/${lecturer.lecturerId}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    לפרופיל המרצה
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LecturersListPage;
