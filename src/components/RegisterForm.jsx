// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        email, password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {message && <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>}
    </form>
  );
}
export default RegisterForm;