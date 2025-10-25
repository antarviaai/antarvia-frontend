import React, { useState } from 'react';
import './MarketplacePage.css';

const listings = [
    { id: 1, title: 'Modern Armchair', price: '$150.00', seller: 'From Jane D.', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80' },
    { id: 2, title: 'Standing Desk', price: 'FREE', seller: 'From Charles M.', image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80' },
    { id: 3, title: 'Espresso Machine', price: '$75.00', seller: 'From Beatrice L.', image: 'https://images.unsplash.com/photo-1549999933-2c24a2592b83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
    { id: 4, title: 'Tall Bookshelf', price: '$50.00', seller: 'From Alex R.', image: 'https://images.unsplash.com/photo-1567588122338-a2b66f2402e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }
];

const MarketplacePage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const [isChatModalOpen, setChatModalOpen] = useState(false);
    
    return (
        <div className="page-container">
            <header className="page-header">
                <div className="title-group">
                    <div><h1>Marketplace</h1><p>Buy, sell, and trade with your neighbors.</p></div>
                    <button className="icon-btn" onClick={() => setInfoModalOpen(true)}>{/* Info SVG */}</button>
                </div>
                <div className="header-actions">
                    <button className="icon-btn" onClick={() => setChatModalOpen(true)}>{/* Chat SVG */}</button>
                    <button className="post-listing-btn" onClick={() => setPostModalOpen(true)}><span>Post Listing</span></button>
                </div>
            </header>

            <section><div className="filter-bar">{/* Filter buttons */}</div></section>

            <main>
                <div className="listing-grid">
                    {listings.map(item => (
                        <div key={item.id} className="listing-card" onClick={() => setDetailModalOpen(true)}>
                            <div className="listing-image"><img src={item.image} alt={item.title} /></div>
                            <div className="listing-details">
                                <h3 className="listing-title">{item.title}</h3>
                                <div className={`listing-price ${item.price === 'FREE' ? 'free' : ''}`}>{item.price}</div>
                                <div className="listing-seller">{item.seller}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modals */}
            {isDetailModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Modern Armchair</h2><button className="close-modal-btn" onClick={() => setDetailModalOpen(false)}>&times;</button></div></div></div>}
            {isPostModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Create New Listing</h2><button className="close-modal-btn" onClick={() => setPostModalOpen(false)}>&times;</button></div></div></div>}
            {isInfoModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Marketplace Safety</h2><button className="close-modal-btn" onClick={() => setInfoModalOpen(false)}>&times;</button></div></div></div>}
            {isChatModalOpen && <div className="modal-overlay open"><div className="modal-content"><div className="modal-header"><h2>Marketplace Chats</h2><button className="close-modal-btn" onClick={() => setChatModalOpen(false)}>&times;</button></div></div></div>}
        </div>
    );
};

export default MarketplacePage;