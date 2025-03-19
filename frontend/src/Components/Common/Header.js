import React from "react";
import "boxicons/css/boxicons.min.css";
import meditechLogo from "../Common/common-images/meditech-logo-1.png";
import "../Common/Common-styles/Header.css";

function Header() {
  return (
    <div className="header-main-container">
      <div className="header-container">
        {/*right */}
        <div className="col-1-left">
          <div className="meditech-logo-container">
            <img src={meditechLogo} alt="Meditech-Logo" />
          </div>
        </div>

        {/*left */}
        <div className="col-2-right">
          {/*row 1 */}
          <div className="col-2-row-1">
            <div className="col-2-row-1-col-1">
            <div className="search-bar-container">
              <input type="search" placeholder="Search here..."></input>
              
            </div>
            </div>
            <div className="col-2-row-1-col-1">
            <div className="authentication-button-container">
                <div className="authentication-btn">
                    <button>Login</button>
                </div>
                <div className="authentication-btn">
                    <button>Sign Up</button>
                </div>

            </div>
            </div>
          </div>  {/*row1 end */}

          {/*row2 */}
          <div className="col-2-row-2">
            <div className="col-2-row-2-menu-container">
                <ul className="col-2-row-2-menu-ul">
                    <li className="col-2-row-2-menu-li"><a href="#">Home</a></li>
                    <li className="col-2-row-2-menu-li"><a href="#">Services</a></li>
                    <li className="col-2-row-2-menu-li"><a href="#">About Us</a></li>
                </ul>
            </div>
          </div>{/*row2 end */}
        </div>
      </div>
    </div>
  );
}

export default Header;
