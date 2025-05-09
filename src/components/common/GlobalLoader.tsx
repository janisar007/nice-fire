import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

export const GlobalLoader: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
      open={loading}
    >
      <CircularProgress color="inherit" size={60} />
      <div className="ml-4">Initializing application...</div>
    </Backdrop>
  );
};