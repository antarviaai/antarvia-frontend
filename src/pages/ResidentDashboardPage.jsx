// src/pages/ResidentDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardLayout.css'; // Using the shared CSS

function ResidentDashboardPage() {
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
                <div className="brand"><h1>ANT Resident Portal</h1></div>
                <div className="user-widget">
                    <button onClick={handleLogout} className="submit-btn" style={{backgroundColor: '#555', marginRight: '15px', width: 'auto', padding: '10px 15px', fontSize: '1rem'}}>Logout</button>
                    <Link to="/profile" className="user-avatar-link">
                        <div className="user-avatar">{getInitials()}</div>
                    </Link>
                </div>
            </header>

            <div className="welcome-bar">
                <h2>Welcome back, {user ? user.firstName : '...'}</h2>
                <p>You have 2 new packages waiting for pickup.</p>
            </div>
            
            {/* --- NEW SECTIONED LAYOUT STARTS HERE --- */}

            {/* Section 1: Core Services */}
            <section className="feature-section">
                <h2 className="section-title">Core Services</h2>
                <div className="feature-grid">
                    <Link to="/online-payments" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34D399'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></div>
                        <div className="tile-content"><h3>Online Payments</h3><p>Pay rent or fees and view statements.</p></div>
                    </Link>
                    <Link to="/maintenance" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div>
                        <div className="tile-content"><h3>Maintenance Request</h3><p>Submit & track repair requests.</p></div>
                    </Link>
                    <Link to="/announcements" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(236, 72, 153, 0.1)", color: "#EC4899"}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584C18.354 5.231 18 6.555 18 8a3 3 0 01-3 3h-1.832A4.001 4.001 0 0011 17.657V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15z"></path></svg></div>
                        <div className="tile-content"><h3>Announcements</h3><p>View important notices and updates.</p></div>
                    </Link>
                </div>
            </section>

            {/* Section 2: Community Hub */}
            <section className="feature-section">
                <h2 className="section-title">Community Hub</h2>
                <div className="feature-grid">
                    <Link to="/building-chat" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(10, 132, 255, 0.1)", color: "#0A84FF"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H17z" /></svg>
                        </div>
                        <div className="tile-content"><h3>Building Chat</h3><p>Connect with your neighbours.</p></div>
                    </Link>
                    <Link to="/marketplace" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(236, 72, 153, 0.1)", color: "#EC4899"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <div className="tile-content"><h3>Marketplace</h3><p>Buy, sell, and trade with neighbors.</p></div>
                    </Link>
                    <Link to="/polls-and-surveys" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(191, 90, 242, 0.1)", color: "#BF5AF2"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6-6l-6 6-6-6" /></svg>
                        </div>
                        <div className="tile-content"><h3>Polls & Surveys</h3><p>Share your voice in the community.</p></div>
                    </Link>
                </div>
            </section>

            {/* Section 3: Personal & Access */}
            <section className="feature-section">
                <h2 className="section-title">Personal & Access</h2>
                <div className="feature-grid">
                    <Link to="/profile" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(10, 132, 255, 0.1)", color: "#0A84FF"}}>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div className="tile-content"><h3>My Profile</h3><p>Manage your personal information.</p></div>
                    </Link>
                    <Link to="/visitor-passes" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(96, 165, 250, 0.1)", color: "#60A5FA"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3m2-4H5m2 10H5a2 2 0 01-2-2v-3a2 2 0 012-2h3m9 14l-4-4m0 0l-4-4m4 4l4 4m-4-4l4-4" /></svg>
                        </div>
                        <div className="tile-content"><h3>Visitor Passes</h3><p>Pre-authorize guests and visitor parking.</p></div>
                    </Link>
                    <Link to="/packages" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: "rgba(255, 159, 10, 0.1)", color: "#FF9F0A"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <div className="tile-content"><h3>Packages</h3><p>Track deliveries and manage pickups.</p></div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default ResidentDashboardPage;