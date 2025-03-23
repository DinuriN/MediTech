import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import Orderbrief from "./Components/OnlinePharmacy/pharmacy-order-view-more/OrderViewMore";
import AddPharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-add/AddPharmacyOrder";
import PharmacyHome from "./Components/OnlinePharmacy/pharmacy-home-page/PharmacyHome";
import UpdatePharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-update/UpdatPharmacyOrder"
import NavBar from './Components/Common/NavBar';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/order-details" element={<PharmacyHome/>} />
          <Route path="/addPharmacyOrder" element={<AddPharmacyOrder/>} />
          <Route path="/order-details/:id" element={<UpdatePharmacyOrder/>} />
          <Route path="/order-brief/:id" element={<Orderbrief/>} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
