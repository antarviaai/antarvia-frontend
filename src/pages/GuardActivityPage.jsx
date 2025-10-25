import React, { useState } from 'react';
import './GuardActivityPage.css';

const GuardActivityPage = () => {
    // State to control which view is active: 'roster' or 'report'
    const [activePage, setActivePage] = useState('roster');
    // State to hold the name of the guard whose report is being viewed
    const [selectedGuardName, setSelectedGuardName] = useState('');

    const handleGuardClick = (guardName) => {
        setSelectedGuardName(guardName);
        setActivePage('report');
    };

    const handleBackToRoster = () => {
        setActivePage('roster');
    };

    return (
        <div className="page-container">
            {/* Roster Page View */}
            <div className={`page ${activePage === 'roster' ? 'active' : ''}`} id="roster-page">
                <header className="roster-header">
                    <div>
                        <h1>Guard Activity</h1>
                        <p>Select a staff member to view their detailed performance report.</p>
                    </div>
                </header>

                <div className="important-note">
                    <div className="note-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.055.492.112.558.112.065 0 .104-.044.104-.112-.002-.066-.038-.12-.112-.169l-.256-.16c-.225-.141-.39-.253-.498-.377-.24-.287-.378-.65-.378-1.096 0-.71.516-1.319 1.362-1.319.845 0 1.355.609 1.355 1.319 0 .445-.138.81-.378 1.096-.108.124-.273.236-.498.377l-.256.16c-.073.049-.11.103-.11.169 0 .068.038.112.103.112.066 0 .265-.057.56-.113l.451-.083.082.381-2.29-.287zM8 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                    </div>
                    <div className="note-text">
                        <strong>Please Note:</strong> The performance scores are automatically calculated by ANT's AI based on the volume and quality of completed tasks and logged activities.
                    </div>
                </div>

                <main>
                    <section className="roster-section">
                        <h2 className="section-title">On Shift Now</h2>
                        <div className="guard-grid">
                            <div className="guard-card" onClick={() => handleGuardClick('David Chen')}>
                                <div className="avatar"></div>
                                <div className="guard-details"><div className="name">David Chen</div><div className="role">Supervisor</div></div>
                                <div className="status-indicator on-shift"><span className="status-dot on-shift"></span>On Shift</div>
                            </div>
                            <div className="guard-card" onClick={() => handleGuardClick('Sarah Ross')}>
                                <div className="avatar"></div>
                                <div className="guard-details"><div className="name">Sarah Ross</div><div className="role">Evening Guard</div></div>
                                <div className="status-indicator on-shift"><span className="status-dot on-shift"></span>On Shift</div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Performance Report Page View */}
            <div className={`page ${activePage === 'report' ? 'active' : ''}`} id="report-page">
                <a href="#" className="back-btn" onClick={handleBackToRoster}>← Back to Roster</a>
                <header className="report-header">
                    <div className="guard-avatar"></div>
                    <div className="guard-info">
                        <h1>{selectedGuardName}</h1>
                        <p>Performance Report: Last 30 Days</p>
                    </div>
                </header>

                <main className="report-body">
                    <div className="main-column">
                        <div className="card">
                            <h2 className="card-title">Performance Metrics</h2>
                            <div className="kpi-grid">
                                <div className="kpi-card"><div className="kpi-value good">98%</div><div className="kpi-label">Task Completion</div></div>
                                <div className="kpi-card"><div className="kpi-value good">4.8<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/5</span></div><div className="kpi-label">Log Detail Score</div></div>
                                <div className="kpi-card"><div className="kpi-value ok">152</div><div className="kpi-label">Packages Processed</div></div>
                                <div className="kpi-card"><div className="kpi-value bad">02</div><div className="kpi-label">Overdue Tasks</div></div>
                            </div>
                        </div>
                        <div className="card">
                            <h2 className="card-title">Recent Activity</h2>
                            <ul className="activity-feed">
                                <li className="feed-item"><div className="feed-icon">📝</div><div><p className="feed-text">Logged a new incident report: <span>#INC-8432</span></p><p className="feed-time">2 hours ago</p></div></li>
                                <li className="feed-item"><div className="feed-icon">📦</div><div><p className="feed-text">Logged a package from <span>Amazon</span> for <span>Unit 1203</span></p><p className="feed-time">3 hours ago</p></div></li>
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-column">
                        <div className="card"><h2 className="card-title">Activity Breakdown</h2><div className="chart-placeholder">Chart Placeholder</div></div>
                        <div className="card"><h2 className="card-title">Task Trend</h2><div className="chart-placeholder">Chart Placeholder</div></div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GuardActivityPage;