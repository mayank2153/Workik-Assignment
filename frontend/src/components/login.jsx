import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginPage=() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Redirecting to GitHub OAuth login
    window.location.href = "http://localhost:4000/users/auth/github";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Workik-Assignment</h1>
        <p className="login-description">Login to access your workspace</p>
        <button 
          className="github-button"
          onClick={handleLogin} 
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <span className="loading-spinner"></span>
              Logging in...
            </span>
          ) : (
            <span>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="github-icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Login with GitHub
            </span>
          )}
        </button>
      </div>
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #f3e7ff, #e6f0ff);
          padding: 1rem;
        }
        .login-card {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .login-description {
          text-align: center;
          color: #666;
          margin-bottom: 1.5rem;
        }
        .github-button {
          width: 100%;
          padding: 0.75rem;
          background-color: white;
          color: #333;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .github-button:hover {
          background-color: #f5f5f5;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .github-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .github-icon {
          margin-right: 0.5rem;
        }
        .loading-spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid #333;
          border-radius: 50%;
          border-top: 2px solid #fff;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;