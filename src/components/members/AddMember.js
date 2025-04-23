import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  styled,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled(Paper)(({ theme }) => ({
  padding: '32px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  height: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderSection = styled(Box)({
  flexShrink: 0,
});

const AvatarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '24px',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
});

const StyledAvatar = styled(Avatar)({
  width: '140px',
  height: '140px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    opacity: 0.8,
  },
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  flex: 1,
  overflow: 'auto',
  paddingRight: '8px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
    '&:hover': {
      background: '#555',
    },
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
});

const SelectedPackage = styled(Box)({
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '24px',
});

const PackageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PriceSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: '1px solid rgba(0,0,0,0.1)',
  flexShrink: 0,
});

const AddMember = ({ selectedPackage, onPackageChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement member creation logic
    console.log('Form submitted:', { ...formData, package: selectedPackage });
  };

  const handleCancel = () => {
    // TODO: Implement cancel logic
    console.log('Operation cancelled');
  };

  return (
    <Container>
      
      <FormContainer component="form" onSubmit={handleSubmit}>
        <AvatarContainer>
          <StyledAvatar
            src={formData.photo}
            onClick={() => document.getElementById('photo-upload').click()}
          >
            {!formData.photo && <AddPhotoAlternateIcon sx={{ fontSize: 60 }} />}
          </StyledAvatar>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          <Button
            variant="outlined"
            onClick={() => document.getElementById('photo-upload').click()}
            startIcon={<AddPhotoAlternateIcon />}
          >
            Adaugă Fotografie
          </Button>
        </AvatarContainer>

        <StyledTextField
          fullWidth
          label="Nume"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        
        <StyledTextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        
        <StyledTextField
          fullWidth
          label="Vârstă"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: <CakeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />

        {selectedPackage && (
          <>
            <SelectedPackage>
              <PackageHeader>
                <Typography variant="h6">Pachet Selectat</Typography>
                <Button
                  size="small"
                  startIcon={<CloseIcon />}
                  onClick={() => onPackageChange(null)}
                >
                  Schimbă
                </Button>
              </PackageHeader>
              <Typography variant="body1">{selectedPackage.name}</Typography>
              <Chip
                label={selectedPackage.entry_type === 'unlimited' ? 'Acces nelimitat' : 
                       selectedPackage.entry_type === 'monthly' ? 'Lunar' : 'Single use'}
                size="small"
                variant="outlined"
              />
            </SelectedPackage>

            <PriceSection>
              <AttachMoneyIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {selectedPackage.price} RON
              </Typography>
            </PriceSection>
          </>
        )}
      </FormContainer>

      <ActionButtons>
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={handleCancel}
          sx={{ 
            flex: 1,
            py: 1.5,
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          Anulează
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!selectedPackage}
          sx={{ 
            flex: 1,
            py: 1.5,
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          Finalizează
        </Button>
      </ActionButtons>
    </Container>
  );
};

export default AddMember; 