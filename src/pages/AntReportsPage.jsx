import React, { useState } from 'react';
import './AntReportsPage.css';

// Data for the report types can be stored here
const reportTypes = [
    { id: 'incidents', icon: '🚨', name: 'Incident Summary', description: "Overview of all security and safety incidents." },
    { id: 'maintenance', icon: '🔧', name: 'Maintenance Analytics', description: "Breakdown of issues and resolution times." },
    { id: 'packages', icon: '📦', name: 'Package Volume', description: "Track number of packages logged over time." },
    { id: 'shifts', icon: '📋', name: 'Shift Logs', description: "Review detailed guard shift activities." },
    { id: 'violations', icon: '⚠️', name: 'Violation History', description: "Log of all violation notices sent to residents." },
    { id: 'visitors', icon: '🚶‍♂️', name: 'Visitor Traffic', description: "Analyze visitor check-in patterns and volume." },
    { id: 'contractors', icon: '👷', name: 'Contractor Access Log', description: "Audit trail of all on-site contractor visits." },
    { id: 'arrears', icon: '💰', name: 'Arrears Report', description: "List of all units with outstanding balances." },
    { id: 'transactions', icon: '💳', name: 'Transaction Log', description: "Detailed history of all payments received." },
    { id: 'amenities', icon: '🏖️', name: 'Amenity Usage', description: "Analyze popularity and booking trends of amenities." },
];

const AntReportsPage = () => {
    // State to keep track of the currently selected report type
    const [activeReport, setActiveReport] = useState('incidents');

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>ANT Reports & Analytics</h1>
                    <p>Generate insights from your building's operational data.</p>
                </div>
            </header>

            <main className="report-hub-layout">
                <div className="report-builder">
                    <div className="builder-section">
                        <h2>1. Select Report Type</h2>
                        <div className="report-type-list">
                            {reportTypes.map(report => (
                                <div 
                                    key={report.id}
                                    className={`report-type-card ${activeReport === report.id ? 'active' : ''}`}
                                    onClick={() => setActiveReport(report.id)}
                                >
                                    <div className="icon">{report.icon}</div>
                                    <div>
                                        <div className="name">{report.name}</div>
                                        <p className="description">{report.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="builder-section">
                        <h2>2. Select Date Range</h2>
                        <div className="form-group"><label>Start Date</label><input type="date" className="input" /></div>
                        <div className="form-group"><label>End Date</label><input type="date" className="input" /></div>
                    </div>
                    {/* Additional filters can be added here based on activeReport state */}
                    <button className="generate-btn">Generate Report</button>
                </div>
                
                <div className="report-preview">
                    <div className="preview-header">
                        <h2 className="preview-title">Report Preview</h2>
                        <div className="export-buttons">
                            <button className="export-btn">Download PDF</button>
                            <button className="export-btn">Export CSV</button>
                        </div>
                    </div>
                    <div className="preview-content">
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '80px 0' }}>
                            Configure your report on the left and click 'Generate' to see the preview here.
                        </p>
                    </div>
                    <div className="chart-placeholder">Data Visualization / Chart Area</div>
                </div>
            </main>
        </div>
    );
};

export default AntReportsPage;