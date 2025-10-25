import React, { useState } from 'react';
import './AnnouncementsPage.css';

// Mock data based on your HTML design
const allAnnouncements = [
    { id: 1, title: "Elevator Maintenance & Downtime", date: "Posted Today, September 24, 2025", category: "Urgent", unread: false, fulltext: "Please be advised that the North Tower elevator will be out of service for scheduled annual maintenance from 9:00 AM to 5:00 PM on Friday, September 26th.\n\nPlease use the South Tower elevator during this time. We apologize for the inconvenience and appreciate your understanding." },
    { id: 2, title: "Annual Fall BBQ", date: "Sep 22, 2025", category: "Community", unread: true, fulltext: "Join us in the courtyard for the annual fall BBQ on Saturday, October 4th! Free food and drinks for all residents. We will have vegetarian and gluten-free options available. Please RSVP via the events page so we can get a headcount." },
    { id: 3, title: "Window Washing Schedule", date: "Sep 19, 2025", category: "Maintenance", unread: false, fulltext: "The exterior window washing for the building will commence next week.\n\nSchedule:\n- Floors 20-30: Monday, Sep 29th\n- Floors 10-19: Tuesday, Sep 30th\n- Floors 1-9: Wednesday, Oct 1st\n\nPlease ensure your windows are closed securely on your scheduled day." },
];

const AnnouncementsPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const openAnnouncementModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setModalOpen(true);
    };
    
    // We will replace this with a real API call later
    const filteredAnnouncements = allAnnouncements.filter(ann => {
        if (activeFilter === 'All') return true;
        return ann.category === activeFilter;
    });

    const featured = allAnnouncements.find(a => a.category === 'Urgent');

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>Announcements</h1><p>Official news and updates from management.</p></div>
            </header>

            {featured && (
                <section className="featured-announcement">
                    <div className="featured-card" onClick={() => openAnnouncementModal(featured)}>
                        <div className="featured-header">{/* ... SVG Icon ... */}<span>URGENT & IMPORTANT</span></div>
                        <h2>{featured.title}</h2>
                        <p className="preview-text">{featured.fulltext.substring(0, 120)}...</p>
                        <div className="date">{featured.date}</div>
                    </div>
                </section>
            )}

            <section className="announcements-timeline">
                <div className="filter-tabs">
                    {['All', 'Urgent', 'Maintenance', 'Community'].map(filter => (
                        <button key={filter} className={`tab ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>{filter}</button>
                    ))}
                </div>
                
                <div className="announcement-list">
                    {filteredAnnouncements.map(ann => (
                        <div key={ann.id} className="announcement-card" onClick={() => openAnnouncementModal(ann)}>
                            <div className="indicator-col">{ann.unread && <div className="unread-dot"></div>}</div>
                            <div className="content-col">
                                <div className="card-header">
                                    <h3><span className={`tag ${ann.category.toLowerCase()}`}>{ann.category}</span>{ann.title}</h3>
                                    <div className="date">{ann.date}</div>
                                </div>
                                <div className="card-body">{ann.fulltext.substring(0, 100)}...</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Announcement Detail Modal */}
            {isModalOpen && selectedAnnouncement && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>{selectedAnnouncement.title}</h2><button className="close-modal-btn" onClick={() => setModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p className="modal-date">{selectedAnnouncement.date}</p>
                            <p className="modal-body-content">{selectedAnnouncement.fulltext}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnouncementsPage;