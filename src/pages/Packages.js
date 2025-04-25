import React from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DiamondIcon from '@mui/icons-material/Diamond';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PackageCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(12),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '800px',
  margin: '0 auto',
  '&:last-child': {
    marginBottom: 0
  },
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    '& .hover-line': {
      width: '100%',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, #1a1a1a, #333)',
  }
}));

const HoverLine = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '2px',
  width: '0%',
  background: 'linear-gradient(to right, #1a1a1a, #333)',
  transition: 'width 0.3s ease-in-out',
});

const packages = [
  {
    name: 'Basic',
    price: '99',
    icon: <FitnessCenterIcon sx={{ fontSize: 32 }} />,
    features: [
      'Access to gym equipment',
      'Basic workout plan',
      'Locker room access',
      'Free water refill'
    ]
  },
  {
    name: 'Premium',
    price: '149',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 32 }} />,
    features: [
      'All Basic features',
      'Personal trainer consultation',
      'Group classes access',
      'Sauna access',
      'Towel service'
    ]
  },
  {
    name: 'Elite',
    price: '199',
    icon: <DiamondIcon sx={{ fontSize: 32 }} />,
    features: [
      'All Premium features',
      '24/7 access',
      'Private locker',
      'Nutrition consultation',
      'Massage sessions (2/month)',
      'Priority booking'
    ]
  }
];

const Packages = () => {
  return (
    <Box sx={{ 
      py: '250px',
      bgcolor: '#f8f9fa',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Box sx={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        px: { xs: 2, md: 4 },
        width: '100%',
        '& > *': {
          marginBottom: '80px',
          '&:last-child': {
            marginBottom: 0
          }
        }
      }}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.name}>
            <HoverLine className="hover-line" />
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pkg.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ 
                      fontWeight: 700,
                      color: '#1a1a1a',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {pkg.name}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ 
                      fontWeight: 700,
                      color: '#1a1a1a',
                      letterSpacing: '-1px'
                    }}
                  >
                    ${pkg.price}
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{ 
                        ml: 1,
                        fontWeight: 500,
                        color: 'text.secondary'
                      }}
                    >
                      /month
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box 
                component="ul" 
                sx={{ 
                  pl: 0,
                  mb: 3,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2,
                  '& li': {
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    listStyle: 'none',
                    '&:before': {
                      content: '"•"',
                      color: '#1a1a1a',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }
                  }
                }}
              >
                {pkg.features.map((feature, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500
                    }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    bgcolor: '#1a1a1a',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: '#333',
                    }
                  }}
                >
                  Choose Plan
                </Button>
              </Box>
            </CardContent>
          </PackageCard>
        ))}
      </Box>
    </Box>
  );
};

export default Packages; 