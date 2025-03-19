import React from "react";
import HeaderHome from "../Common/Header.js";
import FooterHome from "../Common/Footer.js";
import "../Common/Common-styles/Index.css";
import meditechBanner from "../Common/common-images/meditech-banner-img.jpg";

function Index() {
  return (
    <div className="index-container">
      <div className="header-container-home">
        <HeaderHome />

        <div className="meditech-banner-container">
          <img src={meditechBanner} alt="meditech-banner-image" />
        </div>

        <div className="doctor-appointment-button">
            <button><i class='bx bx-calendar-plus'></i>  Appointment</button>
        </div>

        <div className="bg-img-content-1">
            <h1>WE ARE MEDITECH</h1>
            <p>C.R. Meditech Lab (PVT) LTD was founded to provide advanced healthcare 
                at affordable rates. Backed by a team of expert consultants, physicians, 
                and state-of-the-art technology, we offer comprehensive medical services under one roof.</p>
        </div>
      </div>

      <div className="index-content">
        <div className="index-content-col-1"></div>
        
        <div className="index-content-col-2"></div>
      </div>

      <div className="footer-container-home">
        <FooterHome />
      </div>
    </div>
  );
}

export default Index;
