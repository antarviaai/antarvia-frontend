import React, { useState } from 'react';
import './UserManagementPage.css';

const UserManagementPage = () => {
    // State to control the "Add Staff" modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Mock data for the staff list. We'll fetch this from the API later.
    const staff = [
        { id: 1, name: 'David Chen', role: 'Guard (Supervisor)', email: 'd.chen@antsecurity.com' },
        { id: 2, name: 'John Smith', role: 'Superintendent', email: 'jsmith@building.com' },
        { id: 3, name: 'Maria Garcia', role: 'Cleaner', email: 'm.garcia@cleanco.com' },
    ];

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>User Management</h1>
                    <p>Oversee all staff accounts in the building.</p>
                </div>
                <button className="add-user-btn" onClick={() => setIsAddModalOpen(true)}>
                    <span>+ Add Staff Member</span>
                </button>
            </header>

            <main className="hub-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map(member => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.role}</td>
                                <td>{member.email}</td>
                                <td><button className="view-btn">View Profile</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {/* "Add Staff Member" Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New Staff Member</h2>
                            <button className="close-modal-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group full-width">
                                <label htmlFor="role">Role</label>
                                <select id="role" className="select">
                                    <option>Guard</option>
                                    <option>Supervisor</option>
                                    <option>Cleaner</option>
                                    <option>Superintendent</option>
                                    <option>Manager</option>
                                </select>
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>First Name</label><input type="text" className="input" /></div>
                                <div className="form-group"><label>Last Name</label><input type="text" className="input" /></div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>Email Address</label><input type="email" className="input" /></div>
                                <div className="form-group"><label>Phone Number</label><input type="tel" className="input" /></div>
                            </div>
                            <div className="modal-footer">
                                <button className="add-user-btn">Save Staff Member</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;