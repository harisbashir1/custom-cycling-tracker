import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">Cycling Progress Tracker</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
            {token && <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <h4>test</h4>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy;Cycling progress tracker - 
          <a 
            href="https://github.com/harisbashir1/custom-cycling-tracker" 
            target="blank" 
            className="footer-link"
          >
            github.com/harisbashir1/custom-cycling-tracker
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
