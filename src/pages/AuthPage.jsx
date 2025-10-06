// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import './AuthPage.css';

// Import all your background images
import loginBg from '../assets/PLAN.png';
import registerBg from '../assets/register-background.png';
import forgotPassBg from '../assets/forgetpassword.png';

function AuthPage() {
  const [view, setView] = useState('login'); 

  useEffect(() => {
    let backgroundToUse;
    switch(view) {
      case 'register':
        backgroundToUse = registerBg;
        break;
      case 'forgotPassword':
        backgroundToUse = forgotPassBg;
        break;
      case 'login':
      default:
        backgroundToUse = loginBg;
        break;
    }
    
    document.body.style.backgroundImage = `url(${backgroundToUse})`;
    document.body.classList.add('auth-page-wrapper');
    
    return () => {
      document.body.style.backgroundImage = null;
      document.body.classList.remove('auth-page-wrapper');
    };
  }, [view]); // Re-run effect when the view changes

  const renderView = () => {
    switch (view) {
      case 'register':
        return <RegisterForm onSwitch={() => setView('login')} />;
      case 'forgotPassword':
        return <ForgotPasswordForm onSwitch={() => setView('login')} />;
      case 'login':
      default:
        return <LoginForm onSwitchToRegister={() => setView('register')} onSwitchToForgot={() => setView('forgotPassword')} />;
    }
  };

  return (
    <div className="auth-page">
      {renderView()}
    </div>
  );
}

export default AuthPage;