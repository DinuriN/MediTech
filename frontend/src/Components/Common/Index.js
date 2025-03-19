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
      </div>

      <div className="index-content">
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
      </div>

      <div className="footer-container-home">
        <FooterHome />
      </div>
    </div>
  );
}

export default Index;
