import React, { useState, useCallback } from 'react';
import { Box, styled } from '@mui/material';
import SplitPane from 'react-split-pane';
import Timeline from '../components/timeline/Timeline';
import CourseList from '../components/courses/CourseList';
import OccupancyIndicator from '../components/courses/OccupancyIndicator';
import NavigationMenuComponent from '../components/navigation/NavigationMenu';

const DashboardContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const ContentSection = styled(Box)({
  flex: 1,
  position: 'relative',
});

// Content Components
const DashboardContent = ({ content }) => {
  const [size, setSize] = useState('75%');
  
  const handleResize = useCallback((newSize) => {
    // Debounce the resize operation
    setTimeout(() => {
      setSize(newSize);
    }, 200);
  }, []);

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
  
  const ContentContainer = styled(Box)({
    flex: 1,
    overflow: 'auto',
    height: '100%',
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

  return (
    <SplitPane
      split="vertical"
      minSize={200}
      defaultSize={size}
      onChange={handleResize}
      resizerStyle={{
        width: '4px',
        backgroundColor: '#e0e0e0',
        cursor: 'col-resize',
        margin: '0 8px',
      }}
    >
      <PaneContainer>
        <ContentContainer>
          {content}
        </ContentContainer>
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
  );
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
      <NavigationMenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <ContentSection>
        <DashboardContent content={renderContent()} />
      </ContentSection>
    </DashboardContainer>
  );
};

export default Dashboard; 