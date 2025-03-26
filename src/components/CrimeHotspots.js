import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'; // Import for clustering
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet to fix the icon issue

// Fix for default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

            SELECT ?crm_cd_desc ?location ?latitude ?longitude
WHERE {
    ?dr_no smw:occursAt ?location .
    ?dr_no smw:linkedToCrimeCode ?crm_cd.
    ?crm_cd smw:hasDescription ?crm_cd_desc.
    ?location smw:hasLatitudeDimension ?latitude .
    ?location smw:hasLongitudeDimension ?longitude .
}
            LIMIT 10000
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const markerData = data.map((row) => ({
    location: getPlainValue(row.location?.value),
    lat: parseFloat(getPlainValue(row.latitude?.value)),
    lng: parseFloat(getPlainValue(row.longitude?.value)),
    descr: getPlainValue(row.crm_cd_desc?.value), // Remove parseFloat here
  }));

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Crime Location Map
      </Typography>
      <MapContainer
        center={[markerData[0]?.lat || 41.85, markerData[0]?.lng || -87.65]} // Center on the first marker
        zoom={12}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markerData.map((point, index) => (
            <Marker key={index} position={[point.lat, point.lng]}>
              <Popup>
                <strong>Location:</strong> {point.location}
                <br />
                <strong>Latitude:</strong> {point.lat}
                <br />
                <strong>Longitude:</strong> {point.lng}
                <br />
                <strong>Description:</strong> {point.descr}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
};

export default SPARQLQueryResults;
