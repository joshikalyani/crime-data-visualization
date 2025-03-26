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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrimeDescription, setSelectedCrimeDescription] = useState(''); // State for selected crime description
  const [crimeDescriptions, setCrimeDescriptions] = useState([]); // State to store unique crime descriptions

  // Helper function to extract the plain value from a URI or literal and decode URL-encoded strings
  const getPlainValue = (value) => {
    if (!value) return '';
    // If it's a URI, extract the local name
    if (value.startsWith('http')) {
      const segments = value.split('#');
      return decodeURIComponent(
        segments.length > 1 ? segments[1] : value.split('/').pop()
      );
    }
    // Decode URL-encoded literals
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

                SELECT DISTINCT ?city ?crm_cd_desc (COUNT(?dr_no) AS ?crimeCount)
                WHERE {
                    # Link crime records to crime codes
                    ?dr_no smw:linkedToCrimeCode ?crm_cd .
                    
                    # Link crime codes to cities
                    ?city smw:comparedFor ?crm_cd .
                    ?crm_cd smw:hasDescription ?crm_cd_desc .
                }
                GROUP BY ?city ?crm_cd_desc
                ORDER BY DESC(?crimeCount)
                LIMIT 50
          `,
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result.results.bindings);
        setLoading(false);

        // Extract unique crime descriptions for the dropdown menu
        const descriptions = [
          ...new Set(
            result.results.bindings.map((row) =>
              getPlainValue(row.crm_cd_desc?.value)
            )
          ),
        ];
        setCrimeDescriptions(descriptions);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selected crime description
  const filteredData = selectedCrimeDescription
    ? data.filter(
        (row) =>
          getPlainValue(row.crm_cd_desc?.value) === selectedCrimeDescription
      )
    : data;

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        SPARQL Query Results
      </Typography>

      {/* Dropdown to select crime description */}
      <FormControl sx={{ marginBottom: 2 }}>
        <InputLabel>Crime Description</InputLabel>
        <Select
          value={selectedCrimeDescription}
          onChange={(e) => setSelectedCrimeDescription(e.target.value)}
          label="Crime Description"
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          {crimeDescriptions.map((description, index) => (
            <MenuItem key={index} value={description}>
              {description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Crime Description</TableCell>
              <TableCell>Crime Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{getPlainValue(row.city?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crm_cd_desc?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crimeCount?.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SPARQLQueryResults;
