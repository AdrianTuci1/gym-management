import React, { useState } from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import HistoryView from './History/HistoryView';

const HistoryContainer = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  boxSizing: 'border-box',
});

const History = () => {
  return (
    <HistoryContainer>
      <HistoryView />
    </HistoryContainer>
  );
};

export default History; 