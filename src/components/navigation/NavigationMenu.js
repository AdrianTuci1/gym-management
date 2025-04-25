import React, { useState, useEffect } from 'react';
import {
  Box,
  styled,
  Divider,
  Typography,
  Switch,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useCategoryStore from '../../store/categoryStore';
import useTimelineStore from '../../store/timelineStore';

const Container = styled(Box)({
  width: 'calc(100% - 54px)',
  height: '64px',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  justifyContent: 'space-between',
});

const TimelineControls = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '8px',
});

const SwitchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#f5f5f5',
  padding: '4px 12px',
  borderRadius: '8px',
});

const CategorySection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const DateTimeContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

const DateTimeBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#f5f5f5',
  padding: '8px 16px',
  borderRadius: '8px',
  '& .MuiSvgIcon-root': {
    color: '#666',
  },
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

const NavigationMenu = ({ activeMenu }) => {
  const { categories, selectedCategory, setSelectedCategory } = useCategoryStore();
  const { 
    showFullDay, 
    setShowFullDay,
    autoDisconnect,
    setAutoDisconnect 
  } = useTimelineStore();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <Container>
      <TimelineControls>
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

        {activeMenu === 'sales' && (
          <CategorySection>
            <Divider orientation="vertical" flexItem />
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
      </TimelineControls>

      <DateTimeContainer>
        <DateTimeBox>
          <CalendarTodayIcon />
          <Typography variant="body2">
            {formatDate(currentTime)}
          </Typography>
        </DateTimeBox>
        <DateTimeBox>
          <AccessTimeIcon />
          <Typography variant="body2">
            {formatTime(currentTime)}
          </Typography>
        </DateTimeBox>
      </DateTimeContainer>
    </Container>
  );
};

export default NavigationMenu; 