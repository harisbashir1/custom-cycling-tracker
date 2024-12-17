// This is the content of the profile page
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from './utils'; // Helper function to get the username

const Profile = () => {
  const navigate = useNavigate();
  const username = getUsernameFromToken(); // Extract the username from the JWT token

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#007bff', marginBottom: '20px' }}>Welcome to Your profile page, {username}!</h2>
      
      {/* Navigation Menu */}
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
        <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <li><Link to="/" style={menuLinkStyle}>Home</Link></li>
          <li><Link to="/dashboard" style={menuLinkStyle}>Dashboard</Link></li>
          <li><Link to="/login" style={menuLinkStyle}>Login</Link></li>
          <li><Link to="/register" style={menuLinkStyle}>Register</Link></li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                ...menuLinkStyle,  // Apply the same menu style to the logout button
                background: '#f5f5f5',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      

    </div>
  );
};

// Define the common styles for the menu links and buttons
const menuLinkStyle = {
  textDecoration: 'none',
  fontSize: '1.2rem',
  color: '#007bff',
  padding: '10px 20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  display: 'inline-block',
  transition: 'background-color 0.3s',
};

// Add a hover effect for the links and buttons
menuLinkStyle[':hover'] = {
  backgroundColor: '#e0e0e0',
};

export default Profile;
