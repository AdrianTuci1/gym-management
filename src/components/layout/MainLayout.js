import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from '../../pages/Dashboard';
import HistoryView from '../History/HistoryView';
import PackagesView from '../Packages/PackagesView';
import AssistantsView from '../Assistants/AssistantsView';

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100vh',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  overflow: 'hidden',
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  marginLeft: '64px', // Same as sidebar width
  height: 'calc(100vh - 64px)', // Subtract navbar height
  overflow: 'auto',
  padding: '20px',
});

const ContentContainer = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '20px',
});

const MainLayout = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const handleMenuChange = (component) => {
    setActiveComponent(component);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'automation':
        return <AssistantsView />;
      case 'history':
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <HistoryView />
          </Box>
        );
      case 'packages':
        return (
          <Box sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
            <PackagesView />
          </Box>
        );
      case 'settings':
        return (
          <Box sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
            <h2>Setări</h2>
            <p>Conținut pentru secțiunea de setări</p>
          </Box>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainContent>
      <Navbar />
      <Sidebar onMenuChange={handleMenuChange} />
      <ContentWrapper>
        {renderContent()}
      </ContentWrapper>
    </MainContent>
  );
};

export default MainLayout; 