import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./AdminSideNavBar";
import Dashboard from "./AdminProfileSample";
import Appoinment from "../Appoinment Detail/Appoinments"; 
import Payments from "../Payment Detail/Payments";
import "./AdminProfileSample.css";

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="workers" element={<Workers />} /> */}
          <Route path="appointment" element={<Appoinment />} /> 
          <Route path="paymentdetails" element={<Payments />} />
          {/* <Route path="services" element={<Services />} /> */}
          {/* <Route path="payments" element={<Payments />} /> */}
          {/* <Route path="feedback" element={<Feedback />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
