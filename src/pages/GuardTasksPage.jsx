import React, { useState } from 'react';
import './GuardTasksPage.css';

const initialTasks = [
    { id: 1, title: 'Check fire panel for fault', due: 'Due: Yesterday, 10:00 PM', location: 'Fire Control Room', assignedBy: 'Superintendent', priority: 'high', isCompleted: false, isOverdue: true },
    { id: 2, title: 'Patrol P2 garage level', due: 'Due: Today, 2:00 AM', location: 'P2', assignedBy: 'Supervisor', priority: 'medium', isCompleted: false, isOverdue: false },
    { id: 3, title: 'Review CCTV footage from lobby cam 2', due: 'Due: Today, 4:00 AM', location: 'Security Desk', assignedBy: 'Supervisor', priority: 'low', isCompleted: false, isOverdue: false },
];

const GuardTasksPage = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const overdueTasks = tasks.filter(t => t.isOverdue && !t.isCompleted);
    const todayTasks = tasks.filter(t => !t.isOverdue && !t.isCompleted);
    const completedTasks = tasks.filter(t => t.isCompleted);

    return (
        <div className="page-container">
            <header className="page-header">
                <div><h1>To-Do Tasks</h1><p>Manage and track shift responsibilities.</p></div>
                <button className="add-task-btn" onClick={() => setAddModalOpen(true)}><span>+ Add Task</span></button>
            </header>

            <main>
                {overdueTasks.length > 0 && (
                    <section className="task-section">
                        <h2 className="section-title">Overdue</h2>
                        <div className="task-list">
                            {overdueTasks.map(task => (
                                <div key={task.id} className={`task-card priority-${task.priority}`}>
                                    <div className="checkbox-col"><div className="checkbox" onClick={() => toggleTaskCompletion(task.id)}></div></div>
                                    <div className="task-content">
                                        <div className="task-title">{task.title}</div>
                                        <div className="task-meta">{/* Meta items */}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="task-section">
                    <h2 className="section-title">Today's Tasks</h2>
                    <div className="task-list">
                        {todayTasks.map(task => (
                            <div key={task.id} className={`task-card priority-${task.priority}`}>
                                <div className="checkbox-col"><div className="checkbox" onClick={() => toggleTaskCompletion(task.id)}></div></div>
                                <div className="task-content">
                                    <div className="task-title">{task.title}</div>
                                    <div className="task-meta">{/* Meta items */}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {completedTasks.length > 0 && (
                    <section className="task-section">
                        <h2 className="section-title">Completed</h2>
                        <div className="task-list">
                            {completedTasks.map(task => (
                                <div key={task.id} className={`task-card completed priority-${task.priority}`}>
                                    <div className="checkbox-col"><div className="checkbox"></div></div>
                                    <div className="task-content">
                                        <div className="task-title">{task.title}</div>
                                        <div className="task-meta">{/* Meta items */}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Add Task Modal */}
            {isAddModalOpen && <div className="modal-overlay open">{/* Modal Content */}</div>}
        </div>
    );
};

export default GuardTasksPage;