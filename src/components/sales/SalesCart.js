import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SalesCart = ({ cart, onUpdateQuantity, onRemoveItem, onConfirmSale, onCancelSale }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Coș de cumpărături
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Coșul este gol
        </Typography>
      ) : (
        <>
          <List sx={{ flex: 1, overflow: 'auto' }}>
            {cart.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => onRemoveItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ ml: 1 }}>
                          {item.price * item.quantity} RON
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" align="right" gutterBottom>
              Total: {calculateTotal()} RON
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={onCancelSale}
              >
                Anulează
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onConfirmSale}
              >
                Confirmă vânzarea
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SalesCart; 