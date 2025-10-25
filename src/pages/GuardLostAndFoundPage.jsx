import React, { useState } from 'react';
import './GuardLostAndFoundPage.css';

const initialItems = [
    { id: 1, desc: 'Black iPhone 14 Pro', location: 'Lobby near elevators', date: 'Sep 25, 2025', photo: 'https://images.unsplash.com/photo-1603625953304-97b6e4b28b55?w=400', status: 'awaiting' },
    { id: 2, desc: 'Set of keys on blue lanyard', location: 'P2 Garage', date: 'Sep 24, 2025', photo: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=400', status: 'awaiting' },
    { id: 3, desc: 'Brown Leather Wallet', location: 'Gym', date: 'Sep 23, 2025', photo: 'https://images.unsplash.com/photo-1619119069152-448261ef8554?w=400', status: 'claimed', claimant: 'John S. (Unit 401)' }
];

const GuardLostAndFoundPage = () => {
    const [items, setItems] = useState(initialItems);
    const [isLogModalOpen, setLogModalOpen] = useState(false);
    const [isClaimModalOpen, setClaimModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpenClaimModal = (id) => {
        setSelectedItemId(id);
        setClaimModalOpen(true);
    };

    const handleConfirmClaim = () => {
        // In a real app, you'd get the claimant name from the form
        setItems(items.map(item => 
            item.id === selectedItemId ? { ...item, status: 'claimed', claimant: 'Jane D. (Unit 1203)' } : item
        ));
        setClaimModalOpen(false);
    };

    const awaitingItems = items.filter(item => item.status === 'awaiting');
    const claimedItems = items.filter(item => item.status === 'claimed');

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Lost & Found</h1><p>Manage found items and log resident claims.</p></div>
                <button className="log-item-btn" onClick={() => setLogModalOpen(true)}><span>+ Log New Item</span></button>
            </header>

            <main>
                <section className="awaiting-claim-section">
                    <h2 className="section-title">Awaiting Claim</h2>
                    <div className="item-grid">
                        {awaitingItems.map(item => (
                            <div key={item.id} className="item-card">
                                <div className="item-photo"><img src={item.photo} alt={item.desc} /></div>
                                <div className="item-details">
                                    <p className="item-description">{item.desc}</p>
                                    <p className="item-meta">Found in: {item.location}<br/>Date: {item.date}</p>
                                    <div className="item-actions"><button className="claim-btn" onClick={() => handleOpenClaimModal(item.id)}>Return to Owner</button></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="claimed-history-section" style={{ marginTop: '40px' }}>
                    <h2 className="section-title">Claimed History</h2>
                    <div className="item-grid">
                        {claimedItems.map(item => (
                            <div key={item.id} className="item-card">
                                <div className="item-photo"><img src={item.photo} alt={item.desc} /></div>
                                <div className="item-details">
                                    <p className="item-description">{item.desc}</p>
                                    <p className="item-meta">Found in: {item.location}<br/>Date: {item.date}</p>
                                    <div className="claimed-info"><p>Claimed by: <strong>{item.claimant}</strong></p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Modals */}
            {isLogModalOpen && <div className="modal-overlay open">{/* ... Log Item Modal ... */}</div>}
            {isClaimModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Return Item to Owner</h2><button className="close-modal-btn" onClick={() => setClaimModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Claimant's Name</label><input type="text" className="input" /></div>
                            <div className="form-group"><label>Claimant's Unit #</label><input type="text" className="input" /></div>
                            <div className="form-group" style={{display:'flex', alignItems:'center', gap: '10px'}}><input type="checkbox" id="verify-owner" style={{width:'20px', height:'20px'}} /><label htmlFor="verify-owner" style={{margin:0}}>I have verified the claimant is the true owner.</label></div>
                        </div>
                        <div className="modal-footer"><button className="claim-btn" style={{width:'100%'}} onClick={handleConfirmClaim}>Confirm Claim</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuardLostAndFoundPage;