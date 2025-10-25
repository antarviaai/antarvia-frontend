import React, { useState } from 'react';
import './StoreManagementPage.css';

const StoreManagementPage = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);

    // Mock data for the inventory table
    const inventory = [
        { id: 1, name: 'Parking Spot (P2)', price: '$150.00 / month', stock: '3 available' },
        { id: 2, name: 'Storage Locker (Large)', price: '$75.00 / month', stock: '1 available' },
        { id: 3, name: 'Key Fob Replacement', price: '$50.00', stock: '18 available' },
    ];

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Store Management</h1><p>Manage inventory and track resident purchases.</p></div>
                <button className="add-item-btn" onClick={() => setAddItemModalOpen(true)}>
                    <span>+ Add New Item</span>
                </button>
            </header>

            <section className="kpi-grid">
                <div className="kpi-card"><div className="kpi-value">$1,250</div><div className="kpi-label">Sales (This Month)</div></div>
                <div className="kpi-card"><div className="kpi-value">3</div><div className="kpi-label">New Orders</div></div>
                <div className="kpi-card"><div className="kpi-value">22</div><div className="kpi-label">Items in Stock</div></div>
            </section>

            <main className="hub-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Inventory</button>
                    <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
                </nav>
                <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'inventory' ? 'active' : ''}`}>
                        <table className="item-table">
                            <thead><tr><th>Item Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td><button>Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`tab-pane ${activeTab === 'orders' ? 'active' : ''}`}>
                         <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>A list of new and completed orders will appear here.</p>
                    </div>
                </div>
            </main>

            {/* Add Item Modal */}
            {isAddItemModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Add New Store Item</h2><button className="close-modal-btn" onClick={() => setAddItemModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Item Name</label><input type="text" className="input" placeholder="e.g., Parking Spot (P3)" /></div>
                            <div className="form-group"><label>Price</label><input type="text" className="input" placeholder="e.g., 150.00 / month" /></div>
                            <div className="form-group"><label>Stock / Quantity</label><input type="number" className="input" defaultValue="1" /></div>
                            <div className="form-group"><label>Description</label><textarea className="textarea" rows="3"></textarea></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreManagementPage;