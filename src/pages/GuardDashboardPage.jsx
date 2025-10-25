import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuardDashboardPage.css'; // Make sure you're importing the correct CSS

const GuardDashboardPage = () => {
    // This 'user' is just for the "Welcome,tala" bar.
    // The 'user' in the header is now handled by GuardLayout.
    const [user, setUser] = useState({ name: 'tala' }); // Simplified

    return (
        // Renamed class to avoid potential CSS conflicts with the layout
        <div className="portal-container-content">
            <div className="welcome-bar">
                <h2>Welcome, {user.name}.</h2>
                <p>You are on the Day Shift (7:00 AM - 3:00 PM). Please review handover notes in the Shift Log.</p>
            </div>

            {/* Section 1: Priority Actions */}
            <section className="feature-section">
                {/* --- HEADING IS COLORED --- */}
                <h2 className="section-title section-priority">Priority Actions</h2>
                <div className="feature-grid">
                    {/* --- TILES ARE GRAY --- */}
                    <Link to="/guard/visitor-pass" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(10, 132, 255, 0.1)', color: '#0A84FF'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Visitor Pass</h3><p>Create and manage digital passes for guests.</p></div>
                    </Link>
                    <Link to="/guard/ant-mode" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(10, 132, 255, 0.1)', color: '#0A84FF'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg></div>
                        <div className="tile-content"><h3>ANT Mode</h3><p>Log incidents and notes in the AI-powered building memory.</p></div>
                    </Link>
                    <Link to="/guard/packages" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(48, 209, 88, 0.1)', color: '#30D158'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10m0 0l4-4m-4 4l4 4m0-12h8m-8 4h8m-8 4h8"></path></svg></div>
                        <div className="tile-content"><h3>Packages</h3><p>Log new deliveries and manage resident pickups.</p></div>
                    </Link>
                    <Link to="/guard/unit-lookup" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Unit Look Up</h3><p>Search residents, vehicles, and unit-specific information.</p></div>
                    </Link>
                    <Link to="/guard/shift-log" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Shift Log</h3><p>Review notes, log activities, and manage your shift.</p></div>
                    </Link>
                </div>
            </section>

            {/* Section 2: Incident & Safety */}
            <section className="feature-section">
                {/* --- HEADING IS COLORED --- */}
                <h2 className="section-title section-safety">Incident & Safety</h2>
                <div className="feature-grid">
                    <Link to="/guard/fire-mode" className="feature-tile emergency">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(255, 69, 58, 0.1)', color: '#FF453A'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343m11.314 11.314a8 8 0 01-11.314-11.314m11.314 11.314L6.343 7.343m11.314 11.314A8 8 0 016.343 7.343M6.343 7.343h.01M17.657 18.657h.01M12 18.272a6 6 0 000-12.544V3.728a9 9 0 010 16.544v-2z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Fire Mode</h3><p>Activate emergency fire protocols and notify contacts.</p></div>
                    </Link>
                    <Link to="/guard/incident-report" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Incident Report</h3><p>File a new report or generate one with AI from ANT Mode.</p></div>
                    </Link>
                    <Link to="/guard/violation-notice" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(255, 69, 58, 0.1)', color: '#FF453A'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm0 0h18"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Violation Notice</h3><p>Issue a formal notice for a by-law infraction.</p></div>
                    </Link>
                    <Link to="/guard/responder-interview" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#EC4899'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Responder Interview</h3><p>Launch guided questionnaire for emergency responders.</p></div>
                    </Link>
                    <Link to="/guard/message-pm" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Message PM</h3><p>Send a direct, private message to the Property Manager.</p></div>
                    </Link>
                </div>
            </section>

            {/* Section 3: Operations & Logs */}
            <section className="feature-section">
                {/* --- HEADING IS COLORED --- */}
                <h2 className="section-title section-ops">Operations & Logs</h2>
                <div className="feature-grid">
                    <Link to="/guard/amenity-management" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(138, 64, 255, 0.1)', color: '#8A40FF'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                        <div className="tile-content"><h3>Amenity Schedule</h3><p>View daily bookings and manage amenity status.</p></div>
                    </Link>
                    <Link to="/guard/maintenance-request" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(48, 209, 88, 0.1)', color: '#30D158'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Create Maintenance</h3><p>Log a new maintenance ticket for a resident.</p></div>
                    </Link>
                    <Link to="/guard/tasks" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>To-Do Tasks</h3><p>Manage and complete assigned tasks for the current shift.</p></div>
                    </Link>
                    <Link to="/guard/lost-and-found" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Lost & Found</h3><p>Log found items and manage the digital lost and found.</p></div>
                    </Link>
                    <Link to="/guard/patrol-mode" className="feature-tile locked">
                        <div className="lock-icon">{/* Lock SVG */}</div>
                        <div className="tile-icon" style={{backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6B7280'}}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>
                        <div className="tile-content"><h3>Patrol Mode</h3><p>Begin a patrol route and log observations.</p></div>
                    </Link>
                    <Link to="/guard/key-asset-management" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(217, 70, 239, 0.1)', color: '#D946EF'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a3 3 0 013 3m-3-3a3 3 0 00-3 3m3-3h.01M6 10m-3 0a3 3 0 106 0 3 3 0 10-6 0zm15 0m-3 0a3 3 0 106 0 3 3 0 10-6 0m-6 0a3 3 0 106 0 3 3 0 10-6 0m-3 6a3 3 0 106 0 3 3 0 10-6 0m6 3a3 3 0 106 0 3 3 0 10-6 0"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Key & Asset Management</h3><p>Log and track building keys, fobs, and equipment.</p></div>
                    </Link>
                    <Link to="/guard/contractor-signin" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Contractor Sign-In</h3><p>Manage and log all third-party contractor access.</p></div>
                    </Link>
                </div>
            </section>

            {/* Section 4: Communication & Info */}
            <section className="feature-section">
                {/* --- HEADING IS COLORED --- */}
                <h2 className="section-title section-comm">Communication & Info</h2>
                <div className="feature-grid">
                    <Link to="/guard/announcements" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V4m0 1.882a1.5 1.5 0 100 3v5.118a1.5 1.5 0 000 3V18m0-1.118l-1.5-1.5m1.5 1.5l1.5-1.5m-3-13.232a9 9 0 1012 0c0-1.398-.387-2.73-1.07-3.924A.5.5 0 0016.118 3H7.882a.5.5 0 00-.412.768A9.03 9.03 0 007 8.882z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Announcements</h3><p>View official notices from management.</p></div>
                    </Link>
                    <Link to="/guard/document-library" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Document Library</h3><p>Access building by-laws, rules, and forms.</p></div>
                    </Link>
                    <Link to="/guard/mailbox" className="feature-tile">
                        <div className="tile-icon" style={{backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1'}}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-5.5-2.5L12 13l-2.5-1.5L4 13m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6"></path></svg>
                        </div>
                        <div className="tile-content"><h3>Internal Mailbox</h3><p>Read messages and directives from management.</p></div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GuardDashboardPage;