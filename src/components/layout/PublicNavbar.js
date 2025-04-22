import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Divider, 
  styled,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import {
  Home as HomeIcon,
  CardMembership as PackagesIcon,
  Handyman as ServicesIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: '#1a1a1a',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const NavButton = styled(Button)({
  color: '#1a1a1a',
  textTransform: 'none',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const NavIcon = styled(IconButton)({
  color: '#1a1a1a',
  margin: '0 4px',
});

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLoggedIn = true; // TODO: Replace with actual auth state
  const isAdmin = true; // TODO: Replace with actual role check

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <NavButton
            startIcon={<HomeIcon />}
            onClick={() => handleNavigation('/')}
          >
            Home
          </NavButton>
          <NavButton
            startIcon={<PackagesIcon />}
            onClick={() => handleNavigation('/packages')}
          >
            Packages
          </NavButton>
          <NavButton
            startIcon={<ServicesIcon />}
            onClick={() => handleNavigation('/services')}
          >
            Services
          </NavButton>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        {isLoggedIn ? (
          <>
            {isAdmin && (
              <NavButton
                startIcon={<DashboardIcon />}
                onClick={() => handleNavigation('/dashboard')}
              >
                Dashboard
              </NavButton>
            )}
            <NavIcon onClick={handleMenuOpen}>
              <PersonIcon />
            </NavIcon>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigation('/settings')}>
                <SettingsIcon sx={{ mr: 1 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/logout')}>
                <Typography color="error">Logout</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavButton
            startIcon={<PersonIcon />}
            onClick={() => handleNavigation('/login')}
          >
            Login
          </NavButton>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default PublicNavbar; 