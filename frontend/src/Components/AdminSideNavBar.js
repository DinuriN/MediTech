import React, { useEffect, useState } from 'react';
import "./AdminSideNavBar.css";
import AdminProfDashboardIcon from "./AdminProfImages/admin-prof-dashboard-icon.png"
import AdminStaffIcon from "./AdminProfImages/admin-prof-stafficon.png"
import AdminProfpatientsIcon from "./AdminProfImages/admin-prof-patient-icon.png"
import AdminProfAppointmentIcon from "./AdminProfImages/admin-prof-appointment-icon.png"
import AdminProfInventoryIcon from "./AdminProfImages/admin-prof-laboratory-icon.png"
import AdminProfDepartmentsIcon from "./AdminProfImages/admin-prof-department-icon.png"
import LogOutForUsers from "./LoginForUsers/LogoutFUsers";



function AdminSideNavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token")); 
  }, []);
  return (
    <div>
        <div className='side-nav-bar'>
            <h2>Admin_Name</h2>
            <hr/>

            <div className='side-bar-list'>
              <ul className='side-bar-list-ul'>
                <li><a href='#'><img src={AdminProfDashboardIcon}/>     Dashboard</a></li>
                <li><a href='#'><img src={AdminStaffIcon}/>     Staff</a></li>
                <li><a href='/patientDetails'><img src={AdminProfpatientsIcon}/>     Patients</a></li>
                <li><a href='#'><img src={AdminProfAppointmentIcon}/>     Appointments</a></li>
                <li><a href='#'><img src={AdminProfInventoryIcon}/>     Inventory</a></li>
                <li><a href='#'><img src={AdminProfDepartmentsIcon}/>     Departments</a></li>
                
              </ul>
              {/* Logout Button - Only visible if logged in */}
             
              <div className='logout-button-contanier'>
                
        {isAuthenticated && (
          <div className="nav-li logout-li">
            
            <LogOutForUsers />
            </div>
          
        )}
        </div>
            </div>
            
        </div>
      
    </div>
  );
}

export default AdminSideNavBar;