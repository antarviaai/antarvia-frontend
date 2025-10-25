import React, { useMemo, useState } from "react";
import "./GuardMaintenanceRequestPage.css";

/** --- Mock Data --- */
const MOCK_UNITS = [
  { id: 1, label: "101", resident: "John Smith" },
  { id: 2, label: "205", resident: "Ava Patel" },
  { id: 3, label: "510", resident: "Liam Chen" },
  { id: 4, label: "801", resident: "Jane Doe" },
  { id: 5, label: "PH01", resident: "Michael Lee" },
];

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliance",
  "Door/Lock",
  "Window/Glass",
  "Common Area",
  "Parking/Garage",
  "Other",
];

const PRIORITIES = ["Low", "Normal", "High", "Emergency"];

const ROLES = ["Cleaners", "Superintendent", "Concierge", "Contractor"];
const PEOPLE = {
  Cleaners: ["Sam (Cleaner)", "Maya (Cleaner)"],
  Superintendent: ["Alex (Sup)", "Rita (Sup)"],
  Concierge: ["Tom (Concierge)"],
  Contractor: ["BrightFix Ltd.", "PowerFlow Inc."],
};

const QUICK_PARTS = [
  "Light Bulb",
  "Air Filter",
  "Door Battery",
  "Remote Battery",
  "Thermostat Battery",
  "Smoke Detector Battery",
];

export default function GuardMaintenanceRequestPage() {
  /** Form state */
  const [unit, setUnit] = useState("");
  const [resident, setResident] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Plumbing");
  const [customCategory, setCustomCategory] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [urgent, setUrgent] = useState(false);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");

  const [scheduleOn, setScheduleOn] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [files, setFiles] = useState([]);
  const [parts, setParts] = useState([]);

  /** Assignments */
  const [selectedRoles, setSelectedRoles] = useState(["Superintendent"]);
  const [assignees, setAssignees] = useState([]); // from PEOPLE dict

  /** UI helpers */
  const [unitOpen, setUnitOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const effectiveCategory = category === "Other" ? (customCategory || "Other") : category;

  /** Autocomplete matches */
  const unitMatches = useMemo(() => {
    const q = unit.trim().toLowerCase();
    if (!q) return MOCK_UNITS;
    return MOCK_UNITS.filter(
      (u) =>
        u.label.toLowerCase().includes(q) ||
        u.resident.toLowerCase().includes(q)
    );
  }, [unit]);

  function pickUnit(u) {
    setUnit(u.label);
    setResident(u.resident);
    setUnitOpen(false);
  }

  function togglePart(p) {
    setParts((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function onFiles(e) {
    const list = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...list]);
  }

  function toggleRole(role) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    // keep assignees list tidy (only known names)
    setAssignees((prev) =>
      prev.filter((a) =>
        Object.values(PEOPLE).flat().includes(a)
      )
    );
  }

  function toggleAssignee(name) {
    setAssignees((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  }

  function toastMsg(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  function clearForm() {
    setUnit("");
    setResident("");
    setLocation("");
    setCategory("Plumbing");
    setCustomCategory("");
    setPriority("Normal");
    setUrgent(false);
    setSummary("");
    setDetails("");
    setScheduleOn(false);
    setDate("");
    setTime("");
    setFiles([]);
    setParts([]);
    setSelectedRoles(["Superintendent"]);
    setAssignees([]);
    toastMsg("Form cleared");
  }

  function onSave() {
    const payload = {
      unit,
      resident,
      location,
      category: effectiveCategory,
      priority: urgent ? "Emergency" : priority,
      summary,
      details,
      schedule: scheduleOn ? `${date || "—"} ${time || ""}`.trim() : "No schedule",
      parts,
      files: files.map((f) => f.name),
      roles: selectedRoles,
      assignees,
    };
    console.log("SAVE_MAINT_TICKET", payload);
    toastMsg("Maintenance ticket saved");
  }

  function onAssign() {
    if (assignees.length === 0) {
      toastMsg("Select at least one assignee");
      return;
    }
    toastMsg(`Assigned to: ${assignees.join(", ")}`);
  }

  function onPrint() {
    setSheetOpen(true);
  }

  const printable = useMemo(
    () =>
`WORK ORDER
──────────────
Unit: ${unit || "—"}
Resident: ${resident || "—"}
Location: ${location || "—"}

Category: ${effectiveCategory}
Priority: ${urgent ? "Emergency" : priority}

Summary:
${summary || "—"}

Details:
${details || "—"}

Schedule: ${scheduleOn ? `${date || "—"} ${time || ""}`.trim() : "—"}

Parts/Materials: ${parts.length ? parts.join(", ") : "—"}

Roles: ${selectedRoles.length ? selectedRoles.join(", ") : "—"}
Assignees: ${assignees.length ? assignees.join(", ") : "—"}

Attachments: ${files.length ? files.map((f) => f.name).join(", ") : "—"}
`,
    [
      unit, resident, location, effectiveCategory, urgent, priority,
      summary, details, scheduleOn, date, time, parts, selectedRoles,
      assignees, files
    ]
  );

  /** People options filtered by selected roles */
  const availablePeople = useMemo(
    () => selectedRoles.flatMap((role) => PEOPLE[role] || []),
    [selectedRoles]
  );

  return (
    <div className="maint-plain">
      {/* headline */}
      <div className="hp-row">
        <div>
          <h1>Create Maintenance</h1>
          <p className="muted">Log a work order and assign it to cleaners, superintendent, or others.</p>
        </div>
        <div className="head-actions">
          <button className="ghost" onClick={clearForm}>Clear</button>
          <button className="ghost" onClick={() => toastMsg("Draft saved")}>Save Draft</button>
        </div>
      </div>

      {/* UNIT / RESIDENT / LOCATION */}
      <section className="hp-section">
        <div className="hp-grid">
          <div className="hp-cell">
            <label>Unit</label>
            <div className="auto-wrap">
              <input
                className="input"
                placeholder="e.g., 801"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  setUnitOpen(true);
                }}
                onFocus={() => setUnitOpen(true)}
                onBlur={() => setTimeout(() => setUnitOpen(false), 150)}
              />
              {unitOpen && (
                <div className="auto-menu">
                  {unitMatches.map((u) => (
                    <button key={u.id} className="auto-item" onMouseDown={() => pickUnit(u)}>
                      <span className="strong">{u.label}</span>
                      <span className="muted">{u.resident}</span>
                    </button>
                  ))}
                  {unitMatches.length === 0 && <div className="auto-empty">No matches</div>}
                </div>
              )}
            </div>
          </div>

          <div className="hp-cell">
            <label>Resident</label>
            <input
              className="input"
              placeholder="Auto-fills when selecting a unit…"
              value={resident}
              onChange={(e) => setResident(e.target.value)}
            />
          </div>

          <div className="hp-cell">
            <label>Location (Room/Area)</label>
            <input
              className="input"
              placeholder="Kitchen, Bathroom, Lobby…"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* CATEGORY / PRIORITY */}
      <section className="hp-section">
        <div className="hp-grid">
          <div className="hp-cell">
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
            <div className="hp-cell">
              <label>Specify Category</label>
              <input
                className="input"
                placeholder="Describe the category…"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </div>
          )}

          <div className="hp-cell">
            <label>Priority</label>
            <div className="inline">
              <select
                className="input selectlike"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <label className={`toggle ${urgent ? "on" : ""}`}>
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                />
                <span>Mark Urgent</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY / DETAILS */}
      <section className="hp-section">
        <div className="hp-grid">
          <div className="hp-cell grow">
            <label>Summary</label>
            <input
              className="input"
              placeholder="Short one-liner (e.g., Leaking under kitchen sink)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>

        <div className="hp-grid">
          <div className="hp-cell grow">
            <label>Detailed Description</label>
            <textarea
              className="textarea big"
              placeholder="Describe the issue, troubleshooting done, access notes, pet info, etc."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* SCHEDULING */}
      <section className="hp-section">
        <div className="hp-row space">
          <h3>Scheduling (Optional)</h3>
          <label className={`toggle ${scheduleOn ? "on" : ""}`}>
            <input
              type="checkbox"
              checked={scheduleOn}
              onChange={(e) => setScheduleOn(e.target.checked)}
            />
            <span>Schedule a time</span>
          </label>
        </div>

        {scheduleOn && (
          <div className="hp-grid">
            <div className="hp-cell">
              <label>Date</label>
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="hp-cell">
              <label>Time</label>
              <input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
        )}
      </section>

      {/* ASSIGNMENTS */}
      <section className="hp-section">
        <div className="hp-row">
          <div className="hp-col">
            <h3>Assignments</h3>
            <p className="muted">Select teams and people to receive this work order.</p>
            <div className="chip-row">
              {ROLES.map((r) => {
                const active = selectedRoles.includes(r);
                return (
                  <button key={r} className={`chip ${active ? "active" : ""}`} onClick={() => toggleRole(r)}>
                    {r}
                  </button>
                );
              })}
            </div>

            <div className="people-row">
              {availablePeople.map((p) => {
                const active = assignees.includes(p);
                return (
                  <button key={p} className={`pill ${active ? "on" : ""}`} onClick={() => toggleAssignee(p)}>
                    {p}
                  </button>
                );
              })}
              {availablePeople.length === 0 && <div className="muted">Choose a role to see assignable people.</div>}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="hp-section">
        <div className="hp-row">
          <div className="hp-col">
            <h3>Photos / Attachments</h3>
            <label className="dropzone">
              <input type="file" accept="image/*" multiple onChange={onFiles} />
              <div className="dz-text">
                <div className="dz-title">Drop files here or click to upload</div>
                <div className="dz-sub">Photos help techs prepare before arriving.</div>
              </div>
            </label>

            {files.length > 0 && (
              <div className="file-grid">
                {files.map((f, i) => (
                  <div key={i} className="file-pill">
                    <span className="file-name">{f.name}</span>
                    <button className="pill-x" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUICK PARTS */}
      <section className="hp-section">
        <div className="hp-row">
          <div className="hp-col">
            <h3>Quick Parts</h3>
            <div className="chip-row">
              {QUICK_PARTS.map((p) => {
                const active = parts.includes(p);
                return (
                  <button key={p} className={`chip ${active ? "active" : ""}`} onClick={() => togglePart(p)}>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Action Bar */}
      <div className="actionbar">
        <div className="ab-left">
          <span className="muted">
            {assignees.length ? `Assigned: ${assignees.join(", ")}` : "No assignees selected"}
          </span>
        </div>
        <div className="ab-right">
          <button className="btn outline" onClick={onPrint}>Print</button>
          <button className="btn outline" onClick={onAssign}>Assign</button>
          <button className="btn primary" onClick={onSave}>Save</button>
        </div>
      </div>

      {/* Bottom Sheet (Print Preview) */}
      <div className={`sheet-overlay ${sheetOpen ? "open" : ""}`}>
        <div className="sheet">
          <div className="sheet-head">
            <h3>Work Order Preview</h3>
            <button className="sheet-close" onClick={() => setSheetOpen(false)}>✕</button>
          </div>
          <pre className="sheet-body">{printable}</pre>
          <div className="sheet-actions">
            <button
              className="btn primary"
              onClick={() => {
                setSheetOpen(false);
                toastMsg("Work order sent to printer");
              }}
            >
              Print
            </button>
            <button className="btn outline" onClick={() => setSheetOpen(false)}>Close</button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
