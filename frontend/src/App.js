// src/App.js
import React, { useState } from 'react';
import Login from './components/login';
import Profile from './components/profile';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    //remove token from local storage
    localStorage.setItem('token', '');
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Profile user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
