// src/pages/MaintenanceRequestPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MaintenanceRequestPage.css';

function MaintenanceRequestPage() {
    // State for modals
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    
    // State for form fields
    const [category, setCategory] = useState('Plumbing');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [permissionToEnter, setPermissionToEnter] = useState(true);
    
    // State for request list and messages
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/requests', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/requests', 
                { category, location, details, permissionToEnter },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setIsRequestModalOpen(false);
            await fetchRequests(); 
            setMessage('Request submitted successfully!');
        } catch (error) {
            setMessage('Failed to submit request. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="title-group">
                    <div>
                        <h1>Maintenance</h1>
                        <p>Submit and track requests for your unit.</p>
                    </div>
                    <button className="info-btn" onClick={() => setIsInfoModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.055.492.112.558.112.065 0 .104-.044.104-.112-.002-.066-.038-.12-.112-.169l-.256-.16c-.225-.141-.39-.253-.498-.377-.24-.287-.378-.65-.378-1.096 0-.71.516-1.319 1.362-1.319.845 0 1.355.609 1.355 1.319 0 .445-.138.81-.378 1.096-.108.124-.273.236-.498-.377l-.256.16c-.073.049-.11.103-.11.169 0 .068.038.112.103.112.066 0 .265-.057.56-.113l.451-.083.082.381-2.29-.287zM8 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                    </button>
                </div>
                <button className="new-request-btn" onClick={() => setIsRequestModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
                    <span>New Request</span>
                </button>
            </header>
            <main>
                {message && <p style={{color: 'lightgreen', textAlign: 'center', marginBottom: '20px'}}>{message}</p>}
                <section className="request-section">
                  <h2 className="section-title">My Request History</h2>
                  <div className="request-list">
                    {requests.length > 0 ? (
                      requests.map(request => (
                        <div className="request-card" key={request._id}>
                          <div className="details">
                            <div className="icon" style={{ color: '#FF9F0A' }}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M12.166 8.94c-.396-.396-1.039-.396-1.435 0l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a1.01 1.01 0 0 1 0-1.435l2.5-2.5a.5.5 0 0 1 .708 0l2.5 2.5c.396.396.396 1.039 0 1.435zM5.435 4.565c.396-.396 1.039-.396 1.435 0l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5c.396-.396.396-1.039 0-1.435l-2.5-2.5a.5.5 0 0 0-.708 0l-2.5 2.5c-.396.396-.396 1.039 0 1.435z"/></svg></div>
                            <div className="info">
                              <div className="title">{request.location}: {request.category}</div>
                              <div className="date">Submitted: {new Date(request.submittedDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className={`status-pill ${request.status.toLowerCase().replace(' ', '-')}`}>{request.status}</div>
                        </div>
                      ))
                    ) : (
                      <p style={{color: '#A0A0A5', textAlign: 'center'}}>You have no maintenance requests.</p>
                    )}
                  </div>
                </section>
            </main>

            <div className={`modal-overlay ${isRequestModalOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header"><h2>New Maintenance Request</h2><button type="button" className="close-modal-btn" onClick={() => setIsRequestModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group"><label>Category</label><select className="select" value={category} onChange={e => setCategory(e.target.value)}><option>Plumbing</option><option>Electrical</option><option>Appliance</option><option>HVAC (Heating/Cooling)</option><option>General / Other</option></select></div>
                                <div className="form-group"><label>Location / Room</label><input type="text" className="input" placeholder="e.g., Kitchen" value={location} onChange={e => setLocation(e.target.value)} required /></div>
                            </div>
                            <div className="form-group full-width"><label>Please describe the issue</label><textarea className="textarea" placeholder="Example: The faucet of the kitchen sink is constantly dripping..." value={details} onChange={e => setDetails(e.target.value)} required></textarea></div>
                            <div className="form-group full-width"><label>Add a Photo or Video (Optional)</label><input type="file" className="input" /></div>
                            <div className="form-group full-width">
                                <div className="permission-toggle">
                                    <label>Permission to enter your unit if you are not home?</label>
                                    <label className="switch"><input type="checkbox" checked={permissionToEnter} onChange={e => setPermissionToEnter(e.target.checked)} /><span className="slider"></span></label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"><button type="submit" className="new-request-btn">Submit Request</button></div>
                    </form>
                </div>
            </div>

            <div className={`modal-overlay ${isInfoModalOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <div className="modal-header"><h2>Important Information</h2><button type="button" className="close-modal-btn" onClick={() => setIsInfoModalOpen(false)}>&times;</button></div>
                    <div className="modal-body">
                        <p>All maintenance requests submitted through this portal are sent directly to the <strong>Property Management office</strong> for review and assignment.</p>
                        <p>For urgent matters... please contact the <strong>24/7 security desk or 911 directly.</strong></p>
                    </div>
                    <div className="modal-footer-text">~ Team ANT</div>
                </div>
            </div>
        </div>
    );
}

export default MaintenanceRequestPage;