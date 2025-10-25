import React, { useState } from 'react';
import './PollsAndSurveysPage.css';

const PollsAndSurveysPage = () => {
    const [activeTab, setActiveTab] = useState('Active Polls');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    
    // We'll manage poll votes in state
    const [polls, setPolls] = useState([
        { id: 1, question: 'What new equipment should we add to the community gym?', author: 'Property Management', avatar: 'M', date: 'Posted 2 days ago', type: 'OFFICIAL', options: ['Second Treadmill', 'StairMaster', 'More Free Weights'], votes: [45, 35, 20], totalVotes: 128, selection: null },
        { id: 2, question: "What's the best pizza place for delivery to our building?", author: 'Jane R.', avatar: 'JR', date: 'Posted 4 days ago', type: 'COMMUNITY', options: ['Pizza Pizza', "Domino's", 'Local Place on King St.'], votes: [28, 58, 14], totalVotes: 75, selection: null },
    ]);

    const handleVote = (pollId, optionIndex) => {
        setPolls(polls.map(p => p.id === pollId ? { ...p, selection: optionIndex } : p));
    };

    const handleChangeVote = (pollId) => {
        setPolls(polls.map(p => p.id === pollId ? { ...p, selection: null } : p));
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="title-group">
                    <div><h1>Polls & Surveys</h1><p>Share your voice in community decisions.</p></div>
                    <button className="icon-btn" onClick={() => setInfoModalOpen(true)}>{/* Info SVG */}</button>
                </div>
                <div className="header-actions"><button className="create-poll-btn" onClick={() => setCreateModalOpen(true)}><span>Create Poll</span></button></div>
            </header>

            <section className="poll-filters"><div className="filter-tabs">{/* Filter Tabs */}</div></section>

            <main>
                <div className="poll-list">
                    {polls.map(poll => (
                        <div key={poll.id} className="poll-card">
                            <div className="poll-header">{/* Poll Header */}</div>
                            <p className="poll-question">{poll.question}</p>
                            
                            {poll.selection === null ? (
                                <div className="poll-options">
                                    {poll.options.map((opt, index) => (
                                        <div key={index} className="poll-option" onClick={() => handleVote(poll.id, index)}>{opt}</div>
                                    ))}
                                </div>
                            ) : (
                                <div className="poll-results">
                                    {poll.options.map((opt, index) => (
                                        <div key={index} className={`result-bar ${poll.selection === index ? 'voted-for' : ''}`}>
                                            <div className="fill" style={{ width: `${poll.votes[index]}%` }}></div>
                                            <div className="text"><span>{opt}</span><span>{poll.votes[index]}%</span></div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="poll-footer">
                                {poll.selection !== null ? <button className="change-vote-btn" onClick={() => handleChangeVote(poll.id)}>Change Vote</button> : <span></span>}
                                <span className="total-votes">{poll.totalVotes} votes</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modals */}
            {isCreateModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Create a Poll</h2><button className="close-modal-btn" onClick={() => setCreateModalOpen(false)}>&times;</button></div></div></div>}
            {isInfoModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Polls & Surveys Guidelines</h2><button className="close-modal-btn" onClick={() => setInfoModalOpen(false)}>&times;</button></div></div></div>}
        </div>
    );
};

export default PollsAndSurveysPage;