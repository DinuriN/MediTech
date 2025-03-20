import React from 'react';
import './App.css';
import Home from "./Components/Home/home";
import { Route, Routes } from 'react-router-dom';
import Appoinments from "./Components/Appoinment Detail/Appoinments";
import Payments from "./Components/Payment Detail/Payments";
import AddAppoinment from "./Components/Add Appoinment/AddAppoinment";
import UpdateAppoinment from './Components/Update Appoinment/UpdateAppoinment';
import AddPayment from './Components/Add Payment/AddPayment';


function App() {
  return (
    <div>
      
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/addappointment" element={<AddAppoinment />} />
          <Route path="/addPayments" element={<AddPayment />} />
          <Route path="/appointments" element={<Appoinments />} />
          <Route path="/paymentdetails" element={<Payments />} />
          <Route path="/appointments/:id" element={<UpdateAppoinment />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;