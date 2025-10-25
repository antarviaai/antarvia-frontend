import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/users/profile', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    if (!user) {
        return <div>Loading profile...</div>; // Or a spinner component
    }

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>My Profile & Unit</h1><p>Manage your personal information, documents, and settings.</p></div>
            </header>
            
            <div className="important-note">{/* Note content here */}</div>

            <main className="profile-dashboard">
                <div className="main-column">
                    <div className="profile-card">
                        <div className="card-header"><h2>My Profile</h2><button className="action-btn">Edit</button></div>
                        <div className="info-row"><label>Full Name</label><span className="value">{user.firstName} {user.lastName}</span></div>
                        <div className="info-row"><label>Email Address</label><span className="value">{user.email}</span></div>
                        <div className="info-row"><label>Phone Number</label><span className="value">(Not set)</span></div>
                    </div>
                    <div className="profile-card"><div className="card-header"><h2>My Vehicles</h2><button className="action-btn">Add Vehicle</button></div></div>
                    <div className="profile-card"><div className="card-header"><h2>My Pets</h2><button className="action-btn">Add Pet</button></div></div>
                </div>

                <div className="sidebar-column">
                    <div className="profile-card">
                        <div className="card-header" style={{ marginBottom: '20px' }}><h2>Unit Details</h2></div>
                        <div className="info-row"><label>Unit Number</label><span className="value">{user.unitNumber}</span></div>
                    </div>
                    <div className="profile-card"><div className="card-header"><h2>Secure Documents</h2><button className="action-btn">Upload File</button></div></div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;