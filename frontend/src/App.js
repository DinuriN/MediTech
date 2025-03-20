import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import PatientDetails from './Components/Patients/PatientDetails';
import AddPatient from "./Components/Patients/AddPatient";
import UpdatePatient from './Components/Patients/UpdatePatient';
import AddStaff from './Components/StaffMeditech/AddMeditechStaff';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/patientDetails" element={<PatientDetails/>} />
          <Route path="/addPatient" element={<AddPatient/>} />
          <Route path="/updatePatient/:id" element={<UpdatePatient/>} />
          <Route path="/addStaff" element={<AddStaff/>} />

        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
