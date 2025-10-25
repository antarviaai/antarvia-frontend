import React, { useState } from 'react';
import './GuardKeyAssetPage.css';

const GuardKeyAssetPage = () => {
    const [activeTab, setActiveTab] = useState('checked-out');
    const [isModalOpen, setModalOpen] = useState(false);

    // Mock data for items currently checked out
    const checkedOutItems = [
        { id: 1, name: 'Rooftop Access Key', timeOut: 'Today, 9:15 AM', to: 'Jane Doe (Plumber)', reason: 'Rooftop HVAC inspection' },
        { id: 2, name: 'Key Fob #12', timeOut: 'Today, 10:30 AM', to: 'Alex R. (Resident, Unit 1203)', reason: 'Dog walker access' },
    ];

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Key & Asset Logbook</h1><p>Track all keys and equipment checked out from the desk.</p></div>
                <button className="action-btn" onClick={() => setModalOpen(true)}>
                    <span>+ Check Out Item</span>
                </button>
            </header>

            <main className="logbook-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'checked-out' ? 'active' : ''}`} onClick={() => setActiveTab('checked-out')}>Checked Out</button>
                    <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Logbook History</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'checked-out' ? 'active' : ''}`}>
                        <div className="asset-grid">
                            {checkedOutItems.map(item => (
                                <div key={item.id} className="asset-card">
                                    <p className="asset-name">{item.name}</p>
                                    <p className="asset-meta">Checked out: {item.timeOut}</p>
                                    <p className="info-item"><strong>To:</strong> {item.to}</p>
                                    <p className="info-item"><strong>Reason:</strong> {item.reason}</p>
                                    <button className="check-in-btn">Check In</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'history' ? 'active' : ''}`}>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>A searchable log of all past check-ins and check-outs will appear here.</p>
                    </div>
                </div>
            </main>

            {/* Check Out Modal */}
            {isModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Check Out Key / Asset</h2><button className="close-modal-btn" onClick={() => setModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Asset/Key Name</label><input type="text" className="input" placeholder="e.g., Key Fob #12, Rooftop Key" /></div>
                            <div className="form-group"><label>Person's Name</label><input type="text" className="input" placeholder="Who is taking the item?" /></div>
                            <div className="form-group"><label>Unit # / Company</label><input type="text" className="input" placeholder="e.g., 1203 or ACME Plumbing" /></div>
                            <div className="form-group"><label>Reason (Optional)</label><input type="text" className="input" placeholder="e.g., Dog walker, Appliance repair" /></div>
                        </div>
                        <div className="modal-footer"><button className="action-btn" style={{ width: '100%' }}>Confirm Check Out</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuardKeyAssetPage;