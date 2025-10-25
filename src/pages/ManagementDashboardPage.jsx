// src/pages/ManagementDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardLayout.css'; // Use the shared CSS file

function ManagementDashboardPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'hidden'; };
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/users/profile', { headers: { 'Authorization': `Bearer ${token}` } });
                    setUser(response.data);
                } catch (error) { console.error('Failed to fetch user profile:', error); }
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const getInitials = () => {
        if (user && user.firstName && user.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        }
        return user ? user.email.charAt(0).toUpperCase() : '';
    };

    return (
        <div className="portal-container">
            <header className="portal-header">
                <div className="brand"><h1>ANT Management Portal</h1></div>
                <div className="user-widget">
                    <button onClick={handleLogout} className="submit-btn" style={{backgroundColor: '#555', marginRight: '15px', width: 'auto', padding: '10px 15px', fontSize: '1rem'}}>Logout</button>
                    <div className="user-avatar-link"><div className="user-avatar">{getInitials()}</div></div>
                </div>
            </header>

            <div className="welcome-bar">
                <h2>Welcome back, {user ? user.firstName : '...'}</h2>
            </div>
            
            <>
              {/* Section 1: Communications & Community */}
              <section className="feature-section">
                <h2 className="section-title">Communications & Community</h2>
                <div className="feature-grid">
                  <Link to="/admin/announcements" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(236, 72, 153, 0.1)", color: "#EC4899"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584C18.354 5.231 18 6.555 18 8a3 3 0 01-3 3h-1.832A4.001 4.001 0 0011 17.657V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15z"></path></svg></div>
                      <div className="tile-content"><h3>Announcements Hub</h3><p>Create notices for residents.</p></div>
                  </Link>
                  <Link to="/admin/mailbox" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(255, 159, 10, 0.1)", color: "#FF9F0A"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Mailbox</h3><p>Communicate with residents and staff.</p></div>
                  </Link>
                  <Link to="/admin/e-voting" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(191, 90, 242, 0.1)", color: "#BF5AF2"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6-6l-6 6-6-6" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>E-Voting & Surveys</h3><p>Manage formal votes and community polls.</p></div>
                  </Link>
                </div>
              </section>

              {/* Section 2: Operations & Security */}
              <section className="feature-section">
                <h2 className="section-title">Operations & Security</h2>
                <div className="feature-grid">
                  <Link to="/admin/maintenance" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div>
                      <div className="tile-content"><h3>Maintenance Hub</h3><p>View & assign resident requests.</p></div>
                  </Link>
                  <Link to="/admin/guard-activity" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(48, 209, 88, 0.1)", color: "#30D158"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.162-4.162m6.73-.335l-4.162 4.162a12.023 12.023 0 008.618-3.04 11.953 11.953 0 01-2.427-4.885z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Guard Activity</h3><p>Monitor guard performance & reports.</p></div>
                  </Link>
                  <Link to="/admin/violations" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(255, 69, 58, 0.1)", color: "#FF453A"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Violation Tracking</h3><p>Log and send official infraction notices.</p></div>
                  </Link>
                  <Link to="/admin/architectural-requests" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(8, 145, 178, 0.1)", color: "#0891B2"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Architectural Requests</h3><p>Review and manage resident modifications.</p></div>
                  </Link>
                  <Link to="/admin/user-management" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(107, 114, 128, 0.1)", color: "#6B7280"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21V5a2 2 0 00-2-2H9a2 2 0 00-2 2v16" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>User Management</h3><p>Oversee all staff accounts.</p></div>
                  </Link>
                  <Link to="/admin/vendor-management" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(80, 80, 90, 0.1)", color: "#8B8B95"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Vendor Management</h3><p>Manage vendors and purchase orders.</p></div>
                  </Link>
                  <Link to="/admin/document-library" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6"}}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                         </svg>
                      </div>
                      <div className="tile-content"><h3>Document Library</h3><p>Store and share important files.</p></div>
                  </Link>
                </div>
              </section>

              {/* Section 3: Analytics & Business */}
              <section className="feature-section">
                <h2 className="section-title">Analytics & Business</h2>
                <div className="feature-grid">
                  <Link to="/admin/financials" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(52, 211, 153, 0.1)", color: "#34D399"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Financials</h3><p>View revenue, arrears, and generate reports.</p></div>
                  </Link>
                  <Link to="/admin/reports" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(10, 132, 255, 0.1)", color: "#0A84FF"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>ANT Reports</h3><p>Generate insights from building data.</p></div>
                  </Link>
                  <Link to="/admin/ant-mode" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(191, 90, 242, 0.1)", color: "#BF5AF2"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>ANT Mode</h3><p>Chat with the building's AI assistant.</p></div>
                  </Link>
                  <Link to="/admin/store" className="feature-tile">
                      <div className="tile-icon" style={{backgroundColor: "rgba(96, 165, 250, 0.1)", color: "#60A5FA"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div className="tile-content"><h3>Store Management</h3><p>Manage inventory and resident purchases.</p></div>
                  </Link>
                </div>
              </section>
            </>
        </div>
    );
}

export default ManagementDashboardPage;