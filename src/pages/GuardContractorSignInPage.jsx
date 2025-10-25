import React, { useState } from 'react';
import './GuardContractorSignInPage.css';

const GuardContractorSignInPage = () => {
    const [activeTab, setActiveTab] = useState('on-site');
    const [isModalOpen, setModalOpen] = useState(false);

    // Mock data for contractors currently on site
    const onSiteContractors = [
        { id: 1, name: 'Mike Johnson', company: 'ACME Plumbing', reason: 'Plumbing', unit: '#1402', signIn: 'Today, 9:05 AM' }
    ];

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Contractor Logbook</h1><p>Manage on-site contractor and service personnel access.</p></div>
                <button className="sign-in-btn" onClick={() => setModalOpen(true)}>
                    <span>New Sign-In</span>
                </button>
            </header>

            <main className="logbook-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'on-site' ? 'active' : ''}`} onClick={() => setActiveTab('on-site')}>On Site Now</button>
                    <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Logbook History</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'on-site' ? 'active' : ''}`}>
                        <div className="contractor-grid">
                            {onSiteContractors.map(c => (
                                <div key={c.id} className="contractor-card">
                                    <p className="contractor-name">{c.name}</p>
                                    <p className="company-name">{c.company}</p>
                                    <p className="info-item"><strong>Reason:</strong> {c.reason}</p>
                                    <p className="info-item"><strong>Unit Access:</strong> {c.unit}</p>
                                    <p className="info-item"><strong>Signed In:</strong> {c.signIn}</p>
                                    <button className="sign-out-btn">Sign Out</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'history' ? 'active' : ''}`}>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>A searchable log of all past contractor visits will appear here.</p>
                    </div>
                </div>
            </main>

            {/* New Sign-In Modal */}
            {isModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>New Contractor Sign-In</h2><button className="close-modal-btn" onClick={() => setModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group"><label>Contractor Name</label><input type="text" className="input" /></div>
                                <div className="form-group"><label>Company Name</label><input type="text" className="input" /></div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>Reason for Visit</label><select className="select"><option>Plumbing</option><option>Electrical</option></select></div>
                                <div className="form-group"><label>Unit # Accessing</label><input type="text" className="input" /></div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="sign-in-btn" style={{ width: '100%' }}>Confirm Sign-In</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuardContractorSignInPage;