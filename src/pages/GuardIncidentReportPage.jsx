import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // for the History page button
import "./GuardIncidentReportPage.css";

const CATEGORIES = [
  "General",
  "Noise",
  "Safety",
  "Damage",
  "Theft",
  "Parking",
  "Disturbance",
  "Other",
];

export default function GuardIncidentReportPage() {
  const [guardName, setGuardName] = useState("David Chen");
  const [category, setCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [narrative, setNarrative] = useState("");

  // Bottom “snackbar sheet” (report preview)
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetText, setSheetText] = useState("");

  // small toast (for form validation, etc.)
  const [toast, setToast] = useState("");

  // mock history list (used only to demonstrate data shaping for the sheet if needed)
  const historyList = useMemo(
    () => [
      { id: 1, title: "Noise Complaint – Unit 502", when: "2025-10-12 23:10" },
      { id: 2, title: "Safety – Wet floor near lobby", when: "2025-10-10 08:31" },
      { id: 3, title: "General – Visitor dispute at dock", when: "2025-10-07 19:20" },
    ],
    []
  );

  const effectiveCategory = category === "Other" ? (customCategory || "Other") : category;
  const charCount = narrative.length;

  function openToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function handleGenerateAI() {
    if (!narrative.trim()) {
      openToast("Please add some details before generating with AI.");
      return;
    }
    const pretty = `INCIDENT REPORT
Category: ${effectiveCategory}
Location: ${location || "—"}
When: ${datetime || "—"}
Guard: ${guardName || "—"}

Narrative:
${narrative}

Actions/Next Steps:
- [Add follow-up steps here]

Status: OPEN`;
    setSheetText(pretty);
    setSheetOpen(true);
  }

  function handleSubmit() {
    if (!guardName.trim() || !effectiveCategory.trim() || !datetime || !location.trim()) {
      openToast("Please complete Guard, Category, Date/Time, and Location.");
      return;
    }
    openToast("Incident report submitted.");
    setSheetOpen(false);
    // keep form values in case guard wants to add follow-up
  }

  return (
    <div className="ir-page --wide">
      <header className="ir-header">
        <div className="ir-title">
          <h1>Incident Report Hub</h1>
          <p>Log professional, consistent incident reports with ease.</p>
        </div>
        <Link to="/guard/incident-history" className="btn btn-ghost">
          Open Report History
        </Link>
      </header>

      <div className="ir-grid ir-grid--wider">
        {/* MAIN */}
        <section className="ir-card">
          <div className="ir-card-head">
            <h2>New Report Details</h2>
          </div>

          <div className="ir-form-grid ir-form-grid--3">
            <div className="form-group">
              <label>Guard Name</label>
              <input
                className="input"
                value={guardName}
                onChange={(e) => setGuardName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label>Incident Date &amp; Time</label>
              <input
                type="datetime-local"
                className="input"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="input selectlike"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {category === "Other" && (
              <div className="form-group form-group--full">
                <label>Custom Category</label>
                <input
                  className="input"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Type a custom category"
                />
              </div>
            )}

            <div className="form-group form-group--full">
              <label>Location</label>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Lobby, Unit 502, Parking P2"
              />
            </div>
          </div>

          {/* FULL-WIDTH NARRATIVE */}
          <div className="narrative-block">
            <h3 className="narrative-title">Narrative</h3>
            <div className="textarea-wrap">
              <textarea
                className="textarea textarea--wide"
                placeholder="Describe what happened — facts first, then actions taken, then status."
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
              />
              <span className="char-counter">{charCount} chars</span>
            </div>
            <div className="composer-actions composer-actions--below">
              <button className="btn btn-ai" onClick={handleGenerateAI}>
                ✨ Generate with AI
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Report
              </button>
            </div>
          </div>
        </section>

        {/* SIDEBAR — YELLOW TIP ONLY (no preview to avoid clumping) */}
        <aside className="ir-side">
          <section className="ir-card tip-card">
            <div className="yellow-tip">
              <h3>Tip</h3>
              <p>
                Keep your narrative factual, chronological, and neutral. Include who, what,
                where, when, actions taken, and current status.
              </p>
            </div>
          </section>
        </aside>
      </div>

      {/* Bottom “snackbar sheet” with generated report */}
      <div className={`sheet-overlay ${sheetOpen ? "open" : ""}`}>
        <div className="sheet">
          <div className="sheet-head">
            <h3>AI-Generated Report</h3>
            <button className="sheet-close" onClick={() => setSheetOpen(false)}>✕</button>
          </div>
          <pre className="sheet-body">{sheetText}</pre>
          <div className="sheet-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Report
            </button>
            <button className="btn btn-ghost" onClick={() => setSheetOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Tiny toast */}
      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
