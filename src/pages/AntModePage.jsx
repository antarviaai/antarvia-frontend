import React, { useState, useEffect, useRef } from 'react';
import './AntModePage.css';

const AntModePage = () => {
    // State to hold the list of all messages
    const [messages, setMessages] = useState([
        {
            id: 1,
            author: 'Manager',
            avatar: 'PM',
            timestamp: '9:30:15 AM',
            content: <p>Show me all incidents from last night's shift.</p>
        },
        {
            id: 2,
            author: 'ANT',
            avatar: 'ANT',
            timestamp: '9:30:18 AM',
            content: (
                <div className="ant-card">
                    <h3>Incidents: Oct 12 (Overnight Shift)</h3>
                    <div className="info-row">
                        <label>03:45 AM - Noise Complaint</label>
                        <span>Unit 508. Guard: David Chen. Status: Resolved.</span>
                    </div>
                    <div className="info-row">
                        <label>01:15 AM - Parking Violation</label>
                        <span>Visitor Parking, Plate XYZ 456. Guard: David Chen. Status: Ticket Issued.</span>
                    </div>
                </div>
            )
        }
    ]);
    
    // State for the text in the input box
    const [inputText, setInputText] = useState('');

    // Ref to the conversation log for auto-scrolling
    const conversationLogRef = useRef(null);

    // Effect to scroll to the bottom whenever a new message is added
    useEffect(() => {
        if (conversationLogRef.current) {
            conversationLogRef.current.scrollTop = conversationLogRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            author: 'Manager',
            avatar: 'PM',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: <p>{inputText}</p>
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                author: 'ANT',
                avatar: 'ANT',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                content: (
                    <div className="ant-card">
                        <h3>Query Acknowledged</h3>
                        <p>I am processing your request for: "{userMessage.content.props.children}". This is a simulated response.</p>
                    </div>
                )
            };
            
            setMessages(prev => [...prev, aiResponse]);

        }, 1500);
    };

    return (
        <div className="chat-wrapper">
            <header className="chat-header">
                <div className="title-group">
                    <h1>ANT Mode</h1>
                </div>
                {/* Info button has been completely removed */}
            </header>
            
            <main className="conversation-log" ref={conversationLogRef}>
                {messages.map(message => (
                    <div key={message.id} className={`message-entry ${message.author === 'Manager' ? 'manager-query' : 'ant-response'}`}>
                        {message.author === 'ANT' && <div className="entry-avatar">{message.avatar}</div>}
                        <div className="entry-content">
                            <div className="entry-header">
                                <span className="entry-timestamp">{message.timestamp}</span>
                                <span className="entry-author">{message.author === 'Manager' ? 'You' : 'ANT Assistant'}</span>
                            </div>
                            <div className="entry-body">{message.content}</div>
                        </div>
                        {message.author === 'Manager' && <div className="entry-avatar">{message.avatar}</div>}
                    </div>
                ))}
            </main>
            
            <footer className="composer">
                <input 
                    type="text" 
                    className="composer-input" 
                    placeholder="Ask ANT about building activity..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="composer-btn" aria-label="Send" onClick={handleSendMessage}>➤</button>
            </footer>

            {/* The entire Info Modal has been removed */}
        </div>
    );
};

export default AntModePage;