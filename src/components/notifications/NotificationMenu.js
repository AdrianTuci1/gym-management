import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  styled,
  Badge,
  Avatar,
} from '@mui/material';
import {
  SmartToy as RobotIcon,
  Send as SendIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 360,
    maxHeight: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

const ChatInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const RobotAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 40,
  height: 40,
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nouă rezervare',
      message: 'Membru nou a rezervat o clasă de yoga',
      timestamp: '10:30',
      unread: true,
    },
    {
      id: 2,
      title: 'Reminder',
      message: 'Clasa de pilates începe în 30 de minute',
      timestamp: '09:45',
      unread: true,
    },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, unread: false }
        : notification
    ));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <RobotAvatar>
            <RobotIcon />
          </RobotAvatar>
        </Badge>
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RobotAvatar sx={{ mr: 2 }}>
              <RobotIcon />
            </RobotAvatar>
            <Typography variant="h6">
              Asistent Notificări
            </Typography>
          </Box>
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{
                    backgroundColor: notification.unread ? 'action.hover' : 'transparent',
                    borderRadius: '8px',
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {notification.message}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          {notification.timestamp}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <ChatInput>
            <TextField
              fullWidth
              size="small"
              placeholder="Scrie un mesaj..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </ChatInput>
        </Box>
      </StyledMenu>
    </>
  );
};

export default NotificationMenu; 