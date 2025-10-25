import React, { useState } from 'react';
import './ArchitecturalRequestPage.css';

const ArchitecturalRequestPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    
    // State for all the modals
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [isApprovedModalOpen, setApprovedModalOpen] = useState(false);
    const [isDeclineReasonModalOpen, setDeclineReasonModalOpen] = useState(false);
    const [isDeclinedModalOpen, setDeclinedModalOpen] = useState(false);

    // Mock data for the list
    const requests = [
        { id: 1, title: "Kitchen Renovation", unit: "1402", resident: "Jane D.", date: "Sep 25, 2025", status: "Pending Review" }
    ];

    const openReview = () => setReviewModalOpen(true);
    const closeAllModals = () => {
        setReviewModalOpen(false);
        setApprovedModalOpen(false);
        setDeclineReasonModalOpen(false);
        setDeclinedModalOpen(false);
    };

    const handleApprove = () => {
        setReviewModalOpen(false);
        setApprovedModalOpen(true);
    };

    const handleDeny = () => {
        setReviewModalOpen(false);
        setDeclineReasonModalOpen(true);
    };

    const handleConfirmDecline = () => {
        setDeclineReasonModalOpen(false);
        setDeclinedModalOpen(true);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Architectural Requests</h1><p>Review and manage resident modification requests.</p></div>
            </header>

            <main className="hub-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Pending Review</button>
                    <button className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>Approved</button>
                    <button className={`tab-btn ${activeTab === 'denied' ? 'active' : ''}`} onClick={() => setActiveTab('denied')}>Denied</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'pending' ? 'active' : ''}`}>
                        <div className="request-list">
                            {requests.map(req => (
                                <div key={req.id} className="request-row">
                                    <div className="request-info"><div className="title">{req.title}</div><div className="meta">Unit {req.unit} • {req.resident}</div></div>
                                    <div>{req.date}</div>
                                    <div className="status-pill status-pending">{req.status}</div>
                                    <div><button onClick={openReview} style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 600 }}>Review</button></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Main Review Modal */}
            {isReviewModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Review Request: Kitchen Renovation</h2><button className="close-modal-btn" onClick={() => setReviewModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="section resident-submission">
                                <h3>Resident Submission</h3>
                                <p><strong>From:</strong> Jane D. (Unit 1402)</p>
                                <p><strong>Submitted:</strong> September 25, 2025</p>
                                <p><strong>Description:</strong> "Requesting approval to renovate the kitchen..."</p>
                                <h3>Attached Documents</h3>
                                <div className="document-grid">
                                    <div className="doc-card"><div className="doc-icon">📄</div><div className="doc-name">Floor_Plan.pdf</div></div>
                                    <div className="doc-card"><div className="doc-icon">📄</div><div className="doc-name">Contractor_Insurance.pdf</div></div>
                                </div>
                            </div>
                            <div className="section manager-toolbox">
                                <h3>Decision</h3>
                                <div className="action-buttons">
                                    <button className="action-btn btn-approve" onClick={handleApprove}>Approve</button>
                                    <button className="action-btn btn-deny" onClick={handleDeny}>Deny</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Approved Confirmation Modal */}
            {isApprovedModalOpen && (
                 <div className="modal-overlay open">
                    <div className="modal-content small-modal-content">
                        <div className="modal-body" style={{ gridTemplateColumns: '1fr' }}>
                            <h2 style={{ color: 'var(--accent-green)' }}>Approved!</h2>
                            <p>The resident will be notified.</p>
                            <button className="confirm-btn" onClick={closeAllModals}>Done</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Decline Reason Modal */}
            {isDeclineReasonModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content" style={{ maxWidth: '550px' }}>
                        <div className="modal-header"><h2>Decline Request</h2><button className="close-modal-btn" onClick={() => setDeclineReasonModalOpen(false)}>&times;</button></div>
                        <div className="modal-body" style={{ gridTemplateColumns: '1fr' }}>
                            <div className="form-group"><label>Reason for Decline</label><textarea className="textarea" rows="6" placeholder="Provide a clear reason..."></textarea></div>
                            <button className="confirm-btn" onClick={handleConfirmDecline}>Confirm Decline</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Declined Confirmation Modal */}
            {isDeclinedModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content small-modal-content">
                         <div className="modal-body" style={{ gridTemplateColumns: '1fr' }}>
                            <h2 style={{ color: 'var(--accent-red)' }}>Declined!</h2>
                            <p>The resident has been notified.</p>
                            <button className="confirm-btn" onClick={closeAllModals}>Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchitecturalRequestPage;