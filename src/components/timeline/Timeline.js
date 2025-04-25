import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  styled, 
  Avatar, 
  Card, 
  CardContent,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Pool as PoolIcon,
  FitnessCenter as FitnessCenterIcon,
  SportsGymnastics as AerobicIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon
} from '@mui/icons-material';
import useTimelineStore from '../../store/timelineStore';
import { mockMembers } from '../../data/mockData';

const TimelineContainer = styled(Box)({
  padding: '24px',
  background: 'linear-gradient(135deg,rgb(105, 219, 173) 0%,rgb(116, 176, 237) 100%)',
  minHeight: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const OccupancyTimeline = styled(Box)({
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '32px',
});

const TimelineHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '24px',
});

const TimelineGridContainer = styled(Box)({
  borderRadius: '12px',
  padding: '16px',
  position: 'relative',
});

const TimelineGrid = styled(Box)({
  display: 'flex',
  alignItems: 'stretch',
  height: '50px',
  gap: '4px',
  marginTop: '16px',
  marginBottom: '8px',
  position: 'relative',
  borderRadius:'12px',
  outline: '1px solid red',
});

const TimelineBar = styled(Box)(({ occupancy, isFuture }) => ({
  flex: 1,
  height: '100%',
  backgroundColor: getOccupancyColor(occupancy),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  opacity: isFuture ? 0.4 : 0.8,
  boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    opacity: isFuture ? 0.6 : 1,
    transform: 'scaleY(1.02)',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
}));

const CurrentTimeMarker = styled(Box)({
  position: 'absolute',
  top: '-10px',
  bottom: '-10px',
  width: '2px',
  backgroundColor: '#2196f3',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -6,
    left: -4,
    width: '10px',
    height: '10px',
    backgroundColor: '#2196f3',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(33, 150, 243, 0.4)',
  },
  '&::after': {
    content: 'attr(data-time)',
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
    color: '#666',
    whiteSpace: 'nowrap',
  },
});


const LegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const LegendColor = styled(Box)(({ color }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '4px',
  backgroundColor: color,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const MemberCard = styled(Card)({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  marginBottom: '12px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
    backgroundSize: '4px 4px',
    pointerEvents: 'none',
    opacity: 0.5,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const MemberCardContent = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px !important',
  background: 'rgba(255, 255, 255, 0.15)',
  position: 'relative',
  zIndex: 1,
});

const MemberAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  marginRight: '12px',
});

const MemberInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: '0 0 250px',
  gap: '12px',
  '& .MuiTypography-h6': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '180px',
  },
  '& .subscription-text': {
    fontSize: '0.75rem',
    color: '#666',
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
});

const MemberDetails = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
});

const LocationChip = styled(Box)(({ type }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: type === 'gym' ? '#e3f2fd' : type === 'pool' ? '#e0f7fa' : '#f3e5f5',
  color: type === 'gym' ? '#1565c0' : type === 'pool' ? '#00838f' : '#7b1fa2',
  fontWeight: 500,
  width: '140px',
  justifyContent: 'center',
}));

const DurationChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  color: '#1a1a1a',
  fontWeight: 500,
  width: '140px',
  justifyContent: 'center',
});

const SubscriptionChip = styled(Box)(({ subtype }) => {
  const colors = {
    gold: {
      bg: '#fff8e1',
      color: '#ff8f00',
      icon: <StarIcon style={{ color: '#ff8f00' }} />
    },
    black: {
      bg: '#212121',
      color: '#ffffff',
      icon: <StarIcon style={{ color: '#ffffff' }} />
    },
    silver: {
      bg: '#f5f5f5',
      color: '#757575',
      icon: <StarIcon style={{ color: '#757575' }} />
    },
    service: {
      bg: '#e8f5e9',
      color: '#2e7d32',
      icon: <StarIcon style={{ color: '#2e7d32' }} />
    },
    none: {
      bg: '#f5f5f5',
      color: '#9e9e9e',
      icon: null
    }
  };

  return {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: colors[subtype]?.bg || colors.none.bg,
    color: colors[subtype]?.color || colors.none.color,
    fontWeight: 500,
    fontSize: '0.875rem',
    width: '140px',
    justifyContent: 'center',
  };
});

const VerticalDivider = styled(Divider)({
  height: '24px',
  margin: '0 12px',
});

function getOccupancyColor(percentage) {
  if (percentage < 30) return '#4caf50';  // Verde pentru ocupare scăzută
  if (percentage < 60) return '#ff9800';  // Portocaliu pentru ocupare medie
  return '#f44336';  // Roșu pentru ocupare ridicată
}

const Timeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { showFullDay } = useTimelineStore();
  const [activeMembers, setActiveMembers] = useState([]);
  const [hourlyOccupancy, setHourlyOccupancy] = useState([]);

  const calculateDuration = (checkIn, checkOut) => {
    const now = new Date();
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);
    
    const checkInTime = new Date();
    checkInTime.setHours(checkInHours, checkInMinutes, 0);
    
    const checkOutTime = new Date();
    checkOutTime.setHours(checkOutHours, checkOutMinutes, 0);
    
    // Dacă ora de check-out este în ziua următoare
    if (checkOutTime < checkInTime) {
      checkOutTime.setDate(checkOutTime.getDate() + 1);
    }
    
    // Dacă membru este încă în sală
    if (now < checkOutTime && now > checkInTime) {
      const duration = Math.floor((now - checkInTime) / (1000 * 60));
      const remaining = Math.floor((checkOutTime - now) / (1000 * 60));
      return {
        spent: `${Math.floor(duration / 60)}h ${duration % 60}m`,
        remaining: `${Math.floor(remaining / 60)}h ${remaining % 60}m`
      };
    }
    
    // Dacă membru a plecat
    const duration = Math.floor((checkOutTime - checkInTime) / (1000 * 60));
    return {
      spent: `${Math.floor(duration / 60)}h ${duration % 60}m`,
      remaining: null
    };
  };

  const getLocationIcon = (location) => {
    switch (location) {
      case 'gym':
        return <FitnessCenterIcon />;
      case 'pool':
        return <PoolIcon />;
      case 'aerobic':
        return <AerobicIcon />;
      default:
        return <FitnessCenterIcon />;
    }
  };

  const formatSubscriptionLabel = (subscription) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return `${capitalize(subscription.type)}`;
  };

  const calculateHourlyOccupancy = () => {
    const hourly = Array(24).fill(0);
    const maxCapacity = 50; // Capacitatea maximă presupusă a sălii

    mockMembers.forEach(member => {
      const checkIn = parseInt(member.checkIn.split(':')[0]);
      const checkOut = parseInt(member.checkOut.split(':')[0]);
      
      for (let hour = checkIn; hour <= checkOut; hour++) {
        hourly[hour]++;
      }
    });

    return hourly.map(count => (count / maxCapacity) * 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculează ocuparea pe ore
    const occupancy = calculateHourlyOccupancy();
    setHourlyOccupancy(occupancy);

    // Filtrează membrii activi
    const locations = ['gym', 'pool', 'aerobic'];
    const currentHour = currentTime.getHours();
    const active = mockMembers
      .filter(member => {
        const checkIn = parseInt(member.checkIn.split(':')[0]);
        const checkOut = parseInt(member.checkOut.split(':')[0]);
        return showFullDay || (checkIn <= currentHour && checkOut >= currentHour);
      })
      .map(member => ({
        ...member,
        location: locations[Math.floor(Math.random() * locations.length)],
      }));
    
    setActiveMembers(active);
  }, [showFullDay, currentTime]);

  return (
    <TimelineContainer>
      <OccupancyTimeline>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Gradul de Ocupare
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LegendItem>
              <LegendColor color="#4caf50" />
              <Typography variant="body2">Sub 30%</Typography>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#ff9800" />
              <Typography variant="body2">30-60%</Typography>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#f44336" />
              <Typography variant="body2">Peste 60%</Typography>
            </LegendItem>
          </Box>
        </Box>
        <TimelineGridContainer>
          <TimelineGrid>
            {hourlyOccupancy.map((occupancy, hour) => {
              const isFuture = hour > currentTime.getHours() || 
                             (hour === currentTime.getHours() && currentTime.getMinutes() > 0);
              return (
                <Tooltip 
                  key={hour} 
                  title={`${Math.round(occupancy)}% ocupare la ora ${hour}:00`}
                  placement="top"
                >
                  <TimelineBar 
                    occupancy={occupancy} 
                    isFuture={isFuture}
                  />
                </Tooltip>
              );
            })}
            <CurrentTimeMarker 
              style={{ 
                left: `${(currentTime.getHours() * 60 + currentTime.getMinutes()) / 1440 * 100}%` 
              }}
              data-time={`${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`}
            />
          </TimelineGrid>
        </TimelineGridContainer>
      </OccupancyTimeline>

      {activeMembers.map((member) => (
        <MemberCard key={member.id}>
          <MemberCardContent>
            <MemberInfo>
              <MemberAvatar src={member.avatar} alt={member.name}>
                {member.avatar}
              </MemberAvatar>
              <Box>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography className="subscription-text">
                  {member.subscription.type !== 'none' && <StarIcon fontSize="small" />}
                  {formatSubscriptionLabel(member.subscription)}
                </Typography>
              </Box>
            </MemberInfo>

            <MemberDetails>
              <LocationChip
                component="div"
                type={member.location}
              >
                {getLocationIcon(member.location)}
                {member.location === 'gym' ? 'Sala de Forță' : 
                 member.location === 'pool' ? 'Piscină' : 'Aerobic'}
              </LocationChip>
              <VerticalDivider orientation="vertical" />
              <DurationChip
                component="div"
              >
                <AccessTimeIcon />
                {calculateDuration(member.checkIn, member.checkOut).spent}
                {calculateDuration(member.checkIn, member.checkOut).remaining && 
                  ` (${calculateDuration(member.checkIn, member.checkOut).remaining} rămași)`}
              </DurationChip>
              <Box flex={1} />
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </MemberDetails>
          </MemberCardContent>
        </MemberCard>
      ))}
    </TimelineContainer>
  );
};

export default Timeline; 