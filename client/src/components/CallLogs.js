import React from 'react';
import { Box, Typography } from '@mui/material';

const CallLogs = () => {
  return (
    <Box sx={{ flex: 2, padding: 2, borderRight: '1px solid #ddd' }}>
      <Typography variant="h6">CALL LOGS</Typography>
      {/* Call logs content will be displayed here */}
    </Box>
  );
};

export default CallLogs;
