// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = ({ user, onLogout }) => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/auth/profile/${token}`);
        setFormData(response.data.user);
      } catch (err) {
        console.error('Failed to fetch profile data', err);
      }
    };

    fetchProfile();
  }, [user.token]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/auth/profile/${token}`, formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile data', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...formData.user,
        [name]: value
      },
    }));
  };

  console.log('User data:', user);  // Log the initial user data

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <button onClick={onLogout} className="profile-button logout-button">Logout</button>
      <img src={formData.picture} className="logo"></img>
      <div className="profile-details">
        <div className="profile-field">
          <label>Age:</label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.age}</span>
          )}
        </div>
        <div className="profile-field">
          <label>First Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="first"
              value={formData.name.first}
              onChange={handleChangeName}
            />
          ) : (
            <span>{formData.name.first}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="last"
              value={formData.name.last}
              onChange={handleChangeName}
            />
          ) : (
            <span>{formData.name.last}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.phone}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.address}</span>
          )}
        </div>
      </div>
      {isEditing ? (
        <button onClick={handleSave} className="profile-button save-button">Save</button>
      ) : (
        <button onClick={handleEdit} className="profile-button edit-button">Edit</button>
      )}
    </div>
  );
};

export default Profile;
