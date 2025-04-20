import React from 'react';
import { Box, styled, IconButton, Switch, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useTimelineStore from '../../store/timelineStore';

const MenuSection = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

const NavigationMenu = styled(Box)({
  display: 'flex',
  gap: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000,
  border: '1px solid rgba(0, 0, 0, 0.05)',
  margin: '8px 0',
  paddingLeft: '16px',
});

const NavIcon = styled(IconButton)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
  width: '48px',
  height: '48px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    transform: 'translateY(-2px)',
  },
  '&.active': {
    color: '#1a1a1a',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    '& svg': {
      transform: 'scale(1.1)',
    },
  },
  '& svg': {
    transition: 'transform 0.2s ease',
  },
});

const TimelineControls = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '16px',
  padding: '8px',
  borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
});

const SwitchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const NavigationMenuComponent = ({ activeMenu, setActiveMenu }) => {
  const { 
    zoomLevel, 
    setZoomLevel, 
    showFullDay, 
    setShowFullDay,
    autoDisconnect,
    setAutoDisconnect 
  } = useTimelineStore();

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };

  return (
    <MenuSection>
      <NavigationMenu>
        <NavIcon 
          className={activeMenu === 'timeline' ? 'active' : ''}
          onClick={() => setActiveMenu('timeline')}
        >
          <TimelineIcon />
        </NavIcon>
        <NavIcon 
          className={activeMenu === 'sales' ? 'active' : ''}
          onClick={() => setActiveMenu('sales')}
        >
          <AttachMoneyIcon />
        </NavIcon>
        <NavIcon 
          className={activeMenu === 'add' ? 'active' : ''}
          onClick={() => setActiveMenu('add')}
        >
          <PersonAddIcon />
        </NavIcon>

        {activeMenu === 'timeline' && (
          <TimelineControls>
            <IconButton onClick={handleZoomOut} size="small">
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleZoomIn} size="small">
              <AddIcon />
            </IconButton>
            <SwitchContainer>
              <Switch
                checked={showFullDay}
                onChange={(e) => setShowFullDay(e.target.checked)}
                size="small"
              />
              <Typography variant="body2">
                {showFullDay ? 'Toată ziua' : 'Prezenți'}
              </Typography>
            </SwitchContainer>
            <SwitchContainer>
              <Switch
                checked={autoDisconnect}
                onChange={(e) => setAutoDisconnect(e.target.checked)}
                size="small"
              />
              <Typography variant="body2">
                Deconectare automată
              </Typography>
            </SwitchContainer>
          </TimelineControls>
        )}
      </NavigationMenu>
    </MenuSection>
  );
};

export default NavigationMenuComponent; 