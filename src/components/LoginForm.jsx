// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
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
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Network Error: Could not connect to the server. Is it running?');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Antarvia Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {message && <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>}
    </form>
  );
}
export default LoginForm;