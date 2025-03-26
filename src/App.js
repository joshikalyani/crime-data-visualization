// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
// import MapView from './components/CrimeHotspots';
import CrimeHotspots from './components/CrimeHotspots';
import CrossCity from './components/CrossCity';
import TemporalAnalysis from './components/TemporalAnalysis';
import PoliceImpact from './components/PoliceImpact';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crime_hotspots" element={<CrimeHotspots />} />
          <Route path="/cross_city" element={<CrossCity />} />
          <Route path="/temporal_analysis" element={<TemporalAnalysis />} />
          <Route path="/police_impact" element={<PoliceImpact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
