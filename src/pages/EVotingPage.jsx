import React, { useState } from 'react';
import './EVotingPage.css';

const EVotingPage = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>E-Voting & Surveys</h1><p>Manage formal votes and informal community polls.</p></div>
                <button className="create-btn" onClick={() => setIsCreateModalOpen(true)}><span>+ Create New</span></button>
            </header>

            <section className="kpi-grid">
                <div className="kpi-card"><div className="kpi-value">01</div><div className="kpi-label">Active Votes</div></div>
                <div className="kpi-card"><div className="kpi-value">02</div><div className="kpi-label">Scheduled Events</div></div>
                <div className="kpi-card"><div className="kpi-value">78%</div><div className="kpi-label">Recent Turnout</div></div>
            </section>

            <main className="hub-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveTab('ongoing')}>Ongoing</button>
                    <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'ongoing' ? 'active' : ''}`}>
                        <div className="event-list">
                            <div className="event-card e-vote">
                                <div className="card-header"><div className="event-info"><p className="type">Formal E-Vote</p><p className="title">2025 Board of Directors Election</p></div></div>
                                <div className="progress-info"><div className="progress-bar"><div className="progress-bar-fill" style={{ width: '45%' }}></div></div><p className="progress-label">45% Voter Turnout • Closes in 3 days</p></div>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'completed' ? 'active' : ''}`}>
                        <div className="event-list">
                            <div className="event-card survey">
                                <div className="card-header">
                                    <div className="event-info"><p className="type">Informal Survey</p><p className="title">New Gym Equipment Preference</p></div>
                                    <div className="card-actions"><button className="view-results-btn" onClick={() => setIsResultsModalOpen(true)}>View Results</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Results Modal */}
            {isResultsModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Survey Results: New Gym Equipment</h2><div><button className="close-modal-btn" onClick={() => setIsResultsModalOpen(false)}>&times;</button></div></div>
                        <div className="modal-body">
                            <div className="chart-placeholder">Results Chart</div>
                            <table className="results-table">
                                <thead><tr><th>Option</th><th>Votes</th><th>Percentage</th></tr></thead>
                                <tbody>
                                    <tr><td>Second Treadmill</td><td>145</td><td>45%</td></tr>
                                    <tr><td>StairMaster</td><td>112</td><td>35%</td></tr>
                                    <tr><td>More Free Weights</td><td>64</td><td>20%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Create New Modal */}
            {isCreateModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Create New Event</h2><button className="close-modal-btn" onClick={() => setIsCreateModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p>A step-by-step wizard for creating a new E-Vote or Survey would go here.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EVotingPage;