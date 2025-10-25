import React, { useMemo, useState } from "react";
import "./GuardViolationNoticePage.css";

const VIOLATION_TYPES = [
  "Noise",
  "Parking",
  "Garbage/Chute",
  "Smoking",
  "Balcony",
  "Damage",
  "Harassment",
  "Other",
];

const MOCK_VIOLATIONS = [
  {
    id: 1,
    unit: "1203",
    resident: "Jane Doe",
    type: "Noise",
    when: "2025-10-11 22:40",
    summary: "Loud music after quiet hours; issue resolved after warning.",
  },
  {
    id: 2,
    unit: "803",
    resident: "Mike Carter",
    type: "Parking",
    when: "2025-10-10 18:05",
    summary: "Visitor vehicle parked in resident spot; notice issued.",
  },
  {
    id: 3,
    unit: "PH01",
    resident: "Michael Lee",
    type: "Smoking",
    when: "2025-10-08 14:20",
    summary: "Smoking reported on balcony; reminder of by-law sent.",
  },
];

export default function GuardViolationNoticePage() {
  // list
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(MOCK_VIOLATIONS);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.unit.toLowerCase().includes(q) ||
        i.resident.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
    );
  }, [search, items]);

  // create
  const [openCreate, setOpenCreate] = useState(false);
  const [unit, setUnit] = useState("");
  const [resident, setResident] = useState("");
  const [type, setType] = useState("Noise");
  const [customType, setCustomType] = useState("");
  const [desc, setDesc] = useState("");
  const [photoName, setPhotoName] = useState("");

  // AI sheet preview
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetText, setSheetText] = useState("");

  // view
  const [viewItem, setViewItem] = useState(null);

  // success overlay
  const [successOpen, setSuccessOpen] = useState(false);

  // toast
  const [toast, setToast] = useState("");

  const effectiveType = type === "Other" ? (customType || "Other") : type;

  function toastMsg(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function resetForm() {
    setUnit("");
    setResident("");
    setType("Noise");
    setCustomType("");
    setDesc("");
    setPhotoName("");
  }

  function generatePreview() {
    if (!unit.trim() || !resident.trim() || !desc.trim()) {
      toastMsg("Please fill Unit, Resident, and Description.");
      return;
    }
    const txt = `VIOLATION NOTICE
Unit: ${unit}
Resident: ${resident}
Category: ${effectiveType}
Date: ${new Date().toLocaleString()}

Summary:
${desc}

Next Steps:
- Please comply with the building by-laws.
- Repeated violations may lead to further action.

This is an official notice from building management.`;
    setSheetText(txt);
    setSheetOpen(true);
  }

  function logAndNotify() {
    const newItem = {
      id: Date.now(),
      unit,
      resident,
      type: effectiveType,
      when: new Date().toISOString().slice(0, 16).replace("T", " "),
      summary: desc.slice(0, 120) + (desc.length > 120 ? "…" : ""),
    };
    setItems((prev) => [newItem, ...prev]);
    setSheetOpen(false);
    setOpenCreate(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1800);
    resetForm();
  }

  function onFile(e) {
    const f = e.target.files?.[0];
    setPhotoName(f ? f.name : "");
  }

  return (
    <div className="vn-page">
      <header className="vn-head">
        <div>
          <h1>Violation Notice</h1>
          <p>Create and manage violation notices quickly and cleanly.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenCreate(true)}>
          + New Violation
        </button>
      </header>

      <div className="vn-toolbar">
        <input
          className="input search"
          placeholder="Search by unit, resident, type, or text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="vn-list">
        {filtered.map((i) => (
          <li key={i.id} className="vn-item" onClick={() => setViewItem(i)}>
            <div className="vn-item-top">
              <div className="chip">{i.type}</div>
              <span className="muted">{i.when}</span>
            </div>
            <div className="vn-item-main">
              <strong>Unit {i.unit}</strong>
              <span className="divider">•</span>
              <span>{i.resident}</span>
            </div>
            <p className="vn-item-summary">{i.summary}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="vn-empty muted">No violations found.</li>
        )}
      </ul>

      {/* CREATE MODAL */}
      <div className={`modal ${openCreate ? "open" : ""}`}>
        <div className="card">
          <div className="card-head">
            <h2>New Violation</h2>
            <button className="icon-btn" onClick={() => setOpenCreate(false)}>
              ✕
            </button>
          </div>

          <div className="grid">
            <div className="fg">
              <label>Unit</label>
              <input
                className="input"
                placeholder="e.g., 803"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div className="fg">
              <label>Resident</label>
              <input
                className="input"
                placeholder="e.g., Mike Carter"
                value={resident}
                onChange={(e) => setResident(e.target.value)}
              />
            </div>
            <div className="fg">
              <label>Type</label>
              <select
                className="input selectlike"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {VIOLATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {type === "Other" && (
              <div className="fg fg--full">
                <label>Custom Type</label>
                <input
                  className="input"
                  placeholder="Describe the category"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                />
              </div>
            )}

            <div className="fg fg--full">
              <label>Description</label>
              <textarea
                className="textarea"
                placeholder="What happened? Include date/time, location, and short details."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="help">
                Keep it factual and neutral. Attach a photo if available.
              </div>
            </div>

            <div className="fg fg--full">
              <label>Attach Photo (optional)</label>
              <label className="file">
                <input type="file" onChange={onFile} />
                <span>{photoName || "Choose image…"}</span>
              </label>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-ghost" onClick={() => setOpenCreate(false)}>
              Cancel
            </button>
            <button className="btn btn-ai" onClick={generatePreview}>
              Generate Notice Text
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      <div className={`modal ${viewItem ? "open" : ""}`}>
        <div className="card">
          <div className="card-head">
            <h2>Violation Details</h2>
            <button className="icon-btn" onClick={() => setViewItem(null)}>
              ✕
            </button>
          </div>

          {viewItem && (
            <>
              <div className="detail-rows">
                <div className="row">
                  <label>Unit</label>
                  <span> {viewItem.unit}</span>
                </div>
                <div className="row">
                  <label>Resident</label>
                  <span> {viewItem.resident}</span>
                </div>
                <div className="row">
                  <label>Type</label>
                  <span> {viewItem.type}</span>
                </div>
                <div className="row">
                  <label>Date</label>
                  <span> {viewItem.when}</span>
                </div>
              </div>
              <div className="preview-box">
                <pre>{viewItem.summary}</pre>
              </div>

              <div className="actions">
                <button className="btn btn-ghost" onClick={() => setViewItem(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => toastMsg("Downloading PDF…")}
                >
                  Download PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI PREVIEW SHEET */}
      <div className={`sheet-overlay ${sheetOpen ? "open" : ""}`}>
        <div className="sheet">
          <div className="sheet-head">
            <h3>Notice Preview</h3>
            <button className="sheet-close" onClick={() => setSheetOpen(false)}>
              ✕
            </button>
          </div>
          <pre className="sheet-body">{sheetText}</pre>
          <div className="sheet-actions">
            <button className="btn btn-primary" onClick={logAndNotify}>
              Log &amp; Notify Resident
            </button>
            <button className="btn btn-ghost" onClick={() => setSheetOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* SUCCESS OVERLAY */}
      <div className={`success ${successOpen ? "show" : ""}`}>
        <div className="success-card">
          <h3>Notice Sent</h3>
        </div>
      </div>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
