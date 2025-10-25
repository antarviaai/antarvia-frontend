import React, { useMemo, useState, useEffect } from "react";
import "./GuardResponderInterviewPage.css";

// Steps (flashcards). We inserted "vehiclePlates" AFTER "vehicles".
const QUESTIONS = [
  { id: "type", title: "1 • Responder Type", type: "select", options: ["Police", "Fire", "Paramedic", "Other"] },
  { id: "officers", title: "2 • How many officers on site?", type: "number" },
  { id: "badges", title: "3 • Badge / ID Numbers", type: "dynamic-text", dependsOn: "officers" },
  { id: "arrival", title: "4 • Arrival Time", type: "time" },
  { id: "reason", title: "5 • Reason for Attendance", type: "select", options: ["Alarm activation", "Confirmed fire/smoke", "Medical call", "Security incident", "Other"] },
  { id: "actions", title: "6 • Actions Taken", type: "chips", options: ["Evacuation Assisted", "Scene Secured", "First Aid Provided", "Fire Suppressed", "Crowd Control", "Traffic Control", "Other"] },
  { id: "vehicles", title: "7 • Number of vehicles", type: "number" },
  { id: "vehiclePlates", title: "8 • Vehicle Plate Numbers", type: "plates", dependsOn: "vehicles" },
  { id: "personnel", title: "9 • Total personnel on site", type: "number" },
];

export default function GuardResponderInterviewPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState({
    type: "Police",
    customType: "",
    officers: 1,
    badges: [""],
    arrival: "",
    reason: "Alarm activation",
    customReason: "",
    actions: [],
    customAction: "",
    vehicles: 1,
    vehiclePlates: [""],
    personnel: 1,
  });

  const [toast, setToast] = useState("");
  const [completeOpen, setCompleteOpen] = useState(false);

  // Keep badges array length in sync with officers
  useEffect(() => {
    const count = Math.max(0, parseInt(answers.officers || 0, 10));
    setAnswers((prev) => ({
      ...prev,
      badges: Array(count).fill("").map((_, i) => prev.badges?.[i] || ""),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.officers]);

  // Keep vehiclePlates array length in sync with vehicles
  useEffect(() => {
    const count = Math.max(0, parseInt(answers.vehicles || 0, 10));
    setAnswers((prev) => ({
      ...prev,
      vehiclePlates: Array(count).fill("").map((_, i) => prev.vehiclePlates?.[i] || ""),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.vehicles]);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  function toastMsg(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function setField(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function setBadge(i, value) {
    setAnswers((prev) => {
      const arr = [...(prev.badges || [])];
      arr[i] = value;
      return { ...prev, badges: arr };
    });
  }

  function setPlate(i, value) {
    setAnswers((prev) => {
      const arr = [...(prev.vehiclePlates || [])];
      arr[i] = value.toUpperCase();
      return { ...prev, vehiclePlates: arr };
    });
  }

  function toggleAction(action) {
    if (action === "Other") {
      // toggle "Other" like a chip (presence tracked in actions array)
      const has = answers.actions.includes("Other");
      setAnswers((prev) => ({
        ...prev,
        actions: has ? prev.actions.filter((a) => a !== "Other") : [...prev.actions, "Other"],
        // don't clear customAction automatically so guard doesn't lose typed text
      }));
      return;
    }
    const has = answers.actions.includes(action);
    setAnswers((prev) => ({
      ...prev,
      actions: has ? prev.actions.filter((a) => a !== action) : [...prev.actions, action],
    }));
  }

  function nextStep() {
    if (currentStep < QUESTIONS.length - 1) setCurrentStep((s) => s + 1);
    else finishInterview();
  }

  function prevStep() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function finishInterview() {
    // show success overlay
    setCompleteOpen(true);
    setTimeout(() => {
      setCompleteOpen(false);
    }, 1800);
  }

  const effectiveType = answers.type === "Other" ? (answers.customType || "Other") : answers.type;
  const effectiveReason = answers.reason === "Other" ? (answers.customReason || "Other") : answers.reason;
  const effectiveActions = useMemo(() => {
    let list = answers.actions.filter((a) => a !== "Other");
    if (answers.actions.includes("Other") && answers.customAction.trim()) {
      list = [...list, answers.customAction.trim()];
    } else if (answers.actions.includes("Other") && !answers.customAction.trim()) {
      list = [...list, "Other"];
    }
    return list;
  }, [answers.actions, answers.customAction]);

  const summaryText = useMemo(() => {
    return `RESPONDER INTERVIEW SUMMARY

Responder Type: ${effectiveType}
Arrival Time: ${answers.arrival || "—"}

Officers On Site: ${answers.officers || 0}
Badge / ID Numbers: ${(answers.badges || []).filter(Boolean).join(", ") || "—"}

Reason for Attendance: ${effectiveReason}
Actions Taken: ${effectiveActions.length ? effectiveActions.join(", ") : "—"}

Vehicles: ${answers.vehicles || 0}
Vehicle Plates: ${(answers.vehiclePlates || []).filter(Boolean).join(", ") || "—"}

Total Personnel: ${answers.personnel || 0}
`;
  }, [answers, effectiveType, effectiveReason, effectiveActions]);

  function copySummary() {
    navigator.clipboard.writeText(summaryText).then(() => toastMsg("Summary copied"));
  }

  function renderField(q) {
    switch (q.type) {
      case "select":
        return (
          <>
            <select
              className="input selectlike"
              value={answers[q.id]}
              onChange={(e) => setField(q.id, e.target.value)}
            >
              {q.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Custom text when "Other" */}
            {answers[q.id] === "Other" && (
              <div className="form-group" style={{ marginTop: 12 }}>
                <label>Specify</label>
                <input
                  className="input"
                  value={q.id === "type" ? answers.customType : answers.customReason}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q.id === "type" ? "customType" : "customReason"]: e.target.value,
                    }))
                  }
                  placeholder="Type here…"
                />
              </div>
            )}
          </>
        );

      case "number":
        return (
          <input
            className="input"
            type="number"
            min="0"
            value={answers[q.id]}
            onChange={(e) => setField(q.id, e.target.value)}
          />
        );

      case "time":
        return (
          <input
            className="input"
            type="time"
            value={answers[q.id]}
            onChange={(e) => setField(q.id, e.target.value)}
          />
        );

      case "dynamic-text":
        return (
          <>
            <div className="info-note">
              Enter each badge/ID number — the fields match the officer count.
            </div>
            <div className="badge-grid">
              {(answers.badges || []).length === 0 && (
                <div className="muted">No officers configured yet.</div>
              )}
              {(answers.badges || []).map((val, i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Badge #${i + 1}`}
                  value={val}
                  onChange={(e) => setBadge(i, e.target.value)}
                />
              ))}
            </div>
          </>
        );

      case "chips":
        return (
          <>
            <div className="chip-grid">
              {q.options.map((opt) => {
                const active = answers.actions.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`chip ${active ? "active" : ""}`}
                    onClick={() => toggleAction(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* If "Other" enabled, show a text field */}
            {answers.actions.includes("Other") && (
              <div className="form-group" style={{ marginTop: 12 }}>
                <label>Custom Action</label>
                <input
                  className="input"
                  placeholder="Describe the action taken…"
                  value={answers.customAction}
                  onChange={(e) => setField("customAction", e.target.value)}
                />
              </div>
            )}
          </>
        );

      case "plates":
        return (
          <>
            <div className="info-note">
              Enter the license plate for each vehicle. Total vehicles:{" "}
              <strong>{parseInt(answers.vehicles || 0, 10)}</strong>
            </div>
            <div className="badge-grid">
              {(answers.vehiclePlates || []).length === 0 && (
                <div className="muted">No vehicles set yet.</div>
              )}
              {(answers.vehiclePlates || []).map((val, i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Plate #${i + 1}`}
                  value={val}
                  onChange={(e) => setPlate(i, e.target.value)}
                />
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="interview-page-wrapper">
      <div className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <div className="progress-container">
            <p className="progress-label">
              Step {currentStep + 1} of {QUESTIONS.length}
            </p>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* jump rail */}
          <div className="step-rail">
            {QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                className={`step-dot ${i === currentStep ? "active" : ""}`}
                onClick={() => setCurrentStep(i)}
                title={q.title}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="interview-body">
          {/* Left: active question card */}
          <div className="question-panel">
            <div className="question-card">
              <div className="question-head">
                <h2>{QUESTIONS[currentStep].title}</h2>
                <div className="muted small">Use TAB/ENTER to move quickly.</div>
              </div>

              <div className="question-body">
                {renderField(QUESTIONS[currentStep])}
              </div>
            </div>
          </div>

          {/* Right: live summary & quick actions */}
          <div className="summary-panel">
            <h2>Interview Summary</h2>
            <div className="summary-content">
              {QUESTIONS.map((q) => {
                let val = answers[q.id];

                if (q.type === "select" && q.id === "type" && val === "Other") {
                  val = answers.customType || "Other";
                }
                if (q.type === "select" && q.id === "reason" && val === "Other") {
                  val = answers.customReason || "Other";
                }
                if (q.id === "badges") {
                  val = (answers.badges || []).filter(Boolean).join(", ");
                }
                if (q.id === "actions") {
                  val = (useMemo(() => {
                    let list = answers.actions.filter((a) => a !== "Other");
                    if (answers.actions.includes("Other") && answers.customAction.trim()) {
                      list = [...list, answers.customAction.trim()];
                    } else if (answers.actions.includes("Other") && !answers.customAction.trim()) {
                      list = [...list, "Other"];
                    }
                    return list;
                  }, [answers.actions, answers.customAction]) || []).join(", ");
                }
                if (q.id === "vehiclePlates") {
                  val = (answers.vehiclePlates || []).filter(Boolean).join(", ");
                }
                if (Array.isArray(val)) val = val.filter(Boolean).join(", ");

                return (
                  <div key={q.id} className="summary-item">
                    <label>{q.title.split("•")[1].trim()}</label>
                    <span>{val || "—"}</span>
                  </div>
                );
              })}
            </div>

            <div className="side-actions">
              <button className="ghost-btn" onClick={copySummary}>
                Copy Summary
              </button>
              <button
                className="ghost-btn"
                onClick={() => {
                  toastMsg("Preview ready — copied");
                  copySummary();
                }}
              >
                Quick Preview
              </button>
            </div>

            <div className="yellow-tip">
              <h3>Tip</h3>
              <p>
                Keep details factual and chronological. Ask responders for names, badge numbers,
                actions performed, and vehicle plates.
              </p>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="interview-footer">
          <button className="nav-btn" onClick={prevStep} disabled={currentStep === 0}>
            Back
          </button>
          <button className="nav-btn next" onClick={nextStep}>
            {currentStep === QUESTIONS.length - 1 ? "Finish Interview" : "Next"}
          </button>
        </div>
      </div>

      {/* Success overlay (dark) */}
      <div className={`complete-overlay ${completeOpen ? "show" : ""}`}>
        <div className="complete-card">
          <h2>Interview Complete</h2>
          <p className="muted">Summary copied to clipboard.</p>
        </div>
      </div>

      {/* toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
