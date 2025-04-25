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
  justifyContent: 'center',
  padding: '16px 8px',
  backgroundColor: 'transparent',
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
              color: activeItem === index ? 'white' : 'rgba(26, 26, 26, 0.7)',
              marginBottom: '16px',
              backgroundColor: activeItem === index ? '#1a1a1a' : 'transparent',
              borderRadius: '24px',
              '&:hover': {
                backgroundColor: activeItem === index ? '#1a1a1a' : 'rgba(0, 0, 0, 0.04)',
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