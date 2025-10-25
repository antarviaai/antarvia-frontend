import React, { useState } from "react";
import "./UnitLookupPage.css";

const mockUnit = {
  unit_number: "801",
  status: "Owner Occupied",
  floor: "8th Floor",
  residents: [
    { name: "Jane Doe", email: "jane.d@email.com", phone: "416-555-9821" },
  ],
  vehicles: [
    { make: "Honda Civic", color: "Grey", plate: "CABC-123" },
    { make: "Toyota RAV4", color: "Black", plate: "XYZ-789" },
  ],
  pets: [{ type: "Dog", name: "Buddy", notes: "Friendly Golden Retriever" }],
  parking_spots: [
    { type: "Car", spot: "P2-14" },
    { type: "Bike", spot: "B1-08" },
  ],
  lockers: [{ id: "L-312", location: "Locker Room B1" }],
  notes: "No-contact deliveries only",
};

const UnitLookupPage = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearch(q);
    setShow(q.trim() !== "");
  };
  const handleClear = () => {
    setSearch("");
    setShow(false);
  };

  return (
    <div className="unit-page-wrapper">
      {/* === Clean Sticky Search Bar === */}
      <div className="lookup-header">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            className="lookup-input"
            placeholder="Search by Unit, Name, or Plate..."
            value={search}
            onChange={handleSearch}
          />
          {search && (
            <button className="clear-btn" onClick={handleClear}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* === Placeholder or Results === */}
      {!show ? (
        <div className="empty-prompt">
          <h3>Search to view unit details</h3>
          <p>Type a unit number or resident name to begin.</p>
        </div>
      ) : (
        <div className="results-container fade-in">
          <main className="profile-dashboard">
            {/* Left Column */}
            <div className="main-column">
              {/* --- Resident Info --- */}
              <div className="profile-card">
                <div className="card-header blue">
                  <h2>Primary Resident</h2>
                </div>
                {mockUnit.residents.map((r, i) => (
                  <div key={i} className="info-row">
                    <label>Name</label>
                    <span className="value">{r.name}</span>
                    <label>Email</label>
                    <span className="value">{r.email}</span>
                    <label>Phone</label>
                    <span className="value">{r.phone}</span>
                  </div>
                ))}
              </div>

              {/* --- Vehicles --- */}
              <div className="profile-card">
                <div className="card-header yellow">
                  <h2>Registered Vehicles</h2>
                </div>
                <div className="item-list">
                  {mockUnit.vehicles.map((v, i) => (
                    <div key={i} className="item-card">
                      <div className="item-icon">🚗</div>
                      <div className="item-details">
                        <div className="name">{v.make}</div>
                        <div className="description">
                          {v.color} • {v.plate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Pets --- */}
              <div className="profile-card">
                <div className="card-header green">
                  <h2>Registered Pets</h2>
                </div>
                <div className="item-list">
                  {mockUnit.pets.map((p, i) => (
                    <div key={i} className="item-card">
                      <div className="item-icon">🐾</div>
                      <div className="item-details">
                        <div className="name">{p.name}</div>
                        <div className="description">
                          {p.type} • {p.notes}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Parking & Locker Locations --- */}
              <div className="profile-card">
                <div className="card-header purple">
                  <h2>Unit Locations</h2>
                </div>
                <div className="info-row">
                  <label>Floor</label>
                  <span className="value">{mockUnit.floor}</span>
                </div>
                <div className="info-row">
                  <label>Parking Spots</label>
                  <div className="item-list compact">
                    {mockUnit.parking_spots.map((p, i) => (
                      <div key={i} className="item-card small">
                        <div className="item-icon">
                          {p.type === "Bike" ? "🚲" : "🚘"}
                        </div>
                        <div className="item-details">
                          <div className="name">
                            {p.type} — {p.spot}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="info-row">
                  <label>Lockers</label>
                  <div className="item-list compact">
                    {mockUnit.lockers.map((l, i) => (
                      <div key={i} className="item-card small">
                        <div className="item-icon">🔒</div>
                        <div className="item-details">
                          <div className="name">{l.id}</div>
                          <div className="description">{l.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="sidebar-column">
              <div className="profile-card">
                <div className="card-header neutral">
                  <h2>Unit {mockUnit.unit_number}</h2>
                </div>
                <div className="info-row">
                  <label>Status</label>
                  <span className="value">{mockUnit.status}</span>
                </div>
                <div className="info-row">
                  <label>Notes</label>
                  <span className="value">"{mockUnit.notes}"</span>
                </div>
                <div className="info-row">
                  <label>Emergency Contact</label>
                  <span className="value">416-555-7721</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default UnitLookupPage;
