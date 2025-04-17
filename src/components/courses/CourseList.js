import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import CourseCard from './CourseCard';

const CourseListContainer = styled(Paper)({
  padding: '20px',
  height: '100%',
  overflowY: 'auto',
  backgroundColor: '#ffffff',
});

const SectionTitle = styled(Typography)({
  marginBottom: '16px',
  fontWeight: 'bold',
});

const mockCourses = {
  ongoing: [
    {
      id: 1,
      title: 'Yoga',
      instructor: 'Ana Popescu',
      time: '10:00 - 11:00',
      participants: 8,
      capacity: 12,
    },
    {
      id: 2,
      title: 'Pilates',
      instructor: 'Mihai Ionescu',
      time: '11:30 - 12:30',
      participants: 6,
      capacity: 10,
    },
  ],
  upcoming: [
    {
      id: 3,
      title: 'HIIT',
      instructor: 'Alex Dumitrescu',
      time: '13:00 - 14:00',
      participants: 5,
      capacity: 15,
    },
    {
      id: 4,
      title: 'Zumba',
      instructor: 'Elena Stoica',
      time: '14:30 - 15:30',
      participants: 3,
      capacity: 20,
    },
  ],
};

const CourseList = () => {
  return (
    <CourseListContainer>
      <SectionTitle variant="h6">Cursuri în desfășurare</SectionTitle>
      {mockCourses.ongoing.map((course) => (
        <CourseCard key={course.id} course={course} isOngoing={true} />
      ))}

      <SectionTitle variant="h6" sx={{ mt: 4 }}>
        Cursuri următoare
      </SectionTitle>
      {mockCourses.upcoming.map((course) => (
        <CourseCard key={course.id} course={course} isOngoing={false} />
      ))}
    </CourseListContainer>
  );
};

export default CourseList; 