import React from 'react'
import NavBar from '../../Common/NavBar';
import {Link} from "react-router-dom";

function PharmacyHome() {
  return (
    <div>
      <NavBar/>
      <div>
        <ul className="addorder-ul">
            <li className="addorder-l1">
                <Link to="/pharmacyhome" className="active home-a">
                <h1>Home</h1>
                </Link>
            </li>
            <li className="addorder-l1">
                <Link to="/addPharmacyOrder" className="active home-a">
                <h1>Add Order</h1>
                </Link>
            </li>
            <li className="addorder-l1">
                <Link to="/order-details" className="active home-a">
                <h1>Order details</h1>
                </Link>
            </li>
        </ul>
      </div>

    </div>
  )
}

export default PharmacyHome;
