import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [crimeDescription, setCrimeDescription] = useState('THEFT'); // Default description
  const [queryDescription, setQueryDescription] = useState('THEFT'); // Description used in query

  // Helper function to extract the plain value from a URI or literal
  const getPlainValue = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) {
      const segments = value.split('#');
      return segments.length > 1 ? segments[1] : value.split('/').pop();
    }
    return value;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/repositories/Vedanya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sparql-query',
          Accept: 'application/json',
        },
        body: `
          PREFIX smw: <http://www.semanticweb.org/kruthi/ontologies/2024/11/untitled-ontology-13#>

          SELECT DISTINCT ?crm_cd_desc ?crime_year (COUNT(?dr_no) AS ?crimeCount)
          WHERE {
            ?dr_no smw:linkedToCrimeCode ?crm_cd .
            ?crm_cd smw:hasDescription ?crm_cd_desc .

            FILTER (?crm_cd_desc = smw:${queryDescription})

            ?dr_no smw:occuredOn ?crime_year .
          }
          GROUP BY ?crm_cd_desc ?crime_year
          ORDER BY DESC(?crimeCount)
          LIMIT 50
        `,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching data: ${errorText}`);
      }

      const result = await response.json();
      setData(result.results.bindings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle fetching data when the queryDescription changes
  useEffect(() => {
    fetchData();
  }, [queryDescription]);

  // Prepare data for the graph
  // Prepare data for the graph
  const chartData = {
    labels: data
      .map((row) => getPlainValue(row.crime_year?.value)) // Extract years
      .filter((year) => parseInt(year, 10) >= 2010) // Include only years >= 2010
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)), // Sort years in ascending order
    datasets: [
      {
        label: 'Number of Crimes',
        data: data
          .filter(
            (row) => parseInt(getPlainValue(row.crime_year?.value), 10) >= 2010
          ) // Include only years >= 2010
          .sort(
            (a, b) =>
              parseInt(getPlainValue(a.crime_year?.value), 10) -
              parseInt(getPlainValue(b.crime_year?.value), 10)
          ) // Sort data by year
          .map((row) => parseInt(getPlainValue(row.crimeCount?.value), 10)), // Y-axis: Crime Count
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: queryDescription.toUpperCase(), // Dynamic title
      },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        SPARQL Query Results
      </Typography>

      {/* Input for Crime Description */}
      <Box
        sx={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <TextField
          label="Crime Description"
          variant="outlined"
          value={crimeDescription}
          onChange={(e) => setCrimeDescription(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => setQueryDescription(crimeDescription.toUpperCase())}
        >
          Fetch Data
        </Button>
      </Box>

      {/* Loading/Error Message */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* Line Chart */}
      {!loading && !error && data.length > 0 && (
        <Box sx={{ marginBottom: 4 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      )}

      {/* Table */}
      {!loading && !error && data.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Crime Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{getPlainValue(row.crm_cd_desc?.value)}</TableCell>
                  <TableCell>{getPlainValue(row.crime_year?.value)}</TableCell>
                  <TableCell>{getPlainValue(row.crimeCount?.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SPARQLQueryResults;
