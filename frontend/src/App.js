import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import UserForm from './pages/UserForm';
import CertificatePage from './pages/CertificatePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/certificate" element={<CertificatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
