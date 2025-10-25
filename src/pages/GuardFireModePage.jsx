import React, { useState, useEffect } from "react";
import "./GuardFireModePage.css";

const GuardFireModePage = () => {
  const [isActive, setIsActive] = useState(false);
  const [isContactsModalOpen, setContactsModalOpen] = useState(false);
  const [isHowToUseModalOpen, setHowToUseModalOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const [area, setArea] = useState("floor");
  const [floor, setFloor] = useState("1");
  const [manualFloor, setManualFloor] = useState("");
  const [parking, setParking] = useState("1");
  const [smsPreview, setSmsPreview] = useState("");
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Smith", role: "Property Manager", selected: true },
    { id: 2, name: "Jane Doe", role: "Superintendent", selected: true },
    { id: 3, name: "Mike Ross", role: "Head of Security", selected: false },
  ]);

  // update preview dynamically
  useEffect(() => {
    let locationLabel = "";
    if (area === "floor") {
      const label = manualFloor ? manualFloor.toUpperCase() : floor;
      locationLabel = `Floor ${label}`;
    } else {
      locationLabel = `Parking P${parking}`;
    }
    setSmsPreview(
      `FIRE INCIDENT – ${locationLabel}\n\nA fire has been reported at ${locationLabel}.\nEmergency Fire Mode is active. Emergency services have been notified.\n\nBuilding management and security are responding.`
    );
  }, [area, floor, parking, manualFloor]);

  const handleToggleContact = (id) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const handleSendAlert = () => {
    // show snackbar
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      // show success overlay
      setShowSuccessOverlay(true);
      setTimeout(() => {
        setShowSuccessOverlay(false);
        // reset state / redirect simulation
        setIsActive(false);
      }, 3000);
    }, 2000);
  };

  const getNotifyingSummary = () => {
    const selected = contacts.filter((c) => c.selected);
    if (selected.length === 0) return "Notifying: (none selected)";
    if (selected.length <= 2)
      return `Notifying: ${selected.map((c) => c.name).join(", ")}`;
    return `Notifying: ${selected[0].name}, ${selected[1].name} +${
      selected.length - 2
    } more`;
  };

  return (
    <div className="fire-mode-page-wrapper">
      <div className="fire-mode-container">
        <div className="fm-header">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6 .5-1 1.75-2 1.75-2-2.75 2.5-2.5 4.5-2.5 5.5C1 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625-1 1.25-1.5 1.25-1.5-1.5 1.5-1.5 2.5-1.5 3.5C11 14 9.657 15 8 15Z" />
            </svg>
          </span>
          <h1>Fire Mode</h1>
          {isActive && <span className="active-chip">ACTIVE</span>}
        </div>

        <div className="divider" />

        {!isActive ? (
          <div className="idle-content">
            <ul>
              <li>Prioritize evacuation and resident safety first.</li>
              <li>Follow your building’s fire safety protocol at all times.</li>
            </ul>

            <div className="secondary-actions">
              <button
                className="secondary-btn"
                onClick={() => setContactsModalOpen(true)}
              >
                Contacts
              </button>
              <button
                className="secondary-btn"
                onClick={() => setHowToUseModalOpen(true)}
              >
                How to Use
              </button>
            </div>

            <p id="notifying-summary">{getNotifyingSummary()}</p>

            <button
              className="action-btn"
              onClick={() => setIsActive(true)}
              style={{ marginTop: "25px" }}
            >
              Activate Fire Mode
            </button>
          </div>
        ) : (
          <div className="active-content">
            <div className="form-grid">
              <div className="form-section">
                <h2>1. Select Incident Location</h2>

                <div className="form-group">
                  <label>Area</label>
                  <select
                    className="select"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="floor">Floor</option>
                    <option value="parking">Parking</option>
                  </select>
                </div>

                {area === "floor" ? (
                  <>
                    <div className="form-group">
                      <label>Floor Number</label>
                      <select
                        className="select"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      >
                        {Array.from({ length: 100 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Floor {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Or Type Level (e.g., PH, LPH)</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Overrides selection above"
                        value={manualFloor}
                        onChange={(e) => setManualFloor(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label>Parking Level</label>
                    <select
                      className="select"
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          P{i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h2>2. Review & Send Alert</h2>
                <div className="form-group">
                  <label>SMS Message Preview</label>
                  <textarea
                    className="input sms-preview"
                    readOnly
                    value={smsPreview}
                  />
                </div>
                <button className="action-btn" onClick={handleSendAlert}>
                  Send Alert to Management
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HOW TO USE MODAL */}
      {isHowToUseModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-content modal-glass">
            <div className="modal-header">
              <h2>How to Use Fire Mode</h2>
              <button
                className="close-modal-btn"
                onClick={() => setHowToUseModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body steps">
              <ol>
                <li>Select <strong>Contacts</strong> to choose who to notify.</li>
                <li>Press <strong>Activate Fire Mode</strong>.</li>
                <li>Select the <strong>incident location</strong>.</li>
                <li>Review the <strong>SMS preview</strong>.</li>
                <li>Tap <strong>Send Alert</strong> to dispatch notifications.</li>
              </ol>
              <p><strong>Note:</strong> Always follow your building’s emergency procedures.</p>
            </div>
          </div>
        </div>
      )}

      {/* CONTACTS MODAL */}
      {isContactsModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-content modal-glass">
            <div className="modal-header">
              <h2>Emergency Contacts</h2>
              <button
                className="close-modal-btn"
                onClick={() => setContactsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body contact-body">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className={`contact-card ${c.selected ? "selected" : ""}`}
                  onClick={() => handleToggleContact(c.id)}
                >
                  <div className="contact-role-icon">👤</div>
                  <div className="contact-details">
                    <strong>{c.name}</strong>
                    <span>{c.role}</span>
                  </div>
                  <div className="contact-checkbox">
                    {c.selected ? "✅" : "☐"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SNACKBAR */}
      {showSnackbar && (
        <div className="snackbar show">🚨 Fire Alert Sent to Management</div>
      )}

      {/* SUCCESS OVERLAY */}
      {showSuccessOverlay && (
        <div className="goodbye-overlay show">
          <div className="goodbye-message">
            <h2>Alert Sent.</h2>
            <p>Returning to Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardFireModePage;
