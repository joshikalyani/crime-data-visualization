// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CrimeWare
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/crime_hotspots">
          Crime_Hotspots
        </Button>
        <Button color="inherit" component={Link} to="/temporal_analysis">
          Temporal_Analysis
        </Button>
        <Button color="inherit" component={Link} to="/police_impact">
          Police_Impact
        </Button>
        <Button color="inherit" component={Link} to="/cross_city">
          Cross_City
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
