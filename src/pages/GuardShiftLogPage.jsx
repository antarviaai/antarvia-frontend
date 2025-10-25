import React, { useState } from "react";
import "./GuardShiftLogPage.css";

const templates = {
  patrol:
    "Routine Patrol: Patrolled floor [FLOOR #]. All areas are secure and clear. Status: OK.",
  noise:
    "Noise Complaint: Responded to a complaint regarding Unit [UNIT #]. Spoke with the resident and the issue was resolved. Status: RESOLVED.",
  cctv:
    "At Desk: Monitored CCTV feeds. All areas appear normal. No unusual activity to report.",
  shift_end: `End of Shift Summary:
- Outstanding Tasks: [List any tasks for the next shift]
- Ongoing Incidents: [Note any situations the next guard should be aware of]
- Key/Asset Status: [Confirm all keys are accounted for]
- General Notes: [Any other important information]

Shift ended. Handing over to [Next Guard's Name].`,
};

const GuardShiftLogPage = () => {
  const [logs, setLogs] = useState([
    {
      time: "12:00 AM",
      text: "Start of Shift. Reviewed handover notes from previous shift. All clear.",
    },
  ]);
  const [logText, setLogText] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isGoodbyeOpen, setGoodbyeOpen] = useState(false);

  const handleAddLog = () => {
    if (!logText.trim()) return;
    const timeString = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setLogs((prev) => [{ time: timeString, text: logText }, ...prev]);
    setLogText("");
  };

  const handleEndShift = () => {
    setConfirmModalOpen(false);
    setGoodbyeOpen(true);
    setTimeout(() => setGoodbyeOpen(false), 3000);
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div>
          <h1>Shift Log</h1>
          <p>Log all activities and events for your current shift.</p>
        </div>
      </header>

      <div className="log-container">
        {/* Timeline */}
        <div className="log-timeline-panel">
          <div id="log-timeline">
            {logs.map((log, index) => (
              <div key={index} className="timeline-entry">
                <div className="timeline-icon">📝</div>
                <p className="entry-time">{log.time}</p>
                <p className="entry-text">{log.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="action-panel">
          <div className="action-card shift-status-card">
            <p>
              On Duty: <strong>David Chen</strong>
            </p>
            <p>
              Shift Started: <strong>12:00 AM</strong>
            </p>
            <button
              className="end-shift-btn"
              onClick={() => setConfirmModalOpen(true)}
            >
              End Shift
            </button>
          </div>

          <div className="action-card">
            <h3>Log Templates</h3>
            <div className="template-grid">
              <button
                className="template-btn"
                data-template="patrol"
                onClick={() => setLogText(templates.patrol)}
              >
                Routine Patrol
              </button>
              <button
                className="template-btn"
                data-template="noise"
                onClick={() => setLogText(templates.noise)}
              >
                Noise Complaint
              </button>
              <button
                className="template-btn"
                data-template="cctv"
                onClick={() => setLogText(templates.cctv)}
              >
                CCTV Monitoring
              </button>
              <button
                className="template-btn"
                data-template="shift_end"
                onClick={() => setLogText(templates.shift_end)}
              >
                End of Shift
              </button>
            </div>
          </div>

          <div className="action-card log-composer">
            <h3>New Log Entry</h3>
            <textarea
              className="log-textarea"
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="Select a template or type a custom entry..."
            ></textarea>
            <button className="action-btn" onClick={handleAddLog}>
              Add to Log
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm End of Shift</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to end your current shift and sign out?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setConfirmModalOpen(false)}
              >
                No, Cancel
              </button>
              <button className="btn-confirm" onClick={handleEndShift}>
                Yes, End Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goodbye Message */}
      {isGoodbyeOpen && (
        <div className="goodbye-overlay show">
          <div className="goodbye-message">
            <h2>Shift Ended.</h2>
            <p>See you soon, take rest!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardShiftLogPage;
