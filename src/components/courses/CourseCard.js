import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';

const CardContainer = styled(Box)({
  padding: '16px',
  marginBottom: '12px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #1a1a1a',
});

const CourseHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
});

const ProgressContainer = styled(Box)({
  marginTop: '8px',
});

const CourseCard = ({ course, isOngoing }) => {
  const progress = (course.participants / course.capacity) * 100;

  return (
    <CardContainer>
      <CourseHeader>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.instructor}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color={isOngoing ? 'success.main' : 'text.secondary'}
        >
          {course.time}
        </Typography>
      </CourseHeader>
      <ProgressContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Participanți: {course.participants}/{course.capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e9ecef',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1a1a1a',
            },
          }}
        />
      </ProgressContainer>
    </CardContainer>
  );
};

export default CourseCard; 