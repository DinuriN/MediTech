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
            <Link to="/addPatients" className="navbar-link">Add Patient</Link>
          </li>
          <li className="navbar-item">
            <Link to="/addPayments" className="navbar-link">Add Payment</Link>
          </li>
          <li className="navbar-item">
            <Link to="/userdetails" className="navbar-link patients-link">
              Patients
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/paymentdetails" className="navbar-link patients-link">
              Payments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;