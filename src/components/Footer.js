// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 2, marginTop: 4, backgroundColor: '#f8f9fa' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 Integrated Crime Data Analysis | All Rights Reserved Group 18 - SER531
      </Typography>
    </Box>
  );
};

export default Footer;
