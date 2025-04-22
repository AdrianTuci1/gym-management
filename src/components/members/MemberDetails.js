import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  styled, 
  Paper,
  Avatar,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DiamondIcon from '@mui/icons-material/Diamond';
import ShieldIcon from '@mui/icons-material/Shield';
import HandymanIcon from '@mui/icons-material/Handyman';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import useTimelineStore from '../../store/timelineStore';

const DetailsContainer = styled(Paper)(({ theme }) => ({
  padding: '24px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  height: '100%',
  position: 'relative',
  overflow: 'auto',
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: 'inherit',
});

const HeaderSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
});

const InfoSection = styled(Box)({
  marginBottom: '24px',
});

const CalendarSection = styled(Box)({
  marginTop: '24px',
});

const CalendarGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
  marginTop: '16px',
});

const CalendarDay = styled(Box)(({ theme, isToday, hasAttendance }) => ({
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  backgroundColor: isToday 
    ? theme.palette.primary.main 
    : hasAttendance 
      ? theme.palette.success.light 
      : theme.palette.grey[100],
  color: isToday ? theme.palette.primary.contrastText : theme.palette.text.primary,
  fontWeight: isToday ? 'bold' : 'normal',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: isToday 
      ? theme.palette.primary.dark 
      : hasAttendance 
        ? theme.palette.success.main 
        : theme.palette.grey[200],
  },
}));

const PersonalInfoSection = styled(Box)({
  marginTop: '24px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const MealPlanSection = styled(Box)({
  marginTop: '24px',
  padding: '16px',
  backgroundColor: 'rgba(0,0,0,0.02)',
  borderRadius: '8px',
});

const WorkoutStats = styled(Box)({
  marginTop: '16px',
  padding: '12px',
  backgroundColor: 'rgba(0,0,0,0.02)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StatItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

const subscriptionIcons = {
  gold: <MilitaryTechIcon sx={{ color: 'gold' }} />,
  silver: <DiamondIcon sx={{ color: '#b0c4de' }} />,
  black: <ShieldIcon sx={{ color: '#333' }} />,
  service: <HandymanIcon sx={{ color: '#8b5cf6' }} />,
  none: <ConfirmationNumberIcon sx={{ color: '#757575' }} />,
};

const subscriptionLabels = {
  gold: 'Gold',
  silver: 'Silver',
  black: 'Black',
  service: 'Serviciu',
  none: 'Day Pass',
};

const MemberDetails = () => {
  const { selectedMember, setSelectedMember } = useTimelineStore();
  const [currentDate] = useState(new Date());

  const handleClose = useCallback(() => {
    setSelectedMember(null);
  }, [setSelectedMember]);

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  }, []);

  const { daysInMonth, startingDay } = useMemo(() => 
    getDaysInMonth(currentDate), 
    [currentDate, getDaysInMonth]
  );

  const days = useMemo(() => 
    Array.from({ length: 42 }, (_, i) => {
      const dayNumber = i - startingDay + 1;
      const isToday = dayNumber === currentDate.getDate();
      const hasAttendance = Math.random() > 0.5; // This should be replaced with actual attendance data
      
      return {
        dayNumber: dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : '',
        isToday,
        hasAttendance
      };
    }),
    [currentDate, daysInMonth, startingDay]
  );

  const subscriptionType = selectedMember?.subscription?.type || 'none';
  const Icon = subscriptionIcons[subscriptionType];
  const label = subscriptionLabels[subscriptionType];

  const calculateWorkoutDuration = useCallback((checkIn, checkOut) => {
    const [inHours, inMinutes] = checkIn.split(':').map(Number);
    const [outHours, outMinutes] = checkOut.split(':').map(Number);
    
    const inTotalMinutes = inHours * 60 + inMinutes;
    const outTotalMinutes = outHours * 60 + outMinutes;
    
    const durationMinutes = outTotalMinutes - inTotalMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return { hours, minutes };
  }, []);

  const workoutDuration = useMemo(() => {
    if (!selectedMember?.checkIn || !selectedMember?.checkOut) return null;
    return calculateWorkoutDuration(selectedMember.checkIn, selectedMember.checkOut);
  }, [selectedMember, calculateWorkoutDuration]);

  const headerSection = useMemo(() => (
    <HeaderSection>
      <Avatar 
        sx={{ 
          width: 48, 
          height: 48,
          backgroundColor: subscriptionType === 'gold' ? 'gold' : 
                          subscriptionType === 'silver' ? '#b0c4de' :
                          subscriptionType === 'black' ? '#333' :
                          subscriptionType === 'service' ? '#8b5cf6' : '#757575'
        }}
      >
        {selectedMember?.avatar}
      </Avatar>
      <Box>
        <Typography variant="h6" gutterBottom>
          {selectedMember?.name}
        </Typography>
        <Chip
          icon={Icon}
          label={label}
          size="small"
          sx={{
            backgroundColor: subscriptionType === 'gold' ? 'rgba(255, 215, 0, 0.1)' : 
                            subscriptionType === 'silver' ? 'rgba(176, 196, 222, 0.1)' :
                            subscriptionType === 'black' ? 'rgba(51, 51, 51, 0.1)' :
                            subscriptionType === 'service' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(117, 117, 117, 0.1)',
            color: subscriptionType === 'gold' ? 'gold' : 
                   subscriptionType === 'silver' ? '#b0c4de' :
                   subscriptionType === 'black' ? '#333' :
                   subscriptionType === 'service' ? '#8b5cf6' : '#757575'
          }}
        />
      </Box>
    </HeaderSection>
  ), [selectedMember, subscriptionType, Icon, label]);

  const infoSection = useMemo(() => (
    <InfoSection>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1">
            {selectedMember?.email}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Telefon
          </Typography>
          <Typography variant="body1">
            {selectedMember?.phone}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Check-in
          </Typography>
          <Typography variant="body1">
            {selectedMember?.checkIn}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Check-out
          </Typography>
          <Typography variant="body1">
            {selectedMember?.checkOut}
          </Typography>
        </Box>
      </Stack>
    </InfoSection>
  ), [selectedMember]);

  const calendarSection = useMemo(() => (
    <CalendarSection>
      <Typography variant="h6" gutterBottom>
        Prezențe {currentDate.toLocaleString('ro-RO', { month: 'long', year: 'numeric' })}
      </Typography>
      <CalendarGrid>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
          <Typography key={day} variant="caption" align="center" color="text.secondary">
            {day}
          </Typography>
        ))}
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            isToday={day.isToday}
            hasAttendance={day.hasAttendance}
          >
            {day.dayNumber}
          </CalendarDay>
        ))}
      </CalendarGrid>
      
      {workoutDuration && (
        <WorkoutStats>
          <StatItem>
            <Typography variant="subtitle2" color="text.secondary">
              Durata Medie
            </Typography>
            <Typography variant="h6">
              {workoutDuration.hours > 0 
                ? `${workoutDuration.hours}h ${workoutDuration.minutes}m`
                : `${workoutDuration.minutes}m`}
            </Typography>
          </StatItem>
          <StatItem>
            <Typography variant="subtitle2" color="text.secondary">
              Ore/Săptămână
            </Typography>
            <Typography variant="h6">
              {Math.round((workoutDuration.hours * 60 + workoutDuration.minutes) * 3 / 60)}h
            </Typography>
          </StatItem>
        </WorkoutStats>
      )}
    </CalendarSection>
  ), [currentDate, days, workoutDuration]);

  const personalInfoSection = useMemo(() => (
    <PersonalInfoSection>
      <Typography variant="h6" gutterBottom>
        Informații Personale
      </Typography>
      <Stack spacing={1}>
        <InfoRow>
          <Typography variant="body1" color="text.secondary">
            Vârstă
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            28 ani
          </Typography>
        </InfoRow>
        <InfoRow>
          <Typography variant="body1" color="text.secondary">
            Înălțime
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            175 cm
          </Typography>
        </InfoRow>
        <InfoRow>
          <Typography variant="body1" color="text.secondary">
            Greutate
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            75 kg
          </Typography>
        </InfoRow>
      </Stack>
    </PersonalInfoSection>
  ), []);

  const mealPlanSection = useMemo(() => (
    <MealPlanSection>
      <Typography variant="h6" gutterBottom>
        Plan Alimentar Recomandat
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Planul alimentar va fi disponibil în curând. Vom analiza obiectivele tale și vom creă un plan personalizat pentru a-ți atinge rezultatele dorite.
      </Typography>
    </MealPlanSection>
  ), []);

  if (!selectedMember) return null;

  return (
    <DetailsContainer>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
      
      {headerSection}
      {infoSection}
      <Divider />
      {calendarSection}
      <Divider />
      {personalInfoSection}
      <Divider />
      {mealPlanSection}
    </DetailsContainer>
  );
};

export default React.memo(MemberDetails); 