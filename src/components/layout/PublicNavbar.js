import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Divider, 
  styled,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FitnessCenter as GymIcon,
  CardMembership as MembershipIcon,
  SelfImprovement as WellnessIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Home
} from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

const NavContainer = styled(Box)({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: '12px',
  maxWidth: '50%',
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
});

const NavButton = styled(Button)(({ theme, isActive }) => ({
  color: isActive ? theme.palette.primary.main : '#1a1a1a',
  textTransform: 'none',
  margin: '0 8px',
  minWidth: 'auto',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiButton-startIcon': {
    marginRight: isActive ? '8px' : '0',
  },
  [theme.breakpoints.down('lg')]: {
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
    '& .MuiButton-label': {
      display: 'none',
    },
    padding: '8px',
  },
}));

const NavIcon = styled(IconButton)({
  color: '#1a1a1a',
  margin: '0 4px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useAuthStore(state => state.user);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const switchDemoUser = useAuthStore(state => state.switchDemoUser);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      handleMenuClose();
      navigate('/');
    } else {
      navigate(path);
      handleMenuClose();
    }
  };

  const handleLogin = async () => {
    await login();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NavButton
          startIcon={<Home />}
          onClick={() => handleNavigation('/')}
          isActive={isActive('/')}
        >
          {isLargeScreen && isActive('/') ? 'Acasa' : ''}
        </NavButton>
        <NavButton
          startIcon={<MembershipIcon />}
          onClick={() => handleNavigation('/packages')}
          isActive={isActive('/packages')}
        >
          {isLargeScreen && isActive('/packages') ? 'Abonamente' : ''}
        </NavButton>
        <NavButton
          startIcon={<WellnessIcon />}
          onClick={() => handleNavigation('/services')}
          isActive={isActive('/services')}
        >
          {isLargeScreen && isActive('/services') ? 'Wellness' : ''}
        </NavButton>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      {user ? (
        <>
          {user.accessLevel === 'vip' && (
            <NavButton
              startIcon={<DashboardIcon />}
              onClick={() => handleNavigation('/dashboard')}
              isActive={isActive('/dashboard')}
            >
              {isLargeScreen && isActive('/dashboard') ? 'Dashboard' : ''}
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
            <MenuItem onClick={() => switchDemoUser()}>
              <GymIcon sx={{ mr: 1 }} />
              Schimbă Utilizator Demo
            </MenuItem>
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
          onClick={handleLogin}
          isActive={isActive('/login')}
        >
          {isLargeScreen && isActive('/login') ? 'Login' : ''}
        </NavButton>
      )}
    </NavContainer>
  );
};

export default PublicNavbar; 