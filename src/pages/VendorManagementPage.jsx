import React, { useState } from 'react';
import './VendorManagementPage.css';

const VendorManagementPage = () => {
    const [activeTab, setActiveTab] = useState('directory');
    const [isAddVendorModalOpen, setAddVendorModalOpen] = useState(false);
    const [isAddPoModalOpen, setAddPoModalOpen] = useState(false);

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Vendor & Procurement</h1><p>Manage approved vendors and track purchase orders.</p></div>
                <div className="header-actions">
                    <button className="action-btn" onClick={() => setAddPoModalOpen(true)}>+ Create Purchase Order</button>
                    <button className="action-btn" onClick={() => setAddVendorModalOpen(true)}>+ Add New Vendor</button>
                </div>
            </header>

            <main className="hub-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'directory' ? 'active' : ''}`} onClick={() => setActiveTab('directory')}>Vendor Directory</button>
                    <button className={`tab-btn ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>Purchase Orders</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'directory' ? 'active' : ''}`}>
                        <div className="vendor-grid">
                            <div className="vendor-card"><h3 className="name">ACME Plumbing</h3><p className="trade">Plumbing</p><p className="contact-info">Contact: Mike Johnson</p><p className="contact-info">Phone: (416) 555-0101</p></div>
                            <div className="vendor-card"><h3 className="name">Volt Electrical</h3><p className="trade">Electrical</p><p className="contact-info">Contact: Sarah Connor</p><p className="contact-info">Phone: (416) 555-0102</p></div>
                        </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'pos' ? 'active' : ''}`}>
                        <table className="po-table">
                            <thead><tr><th>PO #</th><th>Vendor</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
                            <tbody>
                                <tr><td>PO-2025-101</td><td>ACME Plumbing</td><td>Fix leak in Unit 1402</td><td>$350.00</td><td><span className="status-pill completed">Completed</span></td></tr>
                                <tr><td>PO-2025-102</td><td>Volt Electrical</td><td>Replace lobby light fixture</td><td>$800.00</td><td><span className="status-pill issued">Issued</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Vendor Modal */}
            {isAddVendorModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Add New Vendor</h2><button className="close-modal-btn" onClick={() => setAddVendorModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Company Name</label><input type="text" className="input" /></div>
                            <div className="form-group"><label>Trade</label><select className="select"><option>Plumbing</option><option>Electrical</option><option>HVAC</option></select></div>
                            <div className="form-group"><label>Contact Person</label><input type="text" className="input" /></div>
                            <div className="form-group"><label>Phone Number</label><input type="tel" className="input" /></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add PO Modal */}
            {isAddPoModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Create Purchase Order</h2><button className="close-modal-btn" onClick={() => setAddPoModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Select Vendor</label><select className="select"><option>ACME Plumbing</option><option>Volt Electrical</option></select></div>
                            <div className="form-group"><label>Description of Work</label><textarea className="textarea" rows="4"></textarea></div>
                            <div className="form-group"><label>Quoted Amount ($)</label><input type="number" className="input" /></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorManagementPage;