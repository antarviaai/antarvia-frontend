// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div className="portal-container">
      {/* ... header and other sections ... */}
      <section className="feature-section">
        <h2 className="section-title">Core Services</h2>
        <div className="feature-grid">
          <a href="#" className="feature-tile">{/* Online Payments tile */}</a>

          {/* 2. Change this tile from 'a' to 'Link' */}
          <Link to="/maintenance" className="feature-tile">
            <div className="tile-icon" style={{backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div>
            <div className="tile-content">
              <h3>Maintenance Request</h3>
              <p>Submit & track repair requests.</p>
            </div>
          </Link>
          
          <a href="#" className="feature-tile">{/* Announcements tile */}</a>
        </div>
      </section>
      {/* ... other sections ... */}
    </div>
  );
}
export default DashboardPage;