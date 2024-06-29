// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth', { email, password });
      const { token, user } = response.data;
      onLogin({ token, user });
      localStorage.setItem('token', token);
      console.log(token);
      setError('');  // Limpiar error en caso de éxito
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1>SMART PUMP</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
