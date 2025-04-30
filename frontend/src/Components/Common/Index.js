import React from "react";
import HeaderHome from "../Common/Header.js";
import FooterHome from "../Common/Footer.js";
import "../Common/Common-styles/Index.css";
import meditechBanner from "../Common/common-images/meditech-banner-img.jpg";
import indexDoctorImg from "../Common/common-images/index-doctor-img.png";
import doctorIconIndex from "../Common/common-images/doctors-icon-index.png"
import labReportIconIndex from "../Common/common-images/lab-report-icon.index.png"
import paymentPortalIconIndex from "../Common/common-images/payment-portal-icon-index.png"
import patientFeedbacklIconIndex from "../Common/common-images/patient-feedback-icon-index.png"
import { Link } from "react-router-dom";



function Index() {
  return (
    <div className="index-container">
      <div className="header-container-home">
        <HeaderHome />

        <div className="meditech-banner-container">
          <img src={meditechBanner} alt="meditech-banner-image" />
        </div>

<Link to={"/addAppointment"}>
        <div className="doctor-appointment-button">
            <button><i class='bx bx-calendar-plus'></i>  Appointment</button>
        </div>
        </Link>

        <div className="bg-img-content-1">
            <h1>WE ARE MEDITECH</h1>
            <p>C.R. Meditech Lab (PVT) LTD was founded to provide advanced healthcare 
                at affordable rates. Backed by a team of expert consultants, physicians, 
                and state-of-the-art technology, we offer comprehensive medical services under one roof.</p>
        </div>
      </div>

      <div className="index-content">
        <div className="index-content-col-1">
            <img className="index-content-col-1-img-1" src={indexDoctorImg} alt="img1"/>
        </div>
        
        <div className="index-content-col-2">
            <div className="index-col-2-box">
                <div className="index-col-2-box-icon">
                <img src={doctorIconIndex} alt="doctor-icon"/>
                </div>
                <div className="index-col-2-box-text">
                <h2>Consultation</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing e</p>
                </div>
            </div>
            <div className="index-col-2-box">
            <div className="index-col-2-box-icon">
                <img src={labReportIconIndex} alt="doctor-icon"/>
                </div>
                <div className="index-col-2-box-text">
                <h2>Download Lab Reports</h2>
                <p>Vestibulum sapien purus, mattis et consect</p>
                </div>
            </div>
            <div className="index-col-2-box">
            <div className="index-col-2-box-icon">
                <img src={paymentPortalIconIndex} alt="doctor-icon"/>
                </div>
                <div className="index-col-2-box-text">
                <h2>Payment Portal</h2>
                <p>Proin volutpat magna nibh, non fringi</p>
                </div>
            </div>
            <div className="index-col-2-box">
            <div className="index-col-2-box-icon">
                <img src={patientFeedbacklIconIndex} alt="doctor-icon"/>
                </div>
                <div className="index-col-2-box-text">
                <h2>Patient Feedback</h2>
                <p>Maecenas sollicitudin imperdiet elit a malesuada</p>
                </div>
            </div>
        </div>
      </div>

      <div className="footer-container-home">
        <FooterHome />
      </div>
    </div>
  );
}

export default Index;
