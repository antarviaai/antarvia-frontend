// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

// SVG Icons for password visibility
const EyeIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>;
const EyeSlashIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.127 2.452.36M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path></svg>;

function RegisterForm({ onSwitch }) {
  // State for UI flow (welcome, form, success)
  const [step, setStep] = useState('welcome');
  const [message, setMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [building, setBuilding] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Runs when user first clicks "Create Account"
  const handleInitialSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    // 2. If they match, show the confirmation modal
    setShowConfirmModal(true);
  };

  // Runs after user clicks "Confirm & Send" in the modal
  const handleFinalSubmit = async () => {
    setShowConfirmModal(false);
    try {
      await axios.post('http://localhost:5001/api/users/register', {
        firstName, lastName, email, password, building, unitNumber
      });
      // 3. Go to the final success screen
      setStep('success');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Registration failed.');
    }
  };

  // --- STEP 1: WELCOME NOTE ---
  if (step === 'welcome') {
    return (
      <div className="signup-container">
        <h1>Before You Register</h1>
        <div className="welcome-note">
          <h3>Please Note:</h3>
          <p>All new registrations require approval from property management. This may take up to 24 hours.</p>
          <p>The first person to register for a specific unit will be designated as the 'Unit Admin' and can add other residents later.</p>
        </div>
        <button onClick={() => setStep('form')} className="submit-btn">Continue</button>
        <div className="bottom-link"><p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign In</a></p></div>
      </div>
    );
  }

  // --- STEP 3: SUCCESS SCREEN ---
  if (step === 'success') {
    return (
        <div className="signup-container">
            <div className="success-screen">
                <h1>Thank You!</h1>
                <p>Your registration has been submitted. You will receive an email confirmation once your account has been approved by management.</p>
                <a href="https://www.antarviahub.com" target="_blank" rel="noopener noreferrer" className="submit-btn" style={{textDecoration: 'none', display: 'inline-block', width: 'auto'}}>
                    Back to Homepage
                </a>
            </div>
        </div>
    );
  }
  
  // --- STEP 2: THE REGISTRATION FORM ---
  return (
    <>
      <div className="signup-container">
        <h1>Create Your Account</h1>
        <p>Welcome to the Antarvia Hub.</p>
        <form onSubmit={handleInitialSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Select Your Building</label>
              <select className="select" value={building} onChange={e => setBuilding(e.target.value)} required>
                <option value="" disabled>-- Please select --</option>
                <option value="Building A - 123 Main St">Building A - 123 Main St</option>
                <option value="Building B - 456 Oak Ave">Building B - 456 Oak Ave</option>
              </select>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="input" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="input" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
            <div className="form-group full-width">
              <label>Unit Number</label>
              <input type="text" className="input" value={unitNumber} onChange={e => setUnitNumber(e.target.value)} required />
            </div>
            <div className="form-group full-width">
              <label>Email Address</label>
              <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input type={passwordVisible ? "text" : "password"} className="input" value={password} onChange={e => setPassword(e.target.value)} required />
                <span className="password-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input type={confirmPasswordVisible ? "text" : "password"} className="input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <span className="password-icon" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </span>
              </div>
            </div>
          </div>
          {message && <p style={{ color: 'red', fontSize: '0.9rem', margin: '15px 0' }}>{message}</p>}
          <button type="submit" className="submit-btn">Create Account</button>
        </form>
        <div className="bottom-link"><p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign In</a></p></div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {showConfirmModal && (
        <div className="modal-overlay open">
          <div className="modal-content">
            <div className="modal-header"><h2>Confirm Registration</h2></div>
            <div className="modal-body"><p>You are about to submit your registration for approval. Are you sure?</p></div>
            <div className="modal-footer" style={{gap: '15px', justifyContent: 'flex-end'}}>
                <button type="button" onClick={() => setShowConfirmModal(false)} className="submit-btn" style={{backgroundColor: '#555', flex: 1}}>Cancel</button>
                <button type="button" onClick={handleFinalSubmit} className="submit-btn" style={{flex: 1}}>Confirm & Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterForm;