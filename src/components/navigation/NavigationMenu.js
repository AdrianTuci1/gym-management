import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Divider,
  Typography,
  IconButton,
  Switch,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import FilterListIcon from '@mui/icons-material/FilterList';
import useCategoryStore from '../../store/categoryStore';
import useTimelineStore from '../../store/timelineStore';

const Container = styled(Box)({
  width: '100%',
  height: '64px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const MenuList = styled(List)({
  display: 'flex',
  gap: '8px',
  padding: 0,
});

const NavMenuItem = styled(ListItem)(({ theme, selected }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? '#ffffff' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: selected ? '#ffffff' : theme.palette.text.secondary,
  },
}));

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

const CategorySection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '16px',
});

const FilterButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
  },
}));

const NavigationMenu = ({ activeMenu, setActiveMenu }) => {
  const { categories, selectedCategory, setSelectedCategory } = useCategoryStore();
  const { 
    zoomLevel, 
    setZoomLevel, 
    showFullDay, 
    setShowFullDay,
    autoDisconnect,
    setAutoDisconnect 
  } = useTimelineStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu !== 'sales') {
      setSelectedCategory('all');
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    handleFilterClose();
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };

  return (
    <Container>
      <MenuList>
        <NavMenuItem
          selected={activeMenu === 'timeline'}
          onClick={() => handleMenuClick('timeline')}
        >
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Timeline" />
        </NavMenuItem>

        <NavMenuItem
          selected={activeMenu === 'sales'}
          onClick={() => handleMenuClick('sales')}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Vânzări" />
        </NavMenuItem>

        <NavMenuItem
          selected={activeMenu === 'add'}
          onClick={() => handleMenuClick('add')}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Adaugă" />
        </NavMenuItem>
      </MenuList>

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

      {activeMenu === 'sales' && (
        <CategorySection>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <FilterButton
            onClick={handleFilterClick}
            startIcon={<FilterListIcon />}
          >
            Filtre
          </FilterButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleFilterClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: 200,
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </CategorySection>
      )}
    </Container>
  );
};

export default NavigationMenu; 