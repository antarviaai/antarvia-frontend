// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import MaintenanceRequestPage from './pages/MaintenanceRequestPage'; // 1. Import new page

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        {/* 2. Add new protected route */}
        <Route path="/maintenance" element={<ProtectedRoute><MaintenanceRequestPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
export default App;