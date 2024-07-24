import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const DialPad = () => {
  const [number, setNumber] = useState('');

  const handleButtonClick = (digit) => {
    setNumber(number + digit);
  };

  const handleCall = () => {
    // Handle call logic here
    console.log('Calling:', number);
  };

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <Box sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>Call as</Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>081 1962 3030</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter a name or number"
        value={number}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleCall}>
              <PhoneIcon />
            </IconButton>
          ),
        }}
        sx={{ marginBottom: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}
      />
      <Grid container spacing={1} sx={{ width: '250px', marginBottom: 2 }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
          <Grid item xs={4} key={digit}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleButtonClick(digit)}
              sx={{ height: '60px', fontSize: '1.5rem', backgroundColor: '#fff', color: '#000', boxShadow: 'none', border: '1px solid #ddd' }}
            >
              {digit}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="text"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Hide keypad
      </Button>
    </Box>
  );
};

export default DialPad;
