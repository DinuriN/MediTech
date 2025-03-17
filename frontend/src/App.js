import React from 'react';
import './App.css';
import Home from "./Components/Home/home";
import { Route, Routes } from 'react-router-dom';
import Patients from "./Components/Patient Detail/Patients";
import Payments from "./Components/Payment Detail/Payments";
import AddPatient from "./Components/Add Patient/AddPatient";
import UpdatePatient from './Components/Update Patient/UpdatePatient';
import AddPayment from './Components/Add Payment/AddPayment';


function App() {
  return (
    <div>
      
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/addPatients" element={<AddPatient />} />
          <Route path="/addPayments" element={<AddPayment />} />
          <Route path="/userdetails" element={<Patients />} />
          <Route path="/paymentdetails" element={<Payments />} />
          <Route path="/userdetails/:id" element={<UpdatePatient />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;