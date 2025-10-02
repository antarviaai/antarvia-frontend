// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import axios from 'axios';
import './DashboardPage.css';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5001/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // If token is invalid, log out the user
          handleLogout();
        }
      }
    };
    fetchUserProfile();
  }, []);

  // 3. Create the logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <div className="brand"><h1>ANT Resident Portal</h1></div>
        <div className="user-widget">
          {/* 4. The new Logout button */}
          <button onClick={handleLogout} className="new-request-btn" style={{backgroundColor: '#555', marginRight: '15px'}}>Logout</button>
          <a href="#" className="user-avatar-link"><div className="user-avatar">{user ? user.email.charAt(0).toUpperCase() : ''}</div></a>
        </div>
      </header>

      <div className="welcome-bar">
        {/* The welcome message is now fully dynamic */}
        <h2>Welcome back, {user ? user.email : '...'}</h2>
        <p>You have 2 new packages waiting for pickup.</p>
      </div>
      
      {/* --- All your feature sections remain the same --- */}
      <section className="feature-section">
        <h2 className="section-title">Core Services</h2>
        <div className="feature-grid">
            <a href="#" className="feature-tile">{/* Online Payments */}</a>
            <Link to="/maintenance" className="feature-tile">{/* Maintenance Request */}</Link>
            <a href="#" className="feature-tile">{/* Announcements */}</a>
        </div>
      </section>
      {/* ... other sections ... */}
    </div>
  );
}

export default DashboardPage;