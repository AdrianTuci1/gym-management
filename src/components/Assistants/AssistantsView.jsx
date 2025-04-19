import React, { useState } from 'react';
import {
  Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Switch,
  FormControlLabel
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';    // For Reservations
import WhatsAppIcon from '@mui/icons-material/WhatsApp';              // For WhatsApp
import BarChartIcon from '@mui/icons-material/BarChart';              // For Reporting
import SettingsIcon from '@mui/icons-material/Settings';              // For settings/config
import EmailIcon from '@mui/icons-material/Email';                    // For email settings
import styles from './AssistantsView.module.css';

// Assistant icons using Material UI icons
const assistantIcons = {
  reservation: <FitnessCenterIcon sx={{ color: '#1976d2' }} />,
  whatsapp: <WhatsAppIcon sx={{ color: '#25D366' }} />,
  reporting: <BarChartIcon sx={{ color: '#f57c00' }} />,
};

// Initial state
const initialAssistantsState = {
  reservation: {
    id: 'reservation',
    name: 'Asistent Rezervări',
    isActive: true,
    config: {
      autoConfirm: true,
      maxParticipants: 15,
    },
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'Notificări WhatsApp',
    isActive: false,
    config: {
      apiKey: null,
      sendReminders: true,
      reminderTime: '1h',
    },
  },
  reporting: {
    id: 'reporting',
    name: 'Raportare & Analiză',
    isActive: true,
    config: {
      frequency: 'weekly',
      email: 'admin@sala.ro',
    },
  },
};

const AssistantsView = () => {
  const [assistants, setAssistants] = useState(initialAssistantsState);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showConfig, setShowConfig] = useState({
    reservation: false,
    whatsapp: false,
    reporting: false
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState(null);

  const handleToggle = (assistantId) => {
    setAssistants(prev => ({
      ...prev,
      [assistantId]: { 
        ...prev[assistantId], 
        isActive: !prev[assistantId].isActive 
      }
    }));
  };

  const handleConfigUpdate = (assistantId, configUpdate) => {
    setAssistants(prev => ({
      ...prev,
      [assistantId]: {
        ...prev[assistantId],
        config: { ...prev[assistantId].config, ...configUpdate }
      }
    }));
  };

  const handleApiKeyUpdate = (assistantId, apiKey) => {
    handleConfigUpdate(assistantId, { apiKey });
  };

  const toggleConfig = (assistantId) => {
    setShowConfig(prev => ({
      ...prev,
      [assistantId]: !prev[assistantId]
    }));
  };

  const openSettingsDialog = (assistantId) => {
    setCurrentAssistant(assistants[assistantId]);
    setOpenDialog(true);
  };

  const closeSettingsDialog = () => {
    setOpenDialog(false);
    setCurrentAssistant(null);
  };

  const saveSettings = () => {
    if (currentAssistant) {
      setAssistants(prev => ({
        ...prev,
        [currentAssistant.id]: currentAssistant
      }));
      closeSettingsDialog();
    }
  };

  const getAssistantIcon = (assistantKey) => {
    return assistantIcons[assistantKey] || null;
  };

  const getAssistantDescription = (assistantKey) => {
    switch(assistantKey) {
      case 'reservation':
        return 'Gestionează programările și disponibilitatea';
      case 'whatsapp':
        return 'Trimite remindere și notificări clienților';
      case 'reporting':
        return 'Generează rapoarte automate despre activitate';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 1 }}>
        <Typography variant="h4">
          Asistenți Inteligenți
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configurați și monitorizați asistenții pentru automatizarea sălii
        </Typography>
      </Box>

      {/* Assistants List */}
      <div className={styles.assistantList}>
        {Object.keys(assistants).map((assistantKey) => {
          const assistant = assistants[assistantKey];
          if (!assistant) return null;
          
          return (
            <div key={assistant.id} className={styles.assistantItem}>
              <div className={styles.assistantContent}>
                <div className={styles.assistantIcon}>
                  {getAssistantIcon(assistantKey)}
                </div>
                <div className={styles.assistantDetails}>
                  <div className={styles.assistantName}>{assistant.name}</div>
                  <div className={styles.assistantMeta}>
                    {getAssistantDescription(assistantKey)}
                    <span className={`${styles.statusIndicator} ${assistant.isActive ? styles.active : styles.inactive}`}>
                      {assistant.isActive ? 'Activ' : 'Inactiv'}
                    </span>
                  </div>
                </div>
                <div className={styles.assistantActions}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={assistant.isActive}
                        onChange={() => handleToggle(assistantKey)}
                        size="small"
                      />
                    }
                    label=""
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => openSettingsDialog(assistantKey)}
                    color="primary"
                  >
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={closeSettingsDialog}
        maxWidth="sm"
        fullWidth
      >
        {currentAssistant && (
          <>
            <DialogTitle>
              Configurare {currentAssistant.name}
            </DialogTitle>
            <DialogContent>
              {currentAssistant.id === 'reservation' && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentAssistant.config?.autoConfirm || false}
                        onChange={(e) => setCurrentAssistant(prev => ({
                          ...prev,
                          config: { ...prev.config, autoConfirm: e.target.checked }
                        }))}
                      />
                    }
                    label="Confirmare automată a rezervărilor"
                    sx={{ my: 2, display: 'block' }}
                  />
                  <TextField
                    margin="dense"
                    label="Număr maxim de participanți/clasă"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={currentAssistant.config?.maxParticipants || 15}
                    onChange={(e) => setCurrentAssistant(prev => ({
                      ...prev,
                      config: { ...prev.config, maxParticipants: parseInt(e.target.value) || 15 }
                    }))}
                    inputProps={{ min: "1" }}
                  />
                </>
              )}

              {currentAssistant.id === 'whatsapp' && (
                <>
                  <TextField
                    margin="dense"
                    label="API Key WhatsApp Business (opțional)"
                    type={showApiKey ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    value={currentAssistant.config?.apiKey || ''}
                    onChange={(e) => setCurrentAssistant(prev => ({
                      ...prev,
                      config: { ...prev.config, apiKey: e.target.value }
                    }))}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowApiKey(!showApiKey)}
                          edge="end"
                        >
                          {showApiKey ? <EmailIcon /> : <EmailIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentAssistant.config?.sendReminders || true}
                        onChange={(e) => setCurrentAssistant(prev => ({
                          ...prev,
                          config: { ...prev.config, sendReminders: e.target.checked }
                        }))}
                      />
                    }
                    label="Trimite remindere pentru clase"
                    sx={{ my: 2, display: 'block' }}
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Ora trimitere remindere</InputLabel>
                    <Select
                      value={currentAssistant.config?.reminderTime || '1h'}
                      label="Ora trimitere remindere"
                      onChange={(e) => setCurrentAssistant(prev => ({
                        ...prev,
                        config: { ...prev.config, reminderTime: e.target.value }
                      }))}
                    >
                      <MenuItem value="30m">30 minute înainte</MenuItem>
                      <MenuItem value="1h">1 oră înainte</MenuItem>
                      <MenuItem value="2h">2 ore înainte</MenuItem>
                      <MenuItem value="24h">24 ore înainte</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}

              {currentAssistant.id === 'reporting' && (
                <>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Frecvență rapoarte</InputLabel>
                    <Select
                      value={currentAssistant.config?.frequency || 'weekly'}
                      label="Frecvență rapoarte"
                      onChange={(e) => setCurrentAssistant(prev => ({
                        ...prev,
                        config: { ...prev.config, frequency: e.target.value }
                      }))}
                    >
                      <MenuItem value="daily">Zilnic</MenuItem>
                      <MenuItem value="weekly">Săptămânal</MenuItem>
                      <MenuItem value="monthly">Lunar</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="dense"
                    label="Email pentru rapoarte"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={currentAssistant.config?.email || ''}
                    onChange={(e) => setCurrentAssistant(prev => ({
                      ...prev,
                      config: { ...prev.config, email: e.target.value }
                    }))}
                    placeholder="admin@sala.ro"
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeSettingsDialog}>Anulează</Button>
              <Button 
                onClick={saveSettings} 
                variant="contained"
              >
                Salvează
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AssistantsView; 