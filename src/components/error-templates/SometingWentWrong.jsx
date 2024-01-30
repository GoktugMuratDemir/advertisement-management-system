import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

export default function SomethingWentWrong() {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert severity="error">
        <AlertTitle>Something went wrong</AlertTitle>
        There was an error processing your request. Please try again later.
      </Alert>
    </Box>
  );
}
