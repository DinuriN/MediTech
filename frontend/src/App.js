import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import PatientDetails from './Components/Patients/PatientDetails';
import AddPatient from "./Components/Patients/AddPatient";
import UpdatePatient from './Components/Patients/UpdatePatient';
import MedicalHistoryDetails from './Components/MedicalHistory/medicalHistoryDetails';
import AddMedicalHistory from './Components/MedicalHistory/AddMedicalHistory';
import UpdateMedicalHistory from './Components/MedicalHistory/UpdateMedicalHistory';
import AdminSideNavBar from './Components/Common/AdminProfile/AdminSideNavBar';
import AdminProfiileSample from './Components/Common/AdminProfile/AdminProfileSample';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/patientDetails" element={<PatientDetails/>} />
          <Route path="/addPatient" element={<AddPatient/>} />
          <Route path="/updatePatient/:id" element={<UpdatePatient/>} />
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
