import React, { useState } from 'react';
import './PackagePickupPage.css';

const PackagePickupPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [notifiedPackages, setNotifiedPackages] = useState([]);

    const handleOnMyWay = (packageId) => {
        if (notifiedPackages.includes(packageId)) return; // Prevent multiple clicks

        setNotifiedPackages([...notifiedPackages, packageId]);

        setTimeout(() => {
            setNotifiedPackages(prev => prev.filter(id => id !== packageId));
        }, 2500);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Packages</h1><p>Track deliveries and manage your pickups.</p></div>
            </header>

            <div className="important-note">{/* Note content here */}</div>

            <main>
                <section className="awaiting-pickup">
                    <h2 className="section-title">Awaiting Pickup</h2>
                    <div className="package-list">
                        {/* Package 1 */}
                        <div className="package-card">
                            <div className="package-card-body">
                                <div className="carrier-logo"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" /></div>
                                <div className="package-info">
                                    <div className="date">Arrived Today at 11:45 AM</div>
                                    <div className="tracking-id">Tracking: 1ZA...F45</div>
                                    <div className="package-tags"><span className="tag oversized">OVERSIZED</span></div>
                                </div>
                            </div>
                            <div className="package-card-footer">
                                <button 
                                    className={`action-btn ${notifiedPackages.includes(1) ? 'notified' : ''}`}
                                    onClick={() => handleOnMyWay(1)}
                                >
                                    {notifiedPackages.includes(1) ? 'Notified!' : 'On My Way'}
                                </button>
                                <button className="action-btn primary" onClick={() => setModalOpen(true)}>View Pickup Pass</button>
                            </div>
                        </div>
                        {/* Package 2 */}
                        <div className="package-card">
                           {/* ... second package card content ... */}
                        </div>
                    </div>
                </section>
                
                <section className="collected-history" style={{ marginTop: '40px' }}>
                    <h2 className="section-title">Collected History</h2>
                    <div className="history-list">{/* ... history items ... */}</div>
                </section>
            </main>

            {isModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Pickup Pass</h2><button className="close-modal-btn" onClick={() => setModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p>Show this QR code to the concierge to collect your package.</p>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=residentId:1234,packageId:1ZA...F45" alt="QR Code" className="qr-code-large" />
                            <p><strong>For: John Resident (Unit 101)</strong></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackagePickupPage;