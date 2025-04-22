import React from 'react';
import { Box, styled } from '@mui/material';
import PublicNavbar from './PublicNavbar';

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
  height: 'calc(100vh - 64px)', // Subtract navbar height
  overflow: 'auto',
});

const PublicLayout = ({ children }) => {
  return (
    <MainContent>
      <PublicNavbar />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </MainContent>
  );
};

export default PublicLayout; 