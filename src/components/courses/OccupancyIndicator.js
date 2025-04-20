import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const IndicatorContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
});

const IndicatorItem = styled(Box)(({ status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: status === 'low' ? '#e8f5e9' : 
                  status === 'medium' ? '#fff3e0' : 
                  '#ffebee',
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
});

const OccupancyIndicator = ({ occupancy }) => {
  const getStatus = (current, total) => {
    const percentage = (current / total) * 100;
    if (percentage < 30) return 'low';
    if (percentage < 70) return 'medium';
    return 'high';
  };

  return (
    <IndicatorContainer>
      <IndicatorItem status={getStatus(occupancy.gym.current, occupancy.gym.total)}>
        <IconWrapper>
          <FitnessCenterIcon />
        </IconWrapper>
        <Box>
          <Typography variant="subtitle2">Sala de Fitness</Typography>
          <Typography variant="body2" color="text.secondary">
            {occupancy.gym.current}/{occupancy.gym.total} locuri
          </Typography>
        </Box>
      </IndicatorItem>

      <IndicatorItem status={getStatus(occupancy.pool.current, occupancy.pool.total)}>
        <IconWrapper>
          <PoolIcon />
        </IconWrapper>
        <Box>
          <Typography variant="subtitle2">Piscină</Typography>
          <Typography variant="body2" color="text.secondary">
            {occupancy.pool.current}/{occupancy.pool.total} locuri
          </Typography>
        </Box>
      </IndicatorItem>

      <IndicatorItem status={getStatus(occupancy.aerobic.current, occupancy.aerobic.total)}>
        <IconWrapper>
          <SelfImprovementIcon />
        </IconWrapper>
        <Box>
          <Typography variant="subtitle2">Sala de Aerobic</Typography>
          <Typography variant="body2" color="text.secondary">
            {occupancy.aerobic.current}/{occupancy.aerobic.total} locuri
          </Typography>
        </Box>
      </IndicatorItem>
    </IndicatorContainer>
  );
};

export default OccupancyIndicator; 