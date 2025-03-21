import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import PatientDetails from './Components/Patients/PatientDetails';
import AddPatient from "./Components/Patients/AddPatient";
import UpdatePatient from './Components/Patients/UpdatePatient';
import AddStaff from './Components/StaffMeditech/AddMeditechStaff';
import LoginForUsers from './Components/Common/LoginForUsers/LoginForUsers';
import ProtectedRoute from './Components/Common/LoginForUsers/ProtectedRoute';

import MedicalHistoryDetails from './Components/MedicalHistory/medicalHistoryDetails';
import AddMedicalHistory from './Components/MedicalHistory/AddMedicalHistory';
import UpdateMedicalHistory from './Components/MedicalHistory/UpdateMedicalHistory';
import AdminSideNavBar from './Components/Common/AdminProfile/AdminSideNavBar';
import AdminProfiileSample from './Components/Common/AdminProfile/AdminProfileSample';

function App() {
  const isAuthenticated= !!localStorage.getItem("token");

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          {/* <Route path="/patientDetails" element={<PatientDetails/>} /> */}
          <Route path="/addPatient" element={<AddPatient/>} />
          <Route path="/updatePatient/:id" element={<UpdatePatient/>} />
          <Route path="/addStaff" element={<AddStaff/>} />
          <Route path='/loginForUsers' element={<LoginForUsers/>} />
          <Route element={<ProtectedRoute allowedUserType="staff" />}>
          <Route path="/patientDetails" element={<PatientDetails />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedUserType="staff" />}>
          <Route path="/addPatient" element={<AddPatient />} />
        </Route> */}

          <Route path="/medicalHistoryDetails/:patientId" element={<MedicalHistoryDetails/>} />
          <Route path="/addMedicalHistory/:patientId" element={<AddMedicalHistory/>} />
          <Route path="/updateMedicalHistory/:patientId" element={<UpdateMedicalHistory/>} />
          <Route path="/adminSideNavBar" element={<AdminSideNavBar/>} />
          <Route path="/adminProfileSample" element={<AdminProfiileSample/>} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
