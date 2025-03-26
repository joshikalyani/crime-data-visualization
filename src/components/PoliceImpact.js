import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(''); // State for storing the selected year
  const [chartData, setChartData] = useState(null); // State for the chart data

  // Helper function to extract the plain value from a URI or literal
  const getPlainValue = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) {
      const segments = value.split('#');
      return decodeURIComponent(
        segments.length > 1 ? segments[1] : value.split('/').pop()
      );
    }
    return decodeURIComponent(value);
  };

  // Fetch data from the SPARQL endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/repositories/Vedanya', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sparql-query',
            Accept: 'application/json',
          },
          body: `
            PREFIX smw: <http://www.semanticweb.org/kruthi/ontologies/2024/11/untitled-ontology-13#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            SELECT DISTINCT ?year ?crm_cd ?crm_cd_desc (COUNT(?dr_no) AS ?crimeCount) (COUNT(?arrest) AS ?arrestCount)
            WHERE {
              ?crm_cd smw:impactedBy ?arrest .
              ?dr_no smw:linkedToCrimeCode ?crm_cd .
              ?dr_no smw:occursAt ?location .
              ?dr_no smw:occuredOn ?year .
              ?arrest smw:hasArrestStatus "True" .
              ?crm_cd smw:hasDescription ?crm_cd_desc .
            }
            GROUP BY ?year ?crm_cd ?crm_cd_desc
            ORDER BY DESC(?year) DESC(?crimeCount)
          `,
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result.results.bindings);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data by selected year and prepare it for the chart
  useEffect(() => {
    if (data && year) {
      const filteredData = data.filter(
        (row) => getPlainValue(row.year?.value) === year
      );
      const chartLabels = filteredData.map((row) =>
        getPlainValue(row.crm_cd_desc?.value)
      );
      const chartValues = filteredData.map((row) =>
        parseInt(getPlainValue(row.arrestCount?.value), 10)
      );

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Arrest Count',
            data: chartValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, year]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Crime Arrest Count by Description
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item>
          <TextField
            label="Year"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{ width: 150 }}
          />
        </Grid>
      </Grid>

      {/* Display chart if data is available */}
      {chartData && chartData.labels.length > 0 ? (
        <>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Arrest Counts by Crime Description for Year ${year}`,
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `Arrests: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Crime Description',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Arrest Count',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />

          {/* Table Display */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
            Arrest Counts by Crime Description for Year {year}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Crime Description</TableCell>
                  <TableCell>Arrest Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.labels.map((label, index) => (
                  <TableRow key={index}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{chartData.datasets[0].data[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography>No data available for the selected year.</Typography>
      )}
    </Box>
  );
};

export default SPARQLQueryResults;
