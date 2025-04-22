import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, styled, Avatar } from '@mui/material';
import TimelineItem from './TimelineItem';
import MemberContainer from './MemberContainer';
import useTimelineStore from '../../store/timelineStore';
import { mockMembers } from '../../data/mockData';

const TimelineContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden',
});

const ScrollContainer = styled(Box)({
  flex: 1,
  overflow: 'auto',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '3px',
  },
});

const TimelineContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
});

const TimeIndicators = styled(Box)({
  display: 'flex',
  padding: '8px 0',
  borderBottom: '1px solid #e0e0e0',
  position: 'sticky',
  top: 0,
  backgroundColor: '#ffffff',
  zIndex: 2,
  height: '40px',
  paddingLeft: '160px',
});

const TimeIndicator = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
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
  position: 'relative',
});

const NamesColumn = styled(Box)({
  width: '200px',
  backgroundColor: '#f8f9fa',
  position: 'sticky',
  left: 0,
  zIndex: 2,
  borderRight: '1px solid #e0e0e0',
});

const TimelineColumn = styled(Box)({
  flex: 1,
  position: 'relative',
});

const NoDataMessage = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: '#666',
  fontSize: '16px',
  fontStyle: 'italic',
  width: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const MemberRow = styled(Box)({
  display: 'flex',
  height: '60px', // Increased height to match MemberContainer
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
});

const CurrentTimeIndicator = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: '#ff0000',
  zIndex: 3,
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

const Timeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { zoomLevel, setZoomLevel, showFullDay } = useTimelineStore();
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Add resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth - 200;
        const timeRange = getTimeRangeForItems();
        const totalMinutes = (timeRange.end - timeRange.start) * 60;
        const requiredZoom = Math.max(containerWidth / totalMinutes, 1);
        setZoomLevel(requiredZoom);
      }
    });

    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [showFullDay]);

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getVisibleMembers = () => {
    if (showFullDay) {
      return mockMembers;
    }

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    return mockMembers.filter(member => {
      const checkInMinutes = parseTime(member.checkIn);
      const checkOutMinutes = parseTime(member.checkOut);
      return checkInMinutes <= currentTotalMinutes && checkOutMinutes >= currentTotalMinutes;
    });
  };

  const getTimeRange = () => {
    const currentHour = currentTime.getHours();
    
    if (showFullDay) {
      return Array.from({ length: 24 }, (_, i) => i);
    }

    const visibleMembers = getVisibleMembers();
    if (visibleMembers.length === 0) {
      const startHour = Math.max(0, currentHour - 3);
      const endHour = Math.min(24, currentHour + 3);
      return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
    }

    const checkInHours = visibleMembers.map(m => parseInt(m.checkIn.split(':')[0]));
    const checkOutHours = visibleMembers.map(m => parseInt(m.checkOut.split(':')[0]));
    
    const startHour = Math.max(0, Math.min(...checkInHours) - 1);
    const endHour = Math.min(24, Math.max(...checkOutHours) + 1);
    
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  };

  const getTimeRangeForItems = () => {
    const currentHour = currentTime.getHours();
    
    if (showFullDay) {
      return { start: 0, end: 24 };
    }

    const visibleMembers = getVisibleMembers();
    if (visibleMembers.length === 0) {
      return {
        start: Math.max(0, currentHour - 3),
        end: Math.min(24, currentHour + 3)
      };
    }

    const checkInHours = visibleMembers.map(m => parseInt(m.checkIn.split(':')[0]));
    const checkOutHours = visibleMembers.map(m => parseInt(m.checkOut.split(':')[0]));

    return {
      start: Math.max(0, Math.min(...checkInHours) - 1),
      end: Math.min(24, Math.max(...checkOutHours) + 1)
    };
  };

  // Center the current time in view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const timeRange = getTimeRangeForItems();
      const totalMinutes = (timeRange.end - timeRange.start) * 60;
      const currentMinutes = (currentTime.getHours() - timeRange.start) * 60 + currentTime.getMinutes();
      const scrollPercentage = currentMinutes / totalMinutes;
      
      const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const targetScroll = scrollWidth * scrollPercentage;
      
      scrollContainerRef.current.scrollLeft = targetScroll - (scrollContainerRef.current.clientWidth / 2);
    }
  }, [currentTime, zoomLevel, showFullDay]);

  const handleScroll = (e) => {
    // Optional: Add scroll handling logic if needed
  };

  const timeRange = getTimeRangeForItems();
  const totalMinutes = (timeRange.end - timeRange.start) * 60;
  const totalWidth = totalMinutes * zoomLevel;
  const visibleMembers = getVisibleMembers();

  return (
    <TimelineContainer>
      {visibleMembers.length > 0 ? (
        <>
          <ScrollContainer 
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <TimelineContent>
              <TimeIndicators>
                <Box style={{ display: 'flex', width: `${totalWidth}px` }}>
                  {getTimeRange().map((hour) => (
                    <TimeIndicator 
                      key={hour} 
                      style={{ 
                        width: `${60 * zoomLevel}px`,
                      }}
                    >
                      <TimeLabel>{hour}:00</TimeLabel>
                      <TimeLine />
                    </TimeIndicator>
                  ))}
                </Box>
              </TimeIndicators>
              <ContentRow>
                <NamesColumn>
                  {visibleMembers.map((member) => (
                    <MemberRow key={member.id}>
                      <MemberContainer member={member} />
                    </MemberRow>
                  ))}
                </NamesColumn>
                <TimelineColumn>
                  <Box style={{ position: 'relative', width: `${totalWidth}px` }}>
                    <CurrentTimeIndicator
                      style={{
                        left: `${((currentTime.getHours() - timeRange.start) * 60 + currentTime.getMinutes()) * zoomLevel}px`,
                      }}
                    />
                    {visibleMembers.map((member) => (
                      <MemberRow key={member.id}>
                        <TimelineItem 
                          member={member} 
                          zoomLevel={zoomLevel}
                          timeRange={timeRange}
                        />
                      </MemberRow>
                    ))}
                  </Box>
                </TimelineColumn>
              </ContentRow>
            </TimelineContent>
          </ScrollContainer>
        </>
      ) : (
        <NoDataMessage>Nu există date disponibile</NoDataMessage>
      )}
    </TimelineContainer>
  );
};

export default Timeline; 