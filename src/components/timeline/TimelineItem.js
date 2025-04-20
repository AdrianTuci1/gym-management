import React from 'react';
import { Box, styled } from '@mui/material';

const ItemContainer = styled(Box)({
  position: 'relative',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const TimelineBar = styled(Box)({
  height: '44px',
  backgroundColor: '#e6ecef',
  borderRadius: '4px',
  position: 'relative',
  overflow: 'visible',
  width: '100%',
});

const DurationBar = styled(Box)({
  position: 'absolute',
  top: '2px',
  height: '40px',
  backgroundColor: 'rgba(25, 118, 210, 0.1)',
  borderLeft: '2px solid #1976d2',
  borderRight: '2px solid #1976d2',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
  },
});

const TimeDot = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '#1976d2',
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
  padding: '2px 4px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
});

const TimelineItem = ({ member, zoomLevel, timeRange }) => {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getPosition = (time) => {
    const minutes = parseTime(time);
    const startMinutes = timeRange.start * 60;
    return (minutes - startMinutes) * zoomLevel;
  };

  const getWidth = () => {
    const startMinutes = parseTime(member.checkIn);
    const endMinutes = parseTime(member.checkOut);
    return (endMinutes - startMinutes) * zoomLevel;
  };

  return (
    <ItemContainer>
      <TimelineBar>
        <DurationBar
          style={{
            left: `${getPosition(member.checkIn)}px`,
            width: `${getWidth()}px`,
          }}
        >
          <TimeDot style={{ left: '0' }}>
            <TimeLabel>{member.checkIn}</TimeLabel>
          </TimeDot>
          <TimeDot style={{ right: '0' }}>
            <TimeLabel>{member.checkOut}</TimeLabel>
          </TimeDot>
        </DurationBar>
      </TimelineBar>
    </ItemContainer>
  );
};

export default TimelineItem; 