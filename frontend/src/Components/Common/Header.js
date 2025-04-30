import React, { useState,useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import meditechLogo from "../Common/common-images/meditech-logo-1.png";
import "../Common/Common-styles/Header.css";
import { Link } from "react-router-dom";
import LoginForUsers from "./LoginForUsers/LoginForUsers";


function Header() {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <div className="header-main-container">
      <div className="header-container">
        {/* Right */}
        <div className="col-1-left">
          <div className="meditech-logo-container">
            <img src={meditechLogo} alt="Meditech-Logo" />
          </div>
        </div>

        {/* Left */}
        <div className="col-2-right">
          {/* Row 1 */}
          <div className="col-2-row-1">
            <div className="col-2-row-1-col-1">
              <div className="search-bar-container">
                <input type="search" placeholder="Search here..." />
              </div>
            </div>
            <div className="col-2-row-1-col-1">
              <div className="authentication-button-container">
                <div className="authentication-btn">
                  <button onClick={() => setShowLogin(true)}>Login</button>
                </div>


                <div className="authentication-btn">
                  <button>Sign Up</button>
                </div>
              </div>
            </div>
          </div> {/* Row 1 end */}

          {/* Row 2 */}
          <div className="col-2-row-2">
            <div className="col-2-row-2-menu-container">
              <ul className="col-2-row-2-menu-ul">
                <li className="col-2-row-2-menu-li"><a href="/">Home</a></li>
                <li className="col-2-row-2-menu-li dropdown">
                  <a href="#">Services <i className='bx bx-chevron-down'></i></a>
                  <ul className="dropdown-menu-home-page">
                    <li><Link to="/doctorsTimetable">Available Doctors' Timetable</Link></li>
                    <li><Link to="/doctorSuggestForm">Doctor Recommendation Using AI</Link></li>
                  </ul>
                </li>
                <li className="col-2-row-2-menu-li"><a href="#">About Us</a></li>
              </ul>
            </div>
          </div> {/* Row 2 end */}
        </div>
      </div>

      {/* Render Login Modal */}
      {showLogin && <LoginForUsers closeModal={() => setShowLogin(false)} />}
    </div>
  );
}

export default Header;
