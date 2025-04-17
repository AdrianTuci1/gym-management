import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, styled, IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelineItem from './TimelineItem';

const TimelineContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden',
});

const TimelineHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  borderBottom: '1px solid #e0e0e0',
});

const ScrollContainer = styled(Box)({
  flex: 1,
  overflow: 'auto',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '3px',
  },
});

const TimelineContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});

const TimeIndicators = styled(Box)({
  display: 'flex',
  padding: '8px 0',
  borderBottom: '1px solid #e0e0e0',
  position: 'sticky',
  top: 0,
  backgroundColor: '#ffffff',
  zIndex: 1,
  height: '40px',
  marginLeft: '200px',
});

const TimeIndicator = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '60px',
  '&:not(:last-child)': {
    borderRight: '1px solid #e0e0e0',
  },
});

const TimeLabel = styled(Typography)({
  fontSize: '12px',
  color: '#666',
});

const TimeLine = styled(Box)({
  width: '1px',
  height: '8px',
  backgroundColor: '#666',
  marginTop: '4px',
});

const ContentRow = styled(Box)({
  display: 'flex',
  flex: 1,
});

const NamesColumn = styled(Box)({
  width: '200px',
  padding: '16px',
  borderRight: '1px solid #e0e0e0',
  backgroundColor: '#f8f9fa',
  position: 'sticky',
  left: 0,
  zIndex: 2,
});

const TimelineColumn = styled(Box)({
  flex: 1,
  padding: '16px',
});

const MemberContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  position: 'relative',
  height: '40px',
  '&:hover': {
    backgroundColor: '#e9ecef',
  },
});

const MemberName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '120px',
});

const MemberStatus = styled(Typography)({
  fontSize: '12px',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '120px',
});

const ZoomControls = styled(Box)({
  display: 'flex',
  gap: '8px',
});

const CurrentTimeIndicator = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: '#ff0000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-4px',
    width: '10px',
    height: '10px',
    backgroundColor: '#ff0000',
    borderRadius: '50%',
  },
});

const mockMembers = [
  {
    id: 1,
    name: 'Ion Popescu',
    checkIn: '08:30',
    checkOut: '10:15',
    status: 'active',
    avatar: 'IP',
  },
  {
    id: 2,
    name: 'Maria Ionescu',
    checkIn: '09:15',
    checkOut: '11:30',
    status: 'active',
    avatar: 'MI',
  },
  {
    id: 3,
    name: 'Alexandru Dumitrescu',
    checkIn: '10:00',
    checkOut: '12:45',
    status: 'active',
    avatar: 'AD',
  },
  {
    id: 4,
    name: 'Elena Stoica',
    checkIn: '11:30',
    checkOut: '13:15',
    status: 'active',
    avatar: 'ES',
  },
  {
    id: 5,
    name: 'Mihai Ionescu',
    checkIn: '13:00',
    checkOut: '15:30',
    status: 'active',
    avatar: 'MI',
  },
  {
    id: 6,
    name: 'Ana Popescu',
    checkIn: '14:15',
    checkOut: '16:45',
    status: 'active',
    avatar: 'AP',
  },
  {
    id: 7,
    name: 'George Dumitru',
    checkIn: '15:30',
    checkOut: '17:15',
    status: 'active',
    avatar: 'GD',
  },
  {
    id: 8,
    name: 'Laura Ionescu',
    checkIn: '16:00',
    checkOut: '18:30',
    status: 'active',
    avatar: 'LI',
  },
];

const Timeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const totalMinutes = (hours - 8) * 60 + minutes;
    return totalMinutes * zoomLevel;
  };

  return (
    <TimelineContainer>
      <TimelineHeader>
        <Typography variant="h6">Prezență în sală</Typography>
        <ZoomControls>
          <IconButton onClick={handleZoomOut} size="small">
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={handleZoomIn} size="small">
            <AddIcon />
          </IconButton>
        </ZoomControls>
      </TimelineHeader>
      <ScrollContainer>
        <TimelineContent>
          <TimeIndicators>
            {Array.from({ length: 13 }, (_, i) => {
              const hour = i + 8;
              return (
                <TimeIndicator key={hour} style={{ width: `${60 * zoomLevel}px` }}>
                  <TimeLabel>{hour}:00</TimeLabel>
                  <TimeLine />
                </TimeIndicator>
              );
            })}
          </TimeIndicators>
          <ContentRow>
            <NamesColumn>
              {mockMembers.map((member) => (
                <MemberContainer key={member.id}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{member.avatar}</Avatar>
                  <Box>
                    <MemberName>{member.name}</MemberName>
                    <MemberStatus>Membru activ</MemberStatus>
                  </Box>
                </MemberContainer>
              ))}
            </NamesColumn>
            <TimelineColumn>
              <Box sx={{ position: 'relative' }}>
                <CurrentTimeIndicator
                  style={{
                    left: `${getCurrentTimePosition()}px`,
                  }}
                />
                {mockMembers.map((member) => (
                  <TimelineItem key={member.id} member={member} zoomLevel={zoomLevel} />
                ))}
              </Box>
            </TimelineColumn>
          </ContentRow>
        </TimelineContent>
      </ScrollContainer>
    </TimelineContainer>
  );
};

export default Timeline; 