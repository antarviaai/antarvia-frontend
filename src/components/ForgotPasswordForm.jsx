// src/components/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

// We receive 'onSwitch' to be able to go back to the login form
function ForgotPasswordForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/users/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Reset Password</h1>
      <p>Enter your email address below and we'll send you a link to reset your password.</p>
      
      {/* If a message exists, show it. Otherwise, show the form. */}
      {message ? (
        <div>
          <p style={{ color: 'lightgreen' }}>{message}</p>
          <div className="bottom-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Back to Sign In</a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              className="input-field" 
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPasswordForm;