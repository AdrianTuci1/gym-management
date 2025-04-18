import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  styled, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Divider, 
  Chip, 
  Collapse, 
  IconButton, 
  Button 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClassIcon from '@mui/icons-material/Class';
import PaymentIcon from '@mui/icons-material/Payment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import TimeframeView from './TimeframeView/TimeframeView';

const HistoryContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Controls = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const HistoryListContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
});

const HistoryListItemStyled = styled(ListItem)(({ theme, eventType }) => ({
  borderLeft: `4px solid ${getTypeColor(theme, eventType)}`,
  marginBottom: theme.spacing(1),
  borderRadius: '4px',
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
}));

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minWidth: '200px',
});

const AIBadge = styled(Chip)({
  marginLeft: '8px',
  height: '20px',
  fontSize: '0.75rem',
});

const DetailsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  paddingLeft: theme.spacing(7), // Align with ListItemText
  color: theme.palette.text.secondary,
}));

const getTypeColor = (theme, type) => {
  switch (type) {
    case 'checkin': return theme.palette.success.main;
    case 'class': return theme.palette.info.main;
    case 'payment': return theme.palette.warning.main;
    case 'suggestion': return theme.palette.secondary.main;
    case 'maintenance': return theme.palette.error.main;
    case 'report': return theme.palette.primary.main;
    default: return theme.palette.grey[500];
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'checkin': return <CheckIcon fontSize="small" />;
    case 'class': return <ClassIcon fontSize="small" />;
    case 'payment': return <PaymentIcon fontSize="small" />;
    case 'suggestion': return <LightbulbIcon fontSize="small" />;
    case 'maintenance': return <BuildIcon fontSize="small" />;
    case 'report': return <AssessmentIcon fontSize="small" />;
    default: return null;
  }
};

const HistoryView = () => {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [timeRange, setTimeRange] = useState('all');
  const [customRange, setCustomRange] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    if (newRange !== 'custom') {
        setCustomRange(null);
    }
  };

  const handleCustomRangeChange = (newRange) => {
    setCustomRange(newRange);
    setTimeRange('custom');
  };

  // Data is now hardcoded here, but should ideally come from props or context
  const historyData = [
    {
      id: 1,
      timestamp: `${new Date().toISOString().split('T')[0]} 10:30`,
      title: 'Acces Sala Fitness',
      type: 'checkin',
      details: 'Membru Ion Popescu a intrat în sala de fitness.',
      user: { name: 'Ion Popescu', role: 'Membru Gold', avatar: 'IP', isAI: false }
    },
    {
      id: 2,
      timestamp: `${new Date().toISOString().split('T')[0]} 11:15`,
      title: 'Participare Clasa Yoga',
      type: 'class',
      details: 'Membru Maria Ionescu a participat la clasa de Yoga.',
      user: { name: 'Maria Ionescu', role: 'Membru Silver', avatar: 'MI', isAI: false }
    },
    {
      id: 3,
      timestamp: `${new Date().toISOString().split('T')[0]} 12:00`,
      title: 'Acces Piscină',
      type: 'checkin',
      details: 'Membru Alexandru Dumitrescu a intrat la piscină.',
      user: { name: 'Alexandru Dumitrescu', role: 'Membru Gold', avatar: 'AD', isAI: false }
    },
    {
      id: 4,
      timestamp: `${new Date().toISOString().split('T')[0]} 13:30`,
      title: 'Reînnoire Abonament',
      type: 'payment',
      details: 'Membru Elena Stoica și-a reînnoit abonamentul Gold pentru 3 luni.',
      user: { name: 'Elena Stoica', role: 'Membru Gold', avatar: 'ES', isAI: false }
    },
    {
      id: 5,
      timestamp: `${new Date().toISOString().split('T')[0]} 14:45`,
      title: 'Sugestie Echipament Nou',
      type: 'suggestion',
      details: 'AI Assistant: Sugerează achiziționarea unei noi benzi de alergat model X.',
      user: { name: 'AI Assistant', role: 'AI', avatar: '🤖', isAI: true }
    },
    {
      id: 6,
      timestamp: `${new Date().toISOString().split('T')[0]} 15:20`,
      title: 'Acces Sala Fitness',
      type: 'checkin',
      details: 'Membru Mihai Georgescu a intrat în sala de fitness.',
      user: { name: 'Mihai Georgescu', role: 'Vizitator', avatar: 'MG', isAI: false }
    },
    {
      id: 7,
      timestamp: `${new Date().toISOString().split('T')[0]} 16:00`,
      title: 'Mentenanță Aparat',
      type: 'maintenance',
      details: 'Aparatul de vâslit nr. 3 a fost reparat și este funcțional.',
      user: { name: 'Service Team', role: 'Tehnic', avatar: 'ST', isAI: false }
    },
     {
      id: 8,
      timestamp: `2024-07-25 16:30`,
      title: 'Acces Sala Fitness',
      type: 'checkin',
      details: 'Membru Ana Popa a intrat în sala de fitness.',
      user: { name: 'Ana Popa', role: 'Membru Silver', avatar: 'AP', isAI: false }
    },
    {
      id: 9,
      timestamp: `2024-07-25 17:15`,
      title: 'Raport Ocupare',
      type: 'report',
      details: 'AI Assistant: Gradul de ocupare mediu astăzi a fost de 65%.', 
      user: { name: 'AI Assistant', role: 'AI', avatar: '🤖', isAI: true }
    },
    {
      id: 10,
      timestamp: `2024-07-25 18:00`,
      title: 'Participare Clasa Pilates',
      type: 'class',
      details: 'Membru George Vasilescu a participat la clasa de Pilates.',
      user: { name: 'George Vasilescu', role: 'Membru Gold', avatar: 'GV', isAI: false }
    }
  ];

  // Adjust filtering to use string date, selected types, and time range
  const filteredHistory = historyData.filter((item) => {
    const itemDate = item.timestamp.split(" ")[0];
    const itemHour = parseInt(item.timestamp.split(" ")[1].split(":")[0]);

    const matchesDate = itemDate === selectedDate;
    
    const matchesSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.details && item.details.toLowerCase().includes(search.toLowerCase())) || // Check if details exists
        item.user.name.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);

    const matchesTimeRange = () => {
      if (timeRange === "all") return true;
      if (timeRange === "morning" && itemHour >= 6 && itemHour < 12) return true;
      if (timeRange === "afternoon" && itemHour >= 12 && itemHour < 18) return true;
      if (timeRange === "evening" && (itemHour >= 18 || itemHour < 6)) return true;
      if (timeRange === 'custom' && customRange && itemHour >= customRange.start && itemHour < customRange.end) return true;
      return false;
    };

    return matchesDate && matchesSearch && matchesType && matchesTimeRange();
  });

  // Define available types for filtering
  const availableTypes = [
    { type: "checkin", label: "Check-in", icon: <CheckIcon fontSize="small" /> },
    { type: "class", label: "Clasă", icon: <ClassIcon fontSize="small" /> },
    { type: "payment", label: "Plată", icon: <PaymentIcon fontSize="small" /> },
    { type: "suggestion", label: "Sugestie", icon: <LightbulbIcon fontSize="small" /> },
    { type: "maintenance", label: "Mentenanță", icon: <BuildIcon fontSize="small" /> },
    { type: "report", label: "Raport", icon: <AssessmentIcon fontSize="small" /> },
  ];

  return (
    <HistoryContainer>
      <Header>
        <Typography variant="h6">Istoric Activități</Typography>
        <TextField 
          size="small"
          variant="outlined"
          placeholder="Caută în istoric..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Header>

      <HistoryListContainer>
        <List disablePadding>
          {filteredHistory.map((item, index) => (
            <React.Fragment key={item.id}>
              <HistoryListItemStyled 
                alignItems="flex-start"
                eventType={item.type}
                onClick={() => handleExpandClick(item.id)}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: item.user.isAI ? 'secondary.light' : 'primary.light',
                      color: item.user.isAI ? 'secondary.contrastText' : 'primary.contrastText',
                    }}
                  >
                    {item.user.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <UserInfo>
                         <Typography variant="body1" component="span" fontWeight="medium">
                           {item.user.name}
                         </Typography>
                         {item.user.isAI && <AIBadge label="AI" color="secondary" size="small" />}
                         <Typography variant="caption" color="text.secondary">
                            ({item.user.role})
                         </Typography>
                      </UserInfo>
                      <Typography variant="caption" color="text.secondary">
                       {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                       {getTypeIcon(item.type)}
                       <Typography component="span" variant="body2">
                        {item.title}
                       </Typography>
                    </Box>
                  }
                />
                 <IconButton size="small" sx={{ ml: 1 }}>
                    {expandedItem === item.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                 </IconButton>
              </HistoryListItemStyled>
              <Collapse in={expandedItem === item.id} timeout="auto" unmountOnExit>
                <DetailsBox>
                  <Typography variant="body2">{item.details}</Typography>
                </DetailsBox>
              </Collapse>
              {index < filteredHistory.length - 1 && <Divider component="li" sx={{ my: 1, borderColor: 'transparent' }} />} 
            </React.Fragment>
          ))}
           {filteredHistory.length === 0 && (
              <ListItem>
                 <ListItemText primary="Niciun rezultat găsit pentru data și căutarea selectată." sx={{ textAlign: 'center', color: 'text.secondary' }} />
              </ListItem>
           )}
        </List>
      </HistoryListContainer>
      
      <TimeframeView 
        historyData={historyData}
        selectedDate={selectedDate}
        selectedTypes={selectedTypes}
        timeRange={timeRange}
        customRange={customRange}
        onDateChange={setSelectedDate}
        onTypeToggle={toggleType}
        onTimeRangeChange={handleTimeRangeChange}
        onCustomRangeChange={handleCustomRangeChange}
      />

    </HistoryContainer>
  );
};

export default HistoryView;