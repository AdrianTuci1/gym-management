import React, { useState } from 'react';
import { Box, IconButton, styled, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AutoAwesome as AutomationIcon,
  History as HistoryIcon,
  CardMembership as PackagesIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const StyledSidebar = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 8px',
  backgroundColor: '#1a1a1a',
  height: 'calc(100vh - 64px)', // Subtract navbar height
  position: 'fixed',
  left: 0,
  top: 64, // Navbar height
  width: '64px',
  zIndex: 1000,
});

const menuItems = [
  { icon: <DashboardIcon />, tooltip: 'Meniu Principal', component: 'dashboard' },
  { icon: <AutomationIcon />, tooltip: 'Automatizări', component: 'automation' },
  { icon: <HistoryIcon />, tooltip: 'Istoric', component: 'history' },
  { icon: <PackagesIcon />, tooltip: 'Pachete', component: 'packages' },
  { icon: <SettingsIcon />, tooltip: 'Setări', component: 'settings' },
];

const Sidebar = ({ onMenuChange }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
    onMenuChange(menuItems[index].component);
  };

  return (
    <StyledSidebar>
      {menuItems.map((item, index) => (
        <Tooltip key={index} title={item.tooltip} placement="right">
          <IconButton
            onClick={() => handleItemClick(index)}
            sx={{
              color: activeItem === index ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
              marginBottom: '16px',
              backgroundColor: activeItem === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </StyledSidebar>
  );
};

export default Sidebar; 