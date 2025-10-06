// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import MaintenanceRequestPage from './pages/MaintenanceRequestPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; // 1. Import new page

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/* 2. Add new route for resetting password. Note the ':token' part. */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute><MaintenanceRequestPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;