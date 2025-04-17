import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from '../../pages/Dashboard';

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
        return (
          <ContentContainer>
            <h2>Automatizări</h2>
            <p>Conținut pentru secțiunea de automatizări</p>
          </ContentContainer>
        );
      case 'history':
        return (
          <ContentContainer>
            <h2>Istoric</h2>
            <p>Conținut pentru secțiunea de istoric</p>
          </ContentContainer>
        );
      case 'packages':
        return (
          <ContentContainer>
            <h2>Pachete</h2>
            <p>Conținut pentru secțiunea de pachete</p>
          </ContentContainer>
        );
      case 'settings':
        return (
          <ContentContainer>
            <h2>Setări</h2>
            <p>Conținut pentru secțiunea de setări</p>
          </ContentContainer>
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