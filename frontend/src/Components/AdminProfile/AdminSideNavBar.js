import React from 'react';
import "../AdminProfile/AdminSideNavBar.css";
import AdminProfDashboardIcon from "../AdminProfile/AdminProfImages/admin-prof-dashboard-icon.png";
import AdminStaffIcon from "../AdminProfile/AdminProfImages/admin-prof-stafficon.png";
import AdminProfpatientsIcon from "../AdminProfile/AdminProfImages/admin-prof-patient-icon.png";
import AdminProfAppointmentIcon from "../AdminProfile/AdminProfImages/admin-prof-appointment-icon.png";
import AdminProfInventoryIcon from "../AdminProfile/AdminProfImages/admin-prof-laboratory-icon.png";
import AdminProfDepartmentsIcon from "../AdminProfile/AdminProfImages/admin-prof-department-icon.png";
import AdminProfPaymentIcon from "../AdminProfile/AdminProfImages/admin-prof-payment-icon.png";
import Navbar from '../Nav/Nav';
import { Link } from 'react-router-dom'; // Import Link for proper navigation

function AdminSideNavBar() {
  return (
    <div>
      <Navbar />
      <div className='side-nav-bar'>
          <h2>Admin_Name</h2>
          <hr/>

          <div className='side-bar-list'>
            <ul className='side-bar-list-ul'>
              <li><Link to="/admindashboard/dashbord"><img src={AdminProfDashboardIcon} alt="Dashboard"/>     Dashboard</Link></li>
              <li><Link to="/staff"><img src={AdminStaffIcon} alt="Staff"/>     Staff</Link></li>
              <li><Link to="/patients"><img src={AdminProfpatientsIcon} alt="Patients"/>     Patients</Link></li>
              <li><Link to="/admindashboard/appointment"><img src={AdminProfAppointmentIcon} alt="Appointments"/>     Appointments</Link></li>
              <li><Link to="/inventory"><img src={AdminProfInventoryIcon} alt="Inventory"/>     Inventory</Link></li>
              <li><Link to="/departments"><img src={AdminProfDepartmentsIcon} alt="Departments"/>     Departments</Link></li>
              <li><Link to="/admindashboard/paymentdetails"><img src={AdminProfPaymentIcon} alt="Payments"/>     Payments</Link></li>

            </ul>
          </div>
      </div>
    </div>
  );
}

export default AdminSideNavBar;