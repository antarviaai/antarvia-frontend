// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  
  // Center the auth container on the page
  const authContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={authContainerStyle}>
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setShowLogin(!showLogin)} style={{ background: 'none', border: 'none', color: '#61dafb', cursor: 'pointer' }}>
          {showLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
export default AuthPage;