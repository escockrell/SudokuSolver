import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import ResultsPage from './pages/ResultsPage';
import ChangesPage from './pages/ChangesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/changes" element={<ChangesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 