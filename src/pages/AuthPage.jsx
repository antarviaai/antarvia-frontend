// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css';

// 1. Import both background images
import loginBg from '../assets/PLAN.png';
import registerBg from '../assets/register-background.png'; // <-- CHANGE THIS FILENAME if yours is different

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // 2. Use a conditional to choose the background based on the 'showLogin' state
    const backgroundToUse = showLogin ? loginBg : registerBg;
    
    document.body.style.backgroundImage = `url(${backgroundToUse})`;
    document.body.classList.add('auth-page-wrapper');
    
    return () => {
      document.body.style.backgroundImage = null;
      document.body.classList.remove('auth-page-wrapper');
    };
  }, [showLogin]); // 3. IMPORTANT: This tells React to re-run the effect when 'showLogin' changes

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