import React, { useState, useEffect } from 'react';
import './AnnouncementsHubPage.css';

const AnnouncementsHubPage = () => {
    // State for Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewingAnnouncement, setViewingAnnouncement] = useState(null);

    // State for Data
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        targetAudience: 'all',
        priority: 'Standard',
    });

    // State for UI Feedback
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    // --- Data Fetching ---
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('/api/announcements');
            if (!response.ok) throw new Error('Failed to fetch announcements');
            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // --- Event Handlers ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            setIsCreateModalOpen(false);
            setFormData({ title: '', message: '', targetAudience: 'all', priority: 'Standard' });
            fetchAnnouncements();
            
            setShowSuccessOverlay(true);
            setTimeout(() => setShowSuccessOverlay(false), 2500);

        } catch (error) {
            console.error("Failed to send announcement:", error);
            alert('Failed to create announcement. Please try again.');
        }
    };

    // --- Render Logic ---
    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Announcements Hub</h1><p>Create, schedule, and send notices to residents.</p></div>
                <button className="new-announcement-btn" onClick={() => setIsCreateModalOpen(true)}><span>+ New Announcement</span></button>
            </header>

            <main className="hub-layout">
                <div className="main-column">
                    <div className="card">
                        <h2 className="card-title">History</h2>
                        <div className="announcement-list">
                            {announcements.map((announcement) => (
                                <div key={announcement._id} className="announcement-item" onClick={() => setViewingAnnouncement(announcement)}>
                                    <div className="item-details">
                                        <div className="item-title">{announcement.title || 'No Title'}</div>
                                        <p className="item-meta">
                                            Sent: {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date unknown'} 
                                            to {announcement.targetAudience ? announcement.targetAudience.charAt(0).toUpperCase() + announcement.targetAudience.slice(1) : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="sidebar-column">
                    <div className="card"><h2 className="card-title">Stats</h2><p><strong>Sent This Month:</strong> 12</p><p><strong>Avg. Read Rate:</strong> 85%</p></div>
                    <div className="tip-card" style={{ marginTop: '30px' }}><h3>Pro Tip: AI Poster Generator</h3><p>Need a visually appealing notice? Use the "Generate Poster" option in the composer to create a professional, print-ready PDF announcement with AI.</p></div>
                </div>
            </main>

            {/* Create Announcement Modal */}
            {isCreateModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>New Announcement</h2><button className="close-modal-btn" onClick={() => setIsCreateModalOpen(false)}>&times;</button></div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="composer-body">
                                <div className="content-panel">
                                    <div className="form-group"><label htmlFor="title">Title</label><input type="text" id="title" className="input" value={formData.title} onChange={handleInputChange} required /></div>
                                    <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" className="textarea" value={formData.message} onChange={handleInputChange} required></textarea></div>
                                </div>
                                <div className="options-panel">
                                    <div className="form-group"><label htmlFor="targetAudience">Send To</label><select className="select" id="targetAudience" value={formData.targetAudience} onChange={handleInputChange}><option value="all">All Residents</option><option value="floors">Specific Floors/Units</option><option value="groups">Custom Groups</option></select></div>
                                    <div className="form-group"><label htmlFor="priority">Priority</label><select className="select" id="priority" value={formData.priority} onChange={handleInputChange}><option>Standard</option><option>Urgent</option></select></div>
                                </div>
                            </div>
                            <div className="modal-footer"><button type="button" className="draft-btn">Save Draft</button><button type="submit" className="new-announcement-btn">Send Announcement</button></div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Announcement Modal */}
            {viewingAnnouncement && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>{viewingAnnouncement.title}</h2><button className="close-modal-btn" onClick={() => setViewingAnnouncement(null)}>&times;</button></div>
                        <div className="view-modal-body">
                            <div className="meta-details">
                                <p><strong>Priority:</strong> {viewingAnnouncement.priority}</p>
                                <p><strong>Sent To:</strong> {viewingAnnouncement.targetAudience.charAt(0).toUpperCase() + viewingAnnouncement.targetAudience.slice(1)}</p>
                                <p><strong>Date:</strong> {new Date(viewingAnnouncement.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                            </div>
                            <p className="message-content">{viewingAnnouncement.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Overlay */}
            {showSuccessOverlay && (
                <div className="success-overlay"><div className="success-message-box">Announcement Sent!</div></div>
            )}
        </div>
    );
};

export default AnnouncementsHubPage;