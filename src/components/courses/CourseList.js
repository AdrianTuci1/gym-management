import React, { useState } from 'react';
import { Box, Typography, Paper, styled, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import CourseCard from './CourseCard';
import { mockCourses, mockTrainers } from '../../data/mockData';

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

const ViewSwitcher = styled(ToggleButtonGroup)({
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '8px',
});

const ViewButton = styled(ToggleButton)({
  padding: '8px',
  minWidth: '40px',
  '&.Mui-selected': {
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
});

const Separator = styled(Divider)({
  margin: '16px 0',
});

const TrainerCard = styled(Paper)({
  padding: '16px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const TrainerInfo = styled(Box)({
  flex: 1,
});

const TrainerImage = styled('img')({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',
});

const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
});

const CourseList = () => {
  const [view, setView] = useState('courses');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <CourseListContainer>
      <ViewSwitcher
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="view switcher"
      >
        <ViewButton value="courses" aria-label="courses view">
          <FitnessCenterIcon />
        </ViewButton>
        <ViewButton value="trainers" aria-label="trainers view">
          <GroupIcon />
        </ViewButton>
      </ViewSwitcher>

      <Separator />

      {view === 'courses' ? (
        <>
          <SectionHeader>
            <AccessTimeIcon color="primary" />
            <Typography variant="h6">În desfășurare</Typography>
          </SectionHeader>
          {mockCourses.ongoing.map((course) => (
            <CourseCard key={course.id} course={course} isOngoing={true} />
          ))}

          <SectionHeader sx={{ mt: 4 }}>
            <EventIcon color="primary" />
            <Typography variant="h6">Următoare</Typography>
          </SectionHeader>
          {mockCourses.upcoming.map((course) => (
            <CourseCard key={course.id} course={course} isOngoing={false} />
          ))}
        </>
      ) : (
        <>
          {mockTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} elevation={1}>
              <TrainerImage src={trainer.image} alt={trainer.name} />
              <TrainerInfo>
                <Typography variant="h6">{trainer.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experiență: {trainer.experience} • Rating: {trainer.rating}
                </Typography>
              </TrainerInfo>
            </TrainerCard>
          ))}
        </>
      )}
    </CourseListContainer>
  );
};

export default CourseList; 