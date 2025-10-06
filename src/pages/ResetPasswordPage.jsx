// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css'; // Reusing our auth styles
import usePageBackground from '../hooks/usePageBackground'; // 1. Import our new hook
import resetBg from '../assets/forgetpassword.png'; // 2. Import your new background image

function ResetPasswordPage() {
  // 3. Use the hook to set the background for this page
  usePageBackground(resetBg);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setMessage('Passwords do not match.');
    }
    
    // We will connect this to the backend in the next step
    console.log('Token:', token);
    console.log('New Password:', password);
    
    setMessage('Password reset successfully! Redirecting to login...');
    setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <h1>Set New Password</h1>
        <p>Please enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red', fontSize: '0.9rem', marginBottom: '15px' }}>{message}</p>}
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;