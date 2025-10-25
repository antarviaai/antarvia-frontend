import React, { useState } from 'react';
import './CleanerDashboardPage.css';

const initialTasks = [
    { id: 1, title: 'Fix Kitchen Sink Leak', location: 'Unit 1402', assignedBy: 'Manager', priority: 'high', completed: false },
    { id: 2, title: 'Replace Lobby Light Fixture', location: 'Main Lobby', assignedBy: 'Superintendent', priority: 'medium', completed: false },
    { id: 3, title: 'Clean P2 Garage Spill', location: 'P2 Garage', assignedBy: 'Supervisor', priority: 'low', completed: true },
];

const CleanerDashboardPage = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setTaskModalOpen(true);
    };
    
    const handleConfirmComplete = () => {
        setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, completed: true } : t));
        setTaskModalOpen(false);
    };

    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>My Day</h1><p>Here are your assigned tasks for today.</p></div>
            </header>

            <main>
                <section className="task-section">
                    <h2 className="section-title">Pending</h2>
                    <div className="task-list">
                        {pendingTasks.map(task => (
                            <div key={task.id} className={`task-card priority-${task.priority}`} onClick={() => handleTaskClick(task)}>
                                <div className="card-header">
                                    <h3 className="task-title">{task.title}</h3>
                                    <span className={`urgency-tag urgency-${task.priority}`}>{task.priority}</span>
                                </div>
                                <div className="task-meta">
                                    <div className="meta-item">📍 {task.location}</div>
                                    <div className="meta-item">From: {task.assignedBy}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="task-section">
                    <h2 className="section-title">Completed</h2>
                    <div className="task-list">
                        {completedTasks.map(task => (
                            <div key={task.id} className="task-card completed">
                                <h3 className="task-title">{task.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            
            <button className="fab-chat" aria-label="Open Chat">{/* Chat SVG */}</button>

            {isTaskModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Complete Task</h2><button className="close-modal-btn" onClick={() => setTaskModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Completion Notes (Optional)</label><textarea className="textarea" rows="4"></textarea></div>
                            <div className="form-group"><label>Attach Photo (Optional)</label><div className="file-drop-area"><p>Drag & Drop or click to browse</p></div></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setTaskModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleConfirmComplete}>Confirm Completion</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CleanerDashboardPage;