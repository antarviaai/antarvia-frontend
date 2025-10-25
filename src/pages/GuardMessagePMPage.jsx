import React, { useState, useEffect, useRef } from 'react';
import './GuardMessagePMPage.css';

const GuardMessagePMPage = () => {
    const [messages, setMessages] = useState([
        { type: 'incoming', text: "Hey David, just a heads up, the elevator technicians will be on site around 10 AM.", time: '10:30 AM' },
        { type: 'outgoing', text: "Copy that. Thanks for the update.", time: '10:31 AM • Seen' },
    ]);
    const [inputText, setInputText] = useState('');
    const logRef = useRef(null);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const newMessage = { type: 'outgoing', text: inputText, time: `${time} • Seen` };
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        
        // Simulate PM reply
        setTimeout(() => {
            const replyTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const replyMessage = { type: 'incoming', text: "Received. I'll look into it.", time: replyTime };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    return (
        <div className="chat-wrapper">
            <header className="chat-header">
                <div className="pm-avatar">PM</div>
                <div className="pm-info">
                    <div className="name">Property Manager</div>
                    <div className="status">Online</div>
                </div>
            </header>
            
            <main className="conversation-log" ref={logRef}>
                {messages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
                        <div className={`message-meta meta-${msg.type}`}>{msg.time}</div>
                    </React.Fragment>
                ))}
            </main>
            
            <footer className="composer">
                <textarea 
                    className="composer-input" 
                    placeholder="Type a message..." 
                    rows="1"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                />
                <button className="composer-btn send" onClick={handleSendMessage}>➤</button>
            </footer>
        </div>
    );
};

export default GuardMessagePMPage;