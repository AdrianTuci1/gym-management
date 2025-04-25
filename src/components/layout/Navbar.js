import React from 'react';
import { AppBar, Toolbar, IconButton, styled, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  MenuOpen as MenuOpenIcon,
  Timeline as TimelineIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import NotificationMenu from '../notifications/NotificationMenu';
import useNavigationStore from '../../store/navigationStore';
import WidgetsIcon from '@mui/icons-material/Widgets';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  color: '#1a1a1a',
  boxShadow: 'none',
});

const MenuIconStyled = styled(MenuOpenIcon)({
  fontSize: '2rem',
  marginRight: '16px',
  color: '#1a1a1a',
});

const MenuList = styled(List)({
  display: 'flex',
  gap: '8px',
  padding: '8px',
  backgroundColor: '#1a1a1a',
  borderRadius: '50px',
});

const NavMenuItem = styled(ListItem)(({ theme }) => ({
  padding: '2px 6px',
  borderRadius: '50px',
  cursor: 'pointer',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'white',
    '& .MuiListItemIcon-root': {
      color: '#1a1a1a',
    },
    '& .MuiListItemText-primary': {
      color: '#1a1a1a',
    },
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.common.white,
    minWidth: '36px',
  },
  '& .MuiListItemText-primary': {
    color: theme.palette.common.white,
  },
}));

const Navbar = () => {
  const { activeMenu, setActiveMenu } = useNavigationStore();

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ position: 'relative', minHeight: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, gap: '8px' }}>
          <WidgetsIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
            Fitlife Center
          </Typography>
        </div>
        <div style={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 1
        }}>
          <MenuList>
            <NavMenuItem 
              selected={activeMenu === 'timeline'}
              onClick={() => setActiveMenu('timeline')}
              sx={{
                backgroundColor: activeMenu === 'timeline' ? 'white' : 'transparent',
                '& .MuiListItemIcon-root': {
                  color: activeMenu === 'timeline' ? '#1a1a1a' : 'white',
                },
                '& .MuiListItemText-primary': {
                  color: activeMenu === 'timeline' ? '#1a1a1a' : 'white',
                },
              }}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Timeline" />
            </NavMenuItem>
            <NavMenuItem 
              selected={activeMenu === 'sales'}
              onClick={() => setActiveMenu('sales')}
              sx={{
                backgroundColor: activeMenu === 'sales' ? 'white' : 'transparent',
                '& .MuiListItemIcon-root': {
                  color: activeMenu === 'sales' ? '#1a1a1a' : 'white',
                },
                '& .MuiListItemText-primary': {
                  color: activeMenu === 'sales' ? '#1a1a1a' : 'white',
                },
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Vânzări" />
            </NavMenuItem>
            <NavMenuItem 
              selected={activeMenu === 'add'}
              onClick={() => setActiveMenu('add')}
              sx={{
                backgroundColor: activeMenu === 'add' ? 'white' : 'transparent',
                '& .MuiListItemIcon-root': {
                  color: activeMenu === 'add' ? '#1a1a1a' : 'white',
                },
                '& .MuiListItemText-primary': {
                  color: activeMenu === 'add' ? '#1a1a1a' : 'white',
                },
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Adaugă" />
            </NavMenuItem>
          </MenuList>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', zIndex: 1 }}>
          <NotificationMenu />
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 