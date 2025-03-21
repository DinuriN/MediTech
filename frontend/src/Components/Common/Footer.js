import React from "react";
import "../Common/Common-styles/Footer.css";
import meditechLogo from "../Common/common-images/meditech-logo-1.png";

function Footer() {
  return (
    <div className="footer-main-container">
      <div className="footer-col-1">
        <div className="meditech-logo-container">
          <img src={meditechLogo} alt="Meditech-Logo" />
        </div>
        <div className="col-1-text">
            <p>Contact our trusted healthcare and lab service in Gampaha 
                for emergency inquiries. Our team is ready to support your health 
                and well-being.</p>
        </div>
      </div>

      <div className="footer-col-2">
        <h3 className="col-2-import-links">
            Important Links
        </h3>
        <ul className="col-2-important-links-ul">
            <li className="col-2-important-links-li"><a href="#">Medical Services</a></li>
            <li className="col-2-important-links-li"><a href="#">gov.health</a></li>
            <li className="col-2-important-links-li"><a href="#">Health Packages</a></li>
        </ul>
      </div>

      <div className="footer-col-3">
        <h3 className="col-3-quick-contacts">Quick Contacts</h3>
        <p className="col-3-para1">If you have any questions or need help, <br/>Feel free to contact us for medical assistance.</p>
        <hr/>
        <h1 className="col-3-hotline">HOTLINE: 1313</h1>
        <p className="col-3-para2">24 X 7 available service</p>
      </div>

      <div className="footer-col-3">
        <h2 className="col-4">FOLLOW US ON</h2>
        <div className="col-4-social-link-grp">
            <div className="col-4-social-link-icon">
            <a href="https://www.facebook.com/">
            <i class='bx bxl-facebook-circle'></i>
            </a>
            </div>
            <div className="col-4-social-link-icon">
            <a href="https://www.instagram.com/">
            <i class='bx bxl-instagram-alt' ></i>
            </a>
            </div>
            <div className="col-4-social-link-icon">
            <a href="https://x.com">
            <i class='bx bxl-twitter' ></i>
            </a>
            </div>
            <div className="col-4-social-link-icon">
            <a href="https://www.tiktok.com/">
            <i class='bx bxl-tiktok' ></i>
            </a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
