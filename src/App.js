import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Button, Box, Typography, Container } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';

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

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Gym Management
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Sistem de management pentru sali de fitness
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 4 }}
        >
          Accesează Dashboard
        </Button>
      </Box>
    </Container>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<MainLayout><Dashboard /></MainLayout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
