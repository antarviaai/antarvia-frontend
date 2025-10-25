import React, { useState, useEffect, useRef } from 'react';
import './GuardAntModePage.css';

const GuardAntModePage = () => {
    const [messages, setMessages] = useState([
        { author: 'Guard', avatar: 'DC', timestamp: '3:48:05 AM', content: <p>Show me all recent activity for unit 801.</p> },
        { author: 'ANT', avatar: 'ANT', timestamp: '3:48:07 AM', content: (
            <div className="ant-card">
                <h3>Unit Profile: 801</h3>
                <div className="info-row"><label>Primary Resident</label><span>Beatrice C.</span></div>
                <div className="info-row"><label>Contact Phone</label><span>(416) 555-5678</span></div>
                <div className="info-row"><label>Recent Activity</label><span>3 events found.</span></div>
            </div>
        )}
    ]);
    const [inputText, setInputText] = useState('');
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const logRef = useRef(null);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        // Logic to send message and get AI response will go here
        setInputText('');
    };

    return (
        <div className="chat-wrapper">
            <header className="chat-header">
                <div className="title-group"><h1>ANT Mode</h1></div>
                <button className="info-btn" onClick={() => setInfoModalOpen(true)}>{/* Info SVG */}</button>
            </header>
            <main className="conversation-log" ref={logRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`log-entry ${msg.author === 'Guard' ? 'guard-entry' : 'ant-response'}`}>
                        <div className="entry-avatar">{msg.avatar}</div>
                        <div className="entry-content">
                            <div className="entry-header">
                                {msg.author === 'Guard' && <span className="entry-timestamp">{msg.timestamp}</span>}
                                <span className="entry-author">{msg.author === 'Guard' ? 'You' : 'ANT Assistant'}</span>
                                {msg.author !== 'Guard' && <span className="entry-timestamp">{msg.timestamp}</span>}
                            </div>
                            <div className="entry-body">{msg.content}</div>
                        </div>
                    </div>
                ))}
            </main>
            <footer className="composer">
                <input type="text" className="composer-input" placeholder="Log an event or ask ANT a question..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                <button className="composer-btn" onClick={handleSendMessage}>➤</button>
            </footer>

            {isInfoModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>About ANT Mode</h2><button className="close-modal-btn" onClick={() => setInfoModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p><strong>ANT Mode is your AI-powered operational log.</strong> Every entry you make is recorded and becomes part of the building's searchable memory.</p>
                            <p>You can log events in plain language (e.g., "Package for unit 405 from Amazon arrived") or ask questions about past events (e.g., "Show me all visitor passes for today").</p>
                        </div>
                        <div className="modal-footer">~ Team ANT</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuardAntModePage;