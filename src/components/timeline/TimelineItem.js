import React from 'react';
import { Box, Typography, Avatar, styled } from '@mui/material';

const ItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  position: 'relative',
  '&:hover': {
    backgroundColor: '#e9ecef',
  },
});

const NameContainer = styled(Box)({
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  paddingRight: '16px',
});

const StyledAvatar = styled(Avatar)({
  width: '40px',
  height: '40px',
  marginRight: '12px',
  backgroundColor: '#1a1a1a',
});

const TimelineBar = styled(Box)({
  height: '44px',
  backgroundColor: '#e9ecef',
  borderRadius: '4px',
  position: 'relative',
  overflow: 'visible',
});

const DurationBar = styled(Box)({
  position: 'absolute',
  top: 0,
  height: '40px',
  backgroundColor: '#1a1a1a',
  borderRadius: '4px',
});

const TimeDot = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '#1a1a1a',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
  },
});

const TimeLabel = styled(Box)({
  position: 'absolute',
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '12px',
  color: '#666',
  whiteSpace: 'nowrap',
  backgroundColor: '#ffffff',
  padding: '2px 2px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
});

const TimelineItem = ({ member, zoomLevel }) => {
  const [checkInHours, checkInMinutes] = member.checkIn.split(':').map(Number);
  const [checkOutHours, checkOutMinutes] = member.checkOut.split(':').map(Number);
  
  const checkInPosition = ((checkInHours - 8) * 60 + checkInMinutes) * zoomLevel;
  const duration = ((checkOutHours - checkInHours) * 60 + (checkOutMinutes - checkInMinutes)) * zoomLevel;

  return (
    <ItemContainer>
      <TimelineBar>
        <DurationBar
          style={{
            left: `${checkInPosition}px`,
            width: `${duration}px`,
          }}
        />
        <TimeDot style={{ left: `${checkInPosition}px` }}>
          <TimeLabel>{member.checkIn}</TimeLabel>
        </TimeDot>
        <TimeDot style={{ left: `${checkInPosition + duration}px` }}>
          <TimeLabel>{member.checkOut}</TimeLabel>
        </TimeDot>
      </TimelineBar>
    </ItemContainer>
  );
};

export default TimelineItem; 