// src/components/Home.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Crime Data Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Contextual Analysis of Crime Hotspots
            </Typography>
            <Typography>
              Crime hotspots represent areas with higher incidents of crime,
              often highlighting underlying socio-economic or environmental
              issues. By utilizing detailed location information, such as Block,
              Community Area, Beat, District, and Ward, alongside data on crime
              type and location descriptions, the project aims to precisely
              identify high-risk areas. This hotspot analysis supports law
              enforcement in deploying resources effectively and implementing
              preventive measures in specific environments like streets,
              apartments, or commercial areas where specific crimes, such as
              theft or assault, occur frequently.
            </Typography>
            <Link to="/crime_hotspots">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Map
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Temporal Analysis of Crime Trends
            </Typography>
            <Typography>
              Temporal data reveals crime patterns over time, providing insights
              into both short term fluctuations and long term trends. Focusing
              on the Year field, this analysis examines crime trends on an
              annual basis to identify patterns of increase or decrease in
              criminal activity. By analyzing yearly data, law enforcement
              agencies can better understand long term shifts in crime dynamics,
              evaluate the effectiveness of past strategies, and plan
              interventions accordingly. This annual perspective ensures a
              comprehensive understanding of crime trends, aiding in resource
              optimization and the development of proactive policing strategies.
            </Typography>
            <Link to="/temporal_analysis">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Trends
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Yearly Analysis of Arrests by Crime Type
            </Typography>
            <Typography>
              This use case focuses on the number of arrests made for each type
              of crime in a given year. Using arrest data and information on the
              type of crime, it further breaks down the arrests by categories
              such as Theft, Robbery, Burglary, etc . By doing so, this type of
              analysis helps to portray trends in law enforcement activity and
              points out which crime types received most attention during the
              year. Such insights enable stakeholders to evaluate law
              enforcement priorities, assess resource allocation, and understand
              patterns of police intervention across different crime categories.
              This is the yearly analysis of arrests according to the different
              crime types.
            </Typography>
            <Link to="/police_impact">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Graph
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Cross-City Benchmarking of Crime Trends
            </Typography>
            <Typography>
              Cross city benchmarking enables a comparative analysis of Chicago
              and Los Angeles crime patterns. Specifically, it compares crime
              counts across various categories, highlighting the type of crime,
              the city, and the associated crime count. This comparison aims to
              deepen insights into the crime dynamics of these urban areas and
              contribute to the overarching narrative of regional crime patterns
            </Typography>
            <Link to="/cross_city">
              <button style={{ padding: '10px', marginTop: '105px' }}>
                View Graph
              </button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
