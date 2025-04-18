import React, { useState } from 'react';
import { Box, styled, IconButton, Typography } from '@mui/material';
import SplitPane from 'react-split-pane';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Timeline from '../components/timeline/Timeline';
import CourseList from '../components/courses/CourseList';
import OccupancyIndicator from '../components/courses/OccupancyIndicator';

const DashboardContainer = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'relative',
});

const PaneContainer = styled(Box)({
  height: '100%',
  padding: '16px',
  overflow: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

const RightPaneContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: '16px',
});

const OccupancySection = styled(Box)({
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const NavigationMenu = styled(Box)({
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  padding: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '50px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000,
  border: '1px solid rgba(0, 0, 0, 0.05)',
});

const NavIcon = styled(IconButton)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
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

const NavLabel = styled(Typography)({
  fontSize: '12px',
  fontWeight: 500,
  color: 'inherit',
  transition: 'color 0.2s ease',
});

const ContentContainer = styled(Box)({
  flex: 1,
  overflow: 'auto',
  paddingBottom: '80px', // Space for floating navigation
});

const mockOccupancy = {
  gym: {
    current: 15,
    total: 30,
  },
  pool: {
    current: 8,
    total: 20,
  },
  aerobic: {
    current: 12,
    total: 15,
  },
};

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('timeline');

  const renderContent = () => {
    switch (activeMenu) {
      case 'timeline':
        return <Timeline />;
      case 'sales':
        return <Box>Sales Content</Box>;
      case 'add':
        return <Box>Add Member Content</Box>;
      default:
        return <Timeline />;
    }
  };

  return (
    <DashboardContainer>
      <SplitPane
        split="vertical"
        minSize={200}
        defaultSize="80%"
        resizerStyle={{
          width: '4px',
          backgroundColor: '#e0e0e0',
          cursor: 'col-resize',
          margin: '0 8px',
        }}
      >
        <PaneContainer>
          <ContentContainer>
            {renderContent()}
          </ContentContainer>
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
          </NavigationMenu>
        </PaneContainer>
        <RightPaneContainer>
          <PaneContainer sx={{ flex: 1 }}>
            <CourseList />
          </PaneContainer>
          <OccupancySection>
            <OccupancyIndicator occupancy={mockOccupancy} />
          </OccupancySection>
        </RightPaneContainer>
      </SplitPane>
    </DashboardContainer>
  );
};

export default Dashboard; 