// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSwitchToRegister, onSwitchToForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email, password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) { // The missing '{' was here
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Network Error: Could not connect to the server.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>ANT Residential Hub</h1>
      <p>Your tranquil home, seamlessly connected.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="email" 
            className="input-field" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            className="input-field" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {message && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px' }}>{message}</p>}
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
      <div className="bottom-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToForgot(); }}>Forgot Password?</a>
        <span className="separator">|</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Create an account</a>
      </div>
    </div>
  );
}

export default LoginForm;