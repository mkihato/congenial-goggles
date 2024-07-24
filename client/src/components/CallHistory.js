import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';

const CallHistory = () => {
  const history = [
    { id: 1, number: '+254706453890', time: '12:35pm' },
    // Add more call history items here
  ];

  return (
    <Box sx={{ flex: 1, padding: 2, borderRight: '1px solid #ddd' }}>
      <Typography variant="h6">HISTORY</Typography>
      <List>
        {history.map((call) => (
          <ListItem key={call.id} button>
            <Avatar>{/* Add Avatar if needed */}</Avatar>
            <ListItemText primary={call.number} secondary={`Today ${call.time}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CallHistory;
