import React, { useMemo, useState } from "react";
import "./GuardIncidentHistoryPage.css";

export default function GuardIncidentHistoryPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  // mock history dataset
  const data = useMemo(
    () => [
      {
        id: 101,
        title: "Noise Complaint — Unit 502",
        when: "2025-10-12 23:10",
        report:
`INCIDENT REPORT
Category: Noise
Location: Unit 502
When: 2025-10-12 23:10
Guard: David Chen

Narrative:
Responded to noise complaint at Unit 502. Spoke with occupants; volume reduced.

Status: RESOLVED`,
      },
      {
        id: 102,
        title: "Safety — Wet floor near lobby",
        when: "2025-10-10 08:31",
        report:
`INCIDENT REPORT
Category: Safety
Location: Lobby
When: 2025-10-10 08:31
Guard: David Chen

Narrative:
Wet floor sign placed; janitorial notified.

Status: OPEN`,
      },
      {
        id: 103,
        title: "General — Visitor dispute at dock",
        when: "2025-10-07 19:20",
        report:
`INCIDENT REPORT
Category: General
Location: Delivery Dock
When: 2025-10-07 19:20
Guard: David Chen

Narrative:
Dispute between visitor and courier. De-escalated; both parties left.

Status: CLOSED`,
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter(d => d.title.toLowerCase().includes(s) || d.when.toLowerCase().includes(s) || d.report.toLowerCase().includes(s));
  }, [q, data]);

  return (
    <div className="hist-page">
      <header className="hist-header">
        <h1>Incident Report History</h1>
        <input
          className="input hist-search"
          placeholder="Search by title, time, or content…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>

      <ul className="hist-list">
        {filtered.map(item => (
          <li key={item.id} className="hist-item" onClick={() => setSelected(item)}>
            <div className="dot" />
            <div className="meta">
              <strong>{item.title}</strong>
              <span className="muted">{item.when}</span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && <li className="hist-empty muted">No matching reports.</li>}
      </ul>

      {/* detail modal */}
      <div className={`report-modal ${selected ? "open" : ""}`}>
        <div className="report-card">
          <div className="report-head">
            <h3>Report</h3>
            <button className="close" onClick={() => setSelected(null)}>✕</button>
          </div>
          <pre className="report-body">{selected?.report}</pre>
        </div>
      </div>
    </div>
  );
}
