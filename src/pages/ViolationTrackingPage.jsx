import React, { useState } from 'react';
import './ViolationTrackingPage.css';

const ViolationTrackingPage = () => {
    // State to control the modals
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // State to hold data for the "View" modal
    const [viewData, setViewData] = useState({});
    
    // Static data for now, we'll fetch this from the API later
    const violations = [
        {
            _id: '1',
            title: 'Improper Balcony Storage',
            unit: '1402',
            resident: 'Jane D.',
            date: 'Sep 25, 2025',
            status: 'Notice Sent',
            details: "A routine patrol noted a large, non-patio furniture item (a bicycle) being stored on the balcony, in violation of bylaw 12.3."
        }
    ];

    const handleOpenViewModal = (violation) => {
        setViewData(violation);
        setIsViewModalOpen(true);
    };
    
    const handleLogViolation = () => {
        // We will add API call logic here later
        setIsNewModalOpen(false);
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2500);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Violation Tracking</h1>
                    <p>Log and send official notices for rule infractions.</p>
                </div>
                <button className="new-violation-btn" onClick={() => setIsNewModalOpen(true)}>
                    <span>+ New Violation</span>
                </button>
            </header>

            <main className="hub-container">
                <div className="hub-header">
                    <h2>Notice History</h2>
                    <div className="search-bar">{/* Search bar can be implemented later */}</div>
                </div>
                <div className="violation-list">
                    {violations.map(v => (
                        <div key={v._id} className="violation-card">
                            <div className="violation-card-details">
                                <div className="info-group"><div className="title">{v.title}</div><div className="meta">Unit {v.unit} • {v.resident}</div></div>
                                <div className="info-group"><div className="meta">Sent: {v.date}</div></div>
                                <div className="notice-tag">{v.status}</div>
                            </div>
                            <button className="view-btn" onClick={() => handleOpenViewModal(v)}>View</button>
                        </div>
                    ))}
                </div>
            </main>

            {/* "New Violation" Modal */}
            {isNewModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Log New Violation</h2><button className="close-modal-btn" onClick={() => setIsNewModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">{/* Form content from your HTML */}</div>
                        <div className="modal-footer"><button className="new-violation-btn" onClick={handleLogViolation}>Log Violation & Notify Resident</button></div>
                    </div>
                </div>
            )}

            {/* "View Violation" Modal */}
            {isViewModalOpen && (
                 <div className="modal-overlay open">
                    <div className="modal-content" style={{ maxWidth: '700px' }}>
                       <div className="modal-header">
                           <h2>Report: {viewData.title}</h2>
                           <div>
                               <button style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '8px 15px', borderRadius: '8px', fontWeight: 600 }}>Download as PDF</button>
                               <button className="close-modal-btn" onClick={() => setIsViewModalOpen(false)}>&times;</button>
                           </div>
                       </div>
                       <div className="modal-body">
                           <p><strong>Unit:</strong> <span>{viewData.unit} • {viewData.resident}</span></p>
                           <p><strong>Violation:</strong> <span>{viewData.title}</span></p>
                           <p><strong>Date:</strong> <span>{viewData.date}</span></p>
                           <hr style={{ borderColor: 'var(--glass-border)', margin: '20px 0' }} />
                           <p><strong>Details:</strong></p>
                           <p>{viewData.details}</p>
                       </div>
                   </div>
               </div>
            )}
            
            {/* Confirmation Overlay */}
            {showConfirmation && (
                <div className="confirmation-overlay show">
                    <div className="confirmation-message" style={{ textAlign: 'center' }}><h2>Notice Sent</h2><p>The resident has been notified of the violation.</p></div>
                </div>
            )}
        </div>
    );
};

export default ViolationTrackingPage;