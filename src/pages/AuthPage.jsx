// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css'; // Import our new stylesheet

// Define our background images
const loginBg = 'url("https://i.imgur.com/K3Tn0Nv.jpeg")';
const registerBg = 'url("https://i.imgur.com/ltfoVwg.jpeg")';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  // This effect will change the body's background image
  useEffect(() => {
    document.body.style.backgroundImage = showLogin ? loginBg : registerBg;
    // Cleanup function to remove the background when we navigate away
    return () => {
      document.body.style.backgroundImage = null;
    };
  }, [showLogin]); // Re-run this effect whenever 'showLogin' changes

  return (
    <div className="auth-page">
      {showLogin ? (
        <LoginForm onSwitch={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default AuthPage;