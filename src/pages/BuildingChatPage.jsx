import React, { useState, useEffect, useRef } from 'react';
import './BuildingChatPage.css';

const BuildingChatPage = () => {
    const [messages, setMessages] = useState([
        { userId: 2, name: 'Beatrice C.', avatar: 'BC', text: "Does anyone have a spare phone charger I could borrow for an hour? Mine just died.", timestamp: "5:45 PM" },
        { userId: 3, name: 'Charles D.', avatar: 'CD', text: "I've got an extra one you can have. I'm in unit 1510.", timestamp: "5:47 PM" },
        { userId: 2, name: 'Beatrice C.', avatar: 'BC', text: "You're a lifesaver, Charles! I'll come by in 5 minutes. Thanks!", timestamp: "5:48 PM" },
    ]);
    const [inputText, setInputText] = useState('');
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const chatMessagesRef = useRef(null);

    // Hardcoded current user for now
    const currentUserID = 1;
    const currentUser = { id: 1, name: 'You', avatar: 'RK' };

    useEffect(() => {
        // Scroll to the bottom on new message
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim()) {
            const newMsg = {
                userId: currentUserID,
                name: currentUser.name,
                avatar: currentUser.avatar,
                text: inputText,
                timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setInputText('');
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1 className="title">Building Chat</h1>
                <button className="info-btn" onClick={() => setInfoModalOpen(true)}>{/* SVG Icon */}</button>
            </header>

            <main className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-group ${msg.userId === currentUserID ? 'current-user' : ''}`}>
                        <div className="author-avatar">{msg.avatar}</div>
                        <div className="message-content">
                            <div className="author-name">{msg.name} <span className="timestamp">{msg.timestamp}</span></div>
                            <div className="message-bubble">{msg.text}</div>
                        </div>
                    </div>
                ))}
            </main>

            <footer className="chat-composer">
                <textarea 
                    className="chat-input" 
                    placeholder="Type a message..." 
                    rows="1"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                ></textarea>
                <button className="send-btn" onClick={handleSendMessage}>➤</button>
            </footer>

            {isInfoModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Chat Guidelines</h2><button className="close-modal-btn" onClick={() => setInfoModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <p>This is a <strong>private and secure</strong> channel for residents.</p>
                            <p><strong>Disclaimer:</strong> This chat is <strong>not monitored by building management.</strong> For official requests or emergencies, please contact management.</p>
                        </div>
                        <div className="modal-footer">~ Team ANT</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuildingChatPage;