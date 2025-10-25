import React, { useState, useEffect } from 'react';
import './OnlinePaymentsPage.css';

const OnlinePaymentsPage = () => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [isSplitModalOpen, setSplitModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    
    const totalBalance = 2450.75;
    const [yourShare, setYourShare] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(totalBalance);

    useEffect(() => {
        const share = parseFloat(yourShare) || 0;
        setRemainingBalance((totalBalance - share).toFixed(2));
    }, [yourShare, totalBalance]);

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Online Payments</h1><p>Manage your balance, payment methods, and view history.</p></div>
                <button className="info-btn" onClick={() => setInfoModalOpen(true)} aria-label="Payment Security Information">{/* SVG Icon */}</button>
            </header>

            <main>
                <div className="payment-card">
                    <div className="due-date">Due October 1, 2025</div>
                    <div className="due-amount">${totalBalance.toFixed(2)}</div>
                    <div className="payment-actions">
                        <button className="pay-now-btn" onClick={() => setPaymentModalOpen(true)}>Pay Full Balance</button>
                        <button className="quick-action-btn" onClick={() => setSplitModalOpen(true)}>Split Bill</button>
                    </div>
                </div>
            </main>
            
            <section className="history-section">{/* ... Payment History JSX ... */}</section>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Confirm Payment</h2><button className="close-modal-btn" onClick={() => setPaymentModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Amount</label><input type="text" className="input" value={`$${totalBalance.toFixed(2)}`} disabled /></div>
                            <div className="form-group"><label>Payment Method</label><select className="select"><option>Visa **** 4242</option></select></div>
                            <button className="pay-now-btn" style={{width:'100%'}}>Pay ${totalBalance.toFixed(2)} Now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Split Bill Modal */}
            {isSplitModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Split Balance</h2><button className="close-modal-btn" onClick={() => setSplitModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Your Share</label><input type="number" className="input" placeholder="e.g., 1225.38" value={yourShare || ''} onChange={(e) => setYourShare(e.target.value)} /></div>
                            <div className="split-summary">
                                <div className="row"><span>Total Balance:</span><span>${totalBalance.toFixed(2)}</span></div>
                                <div className="row total"><span>Remaining for Roommates:</span><span>${remainingBalance}</span></div>
                            </div>
                            <button className="pay-now-btn" style={{width:'100%', marginTop: '20px'}}>Pay Your Share</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Info Modal */}
            {isInfoModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Security & Privacy</h2><button className="close-modal-btn" onClick={() => setInfoModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p><strong>Bank-Level Security:</strong> All financial transactions are processed using industry-standard SSL encryption.</p>
                            <p><strong>Certified Payment Processor:</strong> We partner with a PCI-compliant third-party payment processor to handle all transactions.</p>
                        </div>
                        <div className="modal-footer">~ Team ANT</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnlinePaymentsPage;