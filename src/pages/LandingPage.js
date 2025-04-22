import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';

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

export default LandingPage; 