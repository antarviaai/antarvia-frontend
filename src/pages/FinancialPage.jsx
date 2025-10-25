import React, { useState } from 'react';
import './FinancialPage.css';

const FinancialPage = () => {
    const [reportType, setReportType] = useState('arrears');
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState({ title: '', headers: [], rows: [] });

    const handleGenerateReport = () => {
        // In the future, this will be an API call. For now, we use mock data.
        if (reportType === 'arrears') {
            setReportData({
                title: 'Arrears Report',
                headers: ['Unit', 'Resident', 'Amount Due', 'Days Overdue'],
                rows: [
                    ['502', 'Mark H.', '$550.00', '15'],
                    ['810', 'Lisa Q.', '$200.00', '8'],
                    ['1104', 'Tom B.', '$500.00', '12'],
                ]
            });
        } else if (reportType === 'transactions') {
            setReportData({
                title: 'Transaction Log',
                headers: ['Date', 'Unit', 'Amount', 'Type'],
                rows: [
                    ['2025-09-25', '1203', '$2,450.75', 'Online Payment'],
                    ['2025-09-25', '1402', '$2,200.00', 'Check'],
                    ['2025-09-24', '801', '$50.00', 'Amenity Booking Fee'],
                ]
            });
        }
        setShowReport(true);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Financial Command Center</h1>
                    <p>View real-time dashboards and generate detailed reports.</p>
                </div>
            </header>

            <section className="kpi-grid">
                <div className="kpi-card"><div className="kpi-value">$25,750</div><div className="kpi-label">Revenue (MTD)</div></div>
                <div className="kpi-card"><div className="kpi-value good">98%</div><div className="kpi-label">Fees Collected</div></div>
                <div className="kpi-card"><div className="kpi-value bad">$1,250</div><div className="kpi-label">Total Arrears</div></div>
                <div className="kpi-card"><div className="kpi-value">3</div><div className="kpi-label">Units in Arrears</div></div>
            </section>

            <main className="main-layout">
                <div className="main-column">
                    <div className="card">
                        <h2 className="card-title">Monthly Revenue</h2>
                        <div className="chart-placeholder">Chart: Monthly Revenue vs. Budget</div>
                    </div>
                    
                    {showReport && (
                        <div className="card report-output">
                            <div className="report-header">
                                <h2 className="card-title">{reportData.title}</h2>
                                <div><button className="export-btn">Download PDF</button></div>
                            </div>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        {reportData.headers.map(header => <th key={header}>{header}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.rows.map((row, index) => (
                                        <tr key={index}>
                                            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                <div className="sidebar-column">
                    <div className="card">
                        <h2 className="card-title">Report Generator</h2>
                        <div className="form-group">
                            <label htmlFor="report-type">Report Type</label>
                            <select id="report-type" className="select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="arrears">Arrears Report</option>
                                <option value="transactions">Transaction Log</option>
                            </select>
                        </div>
                        <div className="form-group"><label htmlFor="start-date">Start Date</label><input type="date" id="start-date" className="input" /></div>
                        <div className="form-group"><label htmlFor="end-date">End Date</label><input type="date" id="end-date" className="input" /></div>
                        <button className="generate-btn" onClick={handleGenerateReport}>Generate Report</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FinancialPage;