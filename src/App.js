import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import PublicLayout from './components/layout/PublicLayout';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Packages from './pages/Packages';
import useAuthStore from './store/authStore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const loading = useAuthStore(state => state.loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/packages" element={<PublicLayout><Packages /></PublicLayout>} />
          <Route path="/dashboard/*" element={<MainLayout><Dashboard /></MainLayout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
