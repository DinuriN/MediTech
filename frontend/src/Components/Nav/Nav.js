import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/mainhome" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/addappointment" className="navbar-link">Add Appoinment</Link>
          </li>

          <li className="navbar-item">
            <Link to="/admindashboard/" className="navbar-link patients-link">
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;