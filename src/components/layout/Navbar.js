import React from 'react';
import { AppBar, Toolbar, IconButton, styled } from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: '#1a1a1a',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const LogoIcon = styled(FitnessCenterIcon)({
  fontSize: '2rem',
  marginRight: '16px',
});

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoIcon />
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 