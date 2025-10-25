import React, { useEffect, useMemo, useRef, useState } from 'react';
import './GuardPackagesPage.css';

const DEFAULT_CARRIERS = ['Amazon', 'FedEx', 'UPS', 'Canada Post'];

const ts = () => new Date().toISOString();

const GuardPackagesPage = () => {
  const [activeTab, setActiveTab] = useState('log-packages');

  // intake states
  const [queue, setQueue] = useState([]);
  const [ready, setReady] = useState([]);
  const [picked, setPicked] = useState([]);

  // form fields
  const unitRef = useRef(null);
  const [unit, setUnit] = useState('');
  const [carrier, setCarrier] = useState('');       // selected carrier label
  const [otherCarrier, setOtherCarrier] = useState('');
  const isOther = carrier === 'Other';
  const [tracking, setTracking] = useState('');
  const [notes, setNotes] = useState('');

  // courier lock (sticky)
  const [carrierLocked, setCarrierLocked] = useState(false);
  useEffect(() => {
    const locked = localStorage.getItem('pkg_carrier_locked') === 'true';
    const saved = localStorage.getItem('pkg_locked_carrier') || '';
    setCarrierLocked(locked);
    if (locked && saved) setCarrier(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('pkg_carrier_locked', String(carrierLocked));
    if (carrierLocked) localStorage.setItem('pkg_locked_carrier', carrier);
  }, [carrierLocked, carrier]);

  // add ONE to Ready (Send)
  const handleSend = () => {
    if (!unit || !(carrier || (isOther && otherCarrier))) return;
    const finalCarrier = isOther ? otherCarrier.trim() : carrier.trim();
    const pkg = { id: Date.now(), unit: unit.trim(), carrier: finalCarrier, tracking: tracking.trim(), notes: notes.trim(), createdAt: ts() };
    setReady(prev => [pkg, ...prev]);                 // goes straight to “Ready”
    // reset fields (respect lock)
    setUnit('');
    setTracking('');
    setNotes('');
    if (!carrierLocked) setCarrier('');
    setOtherCarrier('');
    unitRef.current?.focus();
    setActiveTab('recently-logged'); // jump guard to list
  };

  // add to Queue
  const handleAddToQueue = (e) => {
    e.preventDefault();
    if (!unit || !(carrier || (isOther && otherCarrier))) return;
    const finalCarrier = isOther ? otherCarrier.trim() : carrier.trim();
    const pkg = { id: Date.now(), unit: unit.trim(), carrier: finalCarrier, tracking: tracking.trim(), notes: notes.trim(), createdAt: ts() };
    setQueue(prev => [pkg, ...prev]);
    // reset (respect lock)
    setUnit('');
    setTracking('');
    setNotes('');
    if (!carrierLocked) setCarrier('');
    setOtherCarrier('');
    unitRef.current?.focus();
  };

  const removeFromQueue = (id) => setQueue(prev => prev.filter(p => p.id !== id));

  const confirmAndNotifyAll = () => {
    if (!queue.length) return;
    setReady(prev => [...queue, ...prev]);
    setQueue([]);
    setActiveTab('recently-logged');
  };

  // pickup flow
  const [pickupEditingId, setPickupEditingId] = useState(null);
  const [pickupRecipient, setPickupRecipient] = useState('');
  const startPickup = (id) => { setPickupEditingId(id); setPickupRecipient(''); };
  const cancelPickup = () => { setPickupEditingId(null); setPickupRecipient(''); };
  const confirmPickup = (pkg) => {
    if (!pickupRecipient.trim()) return;
    setReady(prev => prev.filter(p => p.id !== pkg.id));
    setPicked(prev => [{ ...pkg, pickedUpAt: ts(), pickedBy: pickupRecipient.trim() }, ...prev]);
    cancelPickup();
  };

  // search
  const [searchReady, setSearchReady] = useState('');
  const [searchPicked, setSearchPicked] = useState('');
  const readyFiltered = useMemo(() => {
    const q = searchReady.toLowerCase();
    return ready.filter(p => `${p.unit} ${p.carrier} ${p.tracking}`.toLowerCase().includes(q));
  }, [ready, searchReady]);
  const pickedFiltered = useMemo(() => {
    const q = searchPicked.toLowerCase();
    return picked.filter(p => `${p.unit} ${p.carrier} ${p.tracking} ${p.pickedBy}`.toLowerCase().includes(q));
  }, [picked, searchPicked]);

  const canSubmit = unit && (carrier || (isOther && otherCarrier));

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="title-group"><h1>Package Management</h1></div>
        <div className="header-actions">
          <button className="icon-btn" title="Export CSV">⬇️</button>
          <button className="icon-btn" title="Print List">🖨️</button>
        </div>
      </header>

      <nav className="tab-nav">
        <button className={`tab-btn ${activeTab === 'log-packages' ? 'active' : ''}`} onClick={() => setActiveTab('log-packages')}>Log New Packages</button>
        <button className={`tab-btn ${activeTab === 'recently-logged' ? 'active' : ''}`} onClick={() => setActiveTab('recently-logged')}>Ready for Pickup</button>
        <button className={`tab-btn ${activeTab === 'picked-up' ? 'active' : ''}`} onClick={() => setActiveTab('picked-up')}>Picked Up</button>
      </nav>

      <div className="tab-content">
        {/* LOG NEW */}
        <div className={`tab-pane ${activeTab === 'log-packages' ? 'active' : ''}`}>
          <div className="important-note">
            <div className="note-text"><strong>Pro tip:</strong> Lock the courier when most deliveries are the same (e.g., Amazon). Unlock any time.</div>
          </div>

          <div className="batch-entry-container">
            {/* left form */}
            <div className="entry-form">
              <h2 className="section-title">Package Details</h2>
              <form onSubmit={handleAddToQueue}>
                <div className="field">
                  <label className="label">Unit Number</label>
                  <input ref={unitRef} className="text" value={unit} onChange={(e)=>setUnit(e.target.value)} placeholder="e.g., 1203" required />
                </div>

                <div className="field">
                  <div className="label-row">
                    <label className="label">Courier</label>
                    <button
                      type="button"
                      className={`lock-btn ${carrierLocked ? 'locked' : ''}`}
                      onClick={() => {
                        if (!carrier && !carrierLocked) return;
                        setCarrierLocked(v => !v);
                      }}
                      title={carrierLocked ? 'Unlock courier' : 'Lock courier'}
                    >
                      {carrierLocked ? '🔒 Locked' : '🔓 Lock'}
                    </button>
                  </div>

                  <div className="chips">
                    {DEFAULT_CARRIERS.map(c => (
                      <button
                        key={c}
                        type="button"
                        className={`chip ${carrier === c ? 'chip-active' : ''}`}
                        onClick={() => !carrierLocked && setCarrier(c)}
                      >
                        {c}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`chip ${isOther ? 'chip-active' : ''}`}
                      onClick={() => !carrierLocked && setCarrier('Other')}
                    >
                      Other
                    </button>
                  </div>

                  {isOther && (
                    <input
                      className="text"
                      placeholder="Type courier name"
                      value={otherCarrier}
                      onChange={(e) => setOtherCarrier(e.target.value)}
                      disabled={carrierLocked}
                    />
                  )}
                </div>

                <div className="field">
                  <label className="label">Tracking # (Optional)</label>
                  <input className="text" value={tracking} onChange={(e)=>setTracking(e.target.value)} placeholder="Paste/scan tracking number" />
                </div>

                <div className="field">
                  <label className="label">Notes (Optional)</label>
                  <input className="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any special instructions" />
                </div>

                <div className="form-actions">
                  <button type="button" className="action-btn tertiary" onClick={handleSend} disabled={!canSubmit}>Send</button>
                  <button type="submit" className="action-btn" disabled={!canSubmit}>Add to Queue</button>
                </div>
              </form>
            </div>

            {/* right queue */}
            <div className="entry-queue">
              <div className="queue-header">
                <h3>Entry Queue ({queue.length})</h3>
                {queue.length > 0 && (
                  <button className="action-btn" onClick={confirmAndNotifyAll}>Confirm & Notify All</button>
                )}
              </div>

              <ul className="queue-list">
                {queue.map(pkg => (
                  <li key={pkg.id} className="queue-item">
                    <strong>Unit {pkg.unit} • {pkg.carrier}</strong>
                    <span>{pkg.tracking ? `Tracking: ${pkg.tracking}` : (pkg.notes || 'No notes')}</span>
                    <div className="queue-actions">
                      <button className="mini-btn danger" onClick={() => removeFromQueue(pkg.id)}>Remove</button>
                    </div>
                  </li>
                ))}
                {queue.length === 0 && (
                  <li className="queue-item" style={{ opacity: .65 }}>Queue is empty. Add packages from the form.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* READY */}
        <div className={`tab-pane ${activeTab === 'recently-logged' ? 'active' : ''}`}>
          <div className="list-toolbar">
            <input className="search-field" placeholder="Search unit, courier, tracking…" value={searchReady} onChange={(e)=>setSearchReady(e.target.value)} />
          </div>

          <div className="cards-grid">
            {readyFiltered.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="pc-row">
                  <div className="pc-title">Unit {pkg.unit}</div>
                  <div className="pc-chip">Ready</div>
                </div>
                <div className="pc-meta">Courier: <b>{pkg.carrier}</b></div>
                {pkg.tracking && <div className="pc-meta">Tracking: <b>{pkg.tracking}</b></div>}
                {pkg.notes && <div className="pc-meta">Notes: <b>{pkg.notes}</b></div>}
                <div className="pc-time">Logged {new Date(pkg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>

                {pickupEditingId === pkg.id ? (
                  <div className="pickup-inline">
                    <input className="text" placeholder="Recipient full name" value={pickupRecipient} onChange={(e)=>setPickupRecipient(e.target.value)} />
                    <div className="inline-actions">
                      <button className="action-btn" onClick={() => confirmPickup(pkg)} disabled={!pickupRecipient.trim()}>Confirm Pickup</button>
                      <button className="action-btn tertiary" onClick={cancelPickup}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="pc-actions">
                    <button className="action-btn" onClick={() => startPickup(pkg.id)}>Pick Up</button>
                  </div>
                )}
              </div>
            ))}
            {readyFiltered.length === 0 && <div className="empty-state">Nothing here yet.</div>}
          </div>
        </div>

        {/* PICKED */}
        <div className={`tab-pane ${activeTab === 'picked-up' ? 'active' : ''}`}>
          <div className="list-toolbar">
            <input className="search-field" placeholder="Search unit, courier, tracking, recipient…" value={searchPicked} onChange={(e)=>setSearchPicked(e.target.value)} />
          </div>
          <div className="cards-grid">
            {pickedFiltered.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="pc-row">
                  <div className="pc-title">Unit {pkg.unit}</div>
                  <div className="pc-chip pc-chip--green">Picked Up</div>
                </div>
                <div className="pc-meta">Courier: <b>{pkg.carrier}</b></div>
                {pkg.tracking && <div className="pc-meta">Tracking: <b>{pkg.tracking}</b></div>}
                <div className="pc-meta">Recipient: <b>{pkg.pickedBy || '—'}</b></div>
                <div className="pc-time">
                  Picked {new Date(pkg.pickedUpAt).toLocaleDateString()} {new Date(pkg.pickedUpAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {pickedFiltered.length === 0 && <div className="empty-state">No pickups recorded yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardPackagesPage;
