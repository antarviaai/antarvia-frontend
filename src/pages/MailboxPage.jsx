import React, { useState, useEffect } from 'react';
import './MailboxPage.css';

// Mock data, just like in your HTML file's script
const mockEmails = {
    inbox: [
        { id: 1, sender: 'Alex R. (1203)', avatar: 'AR', subject: 'Re: Your recent package', body: 'Thanks for the quick alert! I appreciate you letting me know.', unread: true },
        { id: 2, sender: 'Jane D. (801)', avatar: 'JD', subject: 'Amenity booking question', body: 'Hi there, is the party room available this coming Saturday? Looking to book it for a small gathering.', unread: true },
        { id: 3, sender: 'Management Bot', avatar: '🤖', subject: 'Weekly Summary Report', body: 'Your weekly building performance report is ready. Click here to view.', unread: false },
    ],
    sent: [
        { id: 4, sender: 'To: Maintenance Team', avatar: 'MT', subject: 'Leaking pipe in P2 garage', body: 'Please investigate a leaking pipe reported near stall 4B. A resident mentioned it this morning.', unread: false }
    ],
    drafts: [
        { id: 5, sender: 'To: All Residents', avatar: 'AR', subject: '[DRAFT] Upcoming Fire Alarm Testing', body: 'This is a reminder that the annual fire alarm testing will be conducted on...', unread: false }
    ]
};

const MailboxPage = () => {
    const [activeFolder, setActiveFolder] = useState('inbox');
    const [messages, setMessages] = useState([]);
    const [activeMessage, setActiveMessage] = useState(null);
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    // This effect runs when the activeFolder changes
    useEffect(() => {
        const currentMessages = mockEmails[activeFolder] || [];
        setMessages(currentMessages);
        // Automatically select the first message in the list
        if (currentMessages.length > 0) {
            setActiveMessage(currentMessages[0]);
        } else {
            setActiveMessage(null); // Clear reading pane if folder is empty
        }
    }, [activeFolder]);
    
    return (
        <div className="page-wrapper">
            <header className="page-header"><h1>Mailbox</h1></header>

            <div className="mailbox-container">
                {/* Folders Panel */}
                <div className="folders-panel">
                    <button className="compose-btn" onClick={() => setIsComposeOpen(true)}><span>+ Compose</span></button>
                    <ul className="folder-list">
                        <li className={`folder-item ${activeFolder === 'inbox' ? 'active' : ''}`} data-folder="inbox" onClick={() => setActiveFolder('inbox')}>
                            <a><span className="unread-count">2</span>Inbox</a>
                        </li>
                        <li className={`folder-item ${activeFolder === 'sent' ? 'active' : ''}`} data-folder="sent" onClick={() => setActiveFolder('sent')}>
                            <a>Sent</a>
                        </li>
                        <li className={`folder-item ${activeFolder === 'drafts' ? 'active' : ''}`} data-folder="drafts" onClick={() => setActiveFolder('drafts')}>
                            <a>Drafts</a>
                        </li>
                    </ul>
                </div>

                {/* Message List Panel */}
                <div className="message-list-panel">
                    <div className="message-list">
                        {messages.map(email => (
                            <div 
                                key={email.id} 
                                className={`message-item ${email.unread ? 'unread' : ''} ${activeMessage?.id === email.id ? 'active' : ''}`}
                                onClick={() => setActiveMessage(email)}
                            >
                                <div className="sender-info">
                                    <div className="sender-avatar">{email.avatar}</div>
                                    <span>{email.sender}</span>
                                </div>
                                <p className="subject">{email.subject}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reading Pane */}
                <div className="reading-pane">
                    {activeMessage ? (
                        <>
                            <div className="mail-header">
                                <h2 className="mail-subject">{activeMessage.subject}</h2>
                                <div className="mail-sender"><strong>From:</strong> {activeMessage.sender}</div>
                            </div>
                            <div className="mail-body">
                                <p>{activeMessage.body}</p>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--text-secondary)'}}>
                            <p>Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {isComposeOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>New Message</h2><button className="close-modal-btn" onClick={() => setIsComposeOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>To:</label><input type="text" className="input" placeholder="Type a name, unit, or group..." /></div>
                            <div className="form-group"><label>Subject:</label><input type="text" className="input" /></div>
                            {/* Simplified editor for now */}
                            <textarea className="message-textarea" style={{minHeight: '200px', background: 'var(--bg-element)', padding: '10px', borderRadius: '8px'}} placeholder="Type your message..."></textarea>
                        </div>
                        <div className="modal-footer">
                            <button className="send-btn" onClick={() => setIsComposeOpen(false)}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MailboxPage;