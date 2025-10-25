import React, { useState } from 'react';
import './VisitorPassPage.css';

const VisitorPassPage = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [parkingNeeded, setParkingNeeded] = useState('no');

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Visitor Passes</h1><p>Create and manage passes for your guests.</p></div>
                <button className="new-pass-btn" onClick={() => setCreateModalOpen(true)}>
                    <span>+ New Pass</span>
                </button>
            </header>

            <main>
                <section className="upcoming-passes">
                    <h2 className="section-title">Upcoming & Active Passes</h2>
                    <div className="pass-list">
                        <div className="pass-card">
                            <div className="pass-card-header"><span className="brand">ANT • Guest Pass</span><span className="status">ACTIVE</span></div>
                            <div className="pass-card-body">
                                <div className="visitor-name">Jane Doe</div>
                                <div className="unit-number">For Unit 1203</div>
                                <div className="pass-info-grid">
                                    <div className="info-item"><label>VALID FROM</label><span>Today at 7:00 PM</span></div>
                                    <div className="info-item"><label>VALID UNTIL</label><span>Today at 11:00 PM</span></div>
                                </div>
                                <div className="pass-details-grid">{/* Details Here */}</div>
                            </div>
                            <div className="pass-card-footer"><button className="share-btn" onClick={() => setShareModalOpen(true)}>Share Pass</button></div>
                        </div>
                    </div>
                </section>
                
                <section className="past-visitors" style={{ marginTop: '40px' }}>
                    <h2 className="section-title">Past Visitors</h2>
                    <div className="pass-list past-visitors-list">
                        <div className="pass-card">{/* Expired Pass Card */}</div>
                    </div>
                </section>
            </main>

            {/* Create Pass Modal */}
            {isCreateModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>New Visitor Pass</h2><button className="close-modal-btn" onClick={() => setCreateModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Visitor's Full Name</label><input type="text" className="input" placeholder="e.g., Jane Doe" /></div>
                            <div className="form-grid">
                                <div className="form-group"><label>From</label><input type="datetime-local" className="input" /></div>
                                <div className="form-group"><label>To</label><input type="datetime-local" className="input" /></div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Parking Needed?</label>
                                    <div className="parking-toggle">
                                        <input type="radio" id="parking-yes" name="parking" value="yes" checked={parkingNeeded === 'yes'} onChange={() => setParkingNeeded('yes')} />
                                        <label htmlFor="parking-yes">Yes</label>
                                        <input type="radio" id="parking-no" name="parking" value="no" checked={parkingNeeded === 'no'} onChange={() => setParkingNeeded('no')} />
                                        <label htmlFor="parking-no">No</label>
                                    </div>
                                </div>
                                <div className="form-group"><label>Additional Guests</label><input type="number" className="input" defaultValue="0" min="0" /></div>
                            </div>
                            {parkingNeeded === 'yes' && (
                                <div className="form-group license-plate-group" style={{ display: 'block' }}>
                                    <label>License Plate</label><input type="text" className="input" placeholder="e.g., CABC 123" />
                                </div>
                            )}
                            <button className="new-pass-btn" style={{width:'100%'}}>Create Pass</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Pass Modal */}
            {isShareModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content" id="share-pass-modal-content">
                        <div className="modal-header"><h2>Share Pass with Guest</h2><button className="close-modal-btn" onClick={() => setShareModalOpen(false)}>&times;</button></div>
                        <p>Take a screenshot of this pass and send to your guest.</p>
                        <div className="pass-card">{/* Reusable pass card component will go here */}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitorPassPage;