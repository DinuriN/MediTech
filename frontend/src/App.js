import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import PatientDetails from './Components/Patients/PatientDetails';
import AddPatient from "./Components/Patients/AddPatient";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/patientDetails" element={<PatientDetails/>} />
          <Route path="/addPatient" element={<AddPatient/>} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
