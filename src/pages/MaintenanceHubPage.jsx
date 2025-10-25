import React, { useState, useEffect } from 'react';
import './MaintenanceHubPage.css';

const MaintenanceHubPage = () => {
    // State to manage which tab is active
    const [activeTab, setActiveTab] = useState('new-requests');
    
    // State to hold all maintenance tickets fetched from the API
    const [tickets, setTickets] = useState([]);
    
    // State to manage the currently selected ticket and the modal
    const [selectedTicket, setSelectedTicket] = useState(null);
    
    // State for the form inputs inside the manager's toolbox
    const [managerInputs, setManagerInputs] = useState({
        urgency: 'Medium',
        assignedTo: '', // We'll need a list of staff later
        internalNote: ''
    });

    // State for the "Update Sent" goodbye screen
    const [showGoodbyeOverlay, setShowGoodbyeOverlay] = useState(false);

    // Fetch all tickets when the component loads
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('/api/maintenance');
                if (!response.ok) throw new Error('Failed to fetch tickets');
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTickets();
    }, []);

    // Open the modal and populate it with the selected ticket's data
    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setManagerInputs({
            urgency: ticket.urgency || 'Medium',
            assignedTo: ticket.assignedTo || '',
            internalNote: ''
        });
    };

    // Handle form changes inside the modal
    const handleManagerInputChange = (e) => {
        const { id, value } = e.target;
        setManagerInputs(prev => ({ ...prev, [id]: value }));
    };

    // Handle submitting the update form in the modal
    const handleUpdateSubmit = async () => {
        if (!selectedTicket) return;

        try {
            const response = await fetch(`/api/maintenance/${selectedTicket._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...managerInputs,
                    status: 'In Progress' // Or based on some logic
                }),
            });
            if (!response.ok) throw new Error('Failed to update ticket');

            // Close modal and show success message
            setSelectedTicket(null);
            setShowGoodbyeOverlay(true);
            setTimeout(() => setShowGoodbyeOverlay(false), 2500);

            // Refresh the ticket list
            // In a real app, you'd refetch, but for now we'll just filter it out locally
            setTickets(tickets.filter(t => t._id !== selectedTicket._id));

        } catch (error) {
            console.error(error);
            alert('Failed to update ticket.');
        }
    };

    // Filter tickets for the "New Requests" and "Completed" tabs
    const newTickets = tickets.filter(t => t.status === 'New');
    const completedTickets = tickets.filter(t => t.status === 'Completed');

    return (
        <div className="page-container">
            {/* Header and KPI Grid */}
            <header className="page-header">
                <div><h1>Maintenance Hub</h1><p>Triage new resident requests and assign tasks to staff.</p></div>
            </header>
            <section className="kpi-grid">
                <div className="kpi-card"><div className="kpi-value">{newTickets.length}</div><div className="kpi-label">New Open Tickets</div></div>
                <div className="kpi-card"><div className="kpi-value">04</div><div className="kpi-label">New Tickets Today</div></div>
                <div className="kpi-card"><div className="kpi-value" style={{ color: 'var(--accent-red)' }}>02</div><div className="kpi-label">Overdue Tickets</div></div>
                <div className="kpi-card"><div className="kpi-value">1.8d</div><div className="kpi-label">Avg. Resolution Time</div></div>
            </section>

            {/* Main Hub Container */}
            <main className="hub-container">
                <nav className="tab-nav">
                    <button className={`tab-btn ${activeTab === 'new-requests' ? 'active' : ''}`} onClick={() => setActiveTab('new-requests')}>New Requests</button>
                    <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Completed History</button>
                </nav>
                <div className="tab-content">
                    {/* New Requests Tab */}
                    <div className={`tab-pane ${activeTab === 'new-requests' ? 'active' : ''}`}>
                        <div className="ticket-list">
                            {newTickets.map(ticket => (
                                <div key={ticket._id} className="ticket-row" onClick={() => handleTicketClick(ticket)}>
                                    <div className="ticket-info">
                                        <div className="title">{ticket.title}</div>
                                        <div className="meta">From: {ticket.submittedBy?.name || 'Unknown'} (Unit {ticket.unitNumber}) • Submitted: {new Date(ticket.createdAt).toLocaleString()}</div>
                                    </div>
                                    <div className="ticket-status">{ticket.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Completed Tab */}
                    <div className={`tab-pane ${activeTab === 'completed' ? 'active' : ''}`}>
                         <div className="ticket-list">
                            {completedTickets.map(ticket => (
                                <div key={ticket._id} className="ticket-row" onClick={() => handleTicketClick(ticket)}>
                                    <div className="ticket-info">
                                        <div className="title">{ticket.title}</div>
                                        <div className="meta">From: {ticket.submittedBy?.name || 'Unknown'} (Unit {ticket.unitNumber}) • Completed: {new Date(ticket.completedAt).toLocaleString()}</div>
                                    </div>
                                    <div className="ticket-status">{ticket.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Ticket Details Modal */}
            {selectedTicket && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Triage & Assign Ticket</h2><button className="close-modal-btn" onClick={() => setSelectedTicket(null)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="section resident-report">
                                <h3>Resident's Report</h3>
                                <p><strong>From:</strong> {selectedTicket.submittedBy?.name} (Unit {selectedTicket.unitNumber})</p>
                                <p><strong>Submitted:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                                <p><strong>Description:</strong> "{selectedTicket.description}"</p>
                            </div>
                            <div className="section manager-toolbox">
                                <h3>Manager's Toolbox</h3>
                                <div className="form-group">
                                    <label>Set Urgency</label>
                                    {/* Urgency buttons can be fully implemented later */}
                                    <p>Current: {managerInputs.urgency}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="assignedTo">Assign To</label>
                                    <select className="select" id="assignedTo" value={managerInputs.assignedTo} onChange={handleManagerInputChange}>
                                        <option value="">Unassigned</option>
                                        <option value="staff_member_1_id">John S. (Superintendent)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="internalNote">Internal Notes</label>
                                    <div className="notes-composer">
                                        <textarea className="notes-textarea" id="internalNote" placeholder="Add a private note for the assigned staff..." value={managerInputs.internalNote} onChange={handleManagerInputChange}></textarea>
                                        <div className="notes-footer"><button className="send-btn" onClick={handleUpdateSubmit}>Send Update</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Goodbye Overlay */}
            {showGoodbyeOverlay && (
                <div className="goodbye-overlay show">
                    <div className="goodbye-message"><h2>Update Sent.</h2><p>The assigned staff member has been notified.</p></div>
                </div>
            )}
        </div>
    );
};

export default MaintenanceHubPage;