import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import PharmacyOrderDetails from "./Components/OnlinePharmacy/pharmacy-order-details/PharmacyOrderDetails";
import AddPharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-add/AddPharmacyOrder";
import PharmacyHome from "./Components/OnlinePharmacy/pharmacy-home/PharmacyHome";
import UpdatePharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-update/UpdatPharmacyOrder"
import NavBar from './Components/Common/NavBar';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/pharmacyhome" element={<PharmacyHome/>} />
          <Route path="/order-details" element={<PharmacyOrderDetails/>} />
          <Route path="/addPharmacyOrder" element={<AddPharmacyOrder/>} />
          <Route path="/order-details/:id" element={<UpdatePharmacyOrder/>} />
          
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
