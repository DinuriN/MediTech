import React from 'react';
import "../AdminProfile/AdminSideNavBar.css";
import AdminProfDashboardIcon from "../AdminProfile/AdminProfImages/admin-prof-dashboard-icon.png"
import AdminStaffIcon from "../AdminProfile/AdminProfImages/admin-prof-stafficon.png"
import AdminProfpatientsIcon from "../AdminProfile/AdminProfImages/admin-prof-patient-icon.png"
import AdminProfAppointmentIcon from "../AdminProfile/AdminProfImages/admin-prof-appointment-icon.png"
import AdminProfInventoryIcon from "../AdminProfile/AdminProfImages/admin-prof-laboratory-icon.png"
import AdminProfDepartmentsIcon from "../AdminProfile/AdminProfImages/admin-prof-department-icon.png"


function AdminSideNavBar() {
  return (
    <div>
        <div className='side-nav-bar'>
            <h2>Admin_Name</h2>
            <hr/>

            <div className='side-bar-list'>
              <ul className='side-bar-list-ul'>
                <li><a href='#'><img src={AdminProfDashboardIcon}/>     Dashboard</a></li>
                <li><a href='#'><img src={AdminStaffIcon}/>     Staff</a></li>
                <li><a href='#'><img src={AdminProfpatientsIcon}/>     Patients</a></li>
                <li><a href='#'><img src={AdminProfAppointmentIcon}/>     Appointments</a></li>
                <li><a href='#'><img src={AdminProfInventoryIcon}/>     Inventory</a></li>
                <li><a href='#'><img src={AdminProfDepartmentsIcon}/>     Departments</a></li>
              </ul>
            </div>
            
        </div>
      
    </div>
  );
}

export default AdminSideNavBar;
