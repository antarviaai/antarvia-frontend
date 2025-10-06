// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <div className="brand"><h1>ANT Resident Portal</h1></div>
        <div className="user-widget">
          <button onClick={handleLogout} className="submit-btn" style={{backgroundColor: '#555', marginRight: '15px', width: 'auto', padding: '10px 15px', fontSize: '1rem'}}>Logout</button>
          <a href="#" className="user-avatar-link"><div className="user-avatar">{user ? user.email.charAt(0).toUpperCase() : ''}</div></a>
        </div>
      </header>

      <div className="welcome-bar">
        <h2>Welcome back, {user ? user.firstName : '...'}</h2>
        <p>You have 2 new packages waiting for pickup.</p>
      </div>
      
      <section className="feature-section">
        <h2 className="section-title">Core Services</h2>
        <div className="feature-grid">
            <a href="#" className="feature-tile"><div className="tile-icon" style={{backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34D399'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></div><div className="tile-content"><h3>Online Payments</h3><p>Pay rent or fees and view statements.</p></div></a>
            <Link to="/maintenance" className="feature-tile"><div className="tile-icon" style={{backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><div className="tile-content"><h3>Maintenance Request</h3><p>Submit & track repair requests.</p></div></Link>
            <a href="#" className="feature-tile"><div className="tile-icon" style={{backgroundColor: "rgba(236, 72, 153, 0.1)", color: "#EC4899"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584C18.354 5.231 18 6.555 18 8a3 3 0 01-3 3h-1.832A4.001 4.001 0 0011 17.657V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15z"></path></svg></div><div className="tile-content"><h3>Announcements</h3><p>View important notices and updates.</p></div></a>
        </div>
      </section>
       {/* You can add your other feature sections here */}
    </div>
  );
}

export default DashboardPage;