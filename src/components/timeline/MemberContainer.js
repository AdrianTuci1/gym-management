import React from 'react';
import { Box, Typography, Avatar, styled, Tooltip } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DiamondIcon from '@mui/icons-material/Diamond';
import ShieldIcon from '@mui/icons-material/Shield';
import HandymanIcon from '@mui/icons-material/Handyman';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MemberRow from './MemberRow';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#f8f9fa',
  height: '60px',
  width: '100%',
  transition: 'all 0.2s ease',
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
  maxWidth: '90px',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: 1,
  minWidth: 0,
});

const SubscriptionInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const subscriptionIcons = {
  gold: <MilitaryTechIcon sx={{ color: 'gold', fontSize: '16px', flexShrink: 0 }} />,
  silver: <DiamondIcon sx={{ color: '#b0c4de', fontSize: '16px', flexShrink: 0 }} />,
  black: <ShieldIcon sx={{ color: '#333', fontSize: '16px', flexShrink: 0 }} />,
  service: <HandymanIcon sx={{ color: '#8b5cf6', fontSize: '16px', flexShrink: 0 }} />,
  none: <ConfirmationNumberIcon sx={{ color: '#757575', fontSize: '16px', flexShrink: 0 }} />,
};

const subscriptionLabels = {
  gold: 'Gold',
  silver: 'Silver',
  black: 'Black',
  service: 'Serviciu',
  none: 'Day Pass',
};

const MemberContainer = ({ member }) => {
  const subscriptionType = member.subscription?.type || 'none';
  const Icon = subscriptionIcons[subscriptionType];
  const label = subscriptionLabels[subscriptionType];

  return (
    <MemberRow member={member}>
      <Container>
        <Avatar 
          sx={{ 
            width: 36, 
            height: 36, 
            mr: 1.5,
            flexShrink: 0,
            backgroundColor: subscriptionType === 'gold' ? 'gold' : 
                            subscriptionType === 'silver' ? '#b0c4de' :
                            subscriptionType === 'black' ? '#333' :
                            subscriptionType === 'service' ? '#8b5cf6' : '#757575'
          }}
        >
          {member.avatar}
        </Avatar>
        <InfoContainer>
          <MemberName>{member.name}</MemberName>
          <Tooltip title={`Tip abonament: ${label}`}>
            <SubscriptionInfo>
              {Icon}
              {label}
            </SubscriptionInfo>
          </Tooltip>
        </InfoContainer>
      </Container>
    </MemberRow>
  );
};

export default MemberContainer; 