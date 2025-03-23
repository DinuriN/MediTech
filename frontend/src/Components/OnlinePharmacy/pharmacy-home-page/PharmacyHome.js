import React, { useState, useEffect } from 'react';
import './PharmacyHome.css';
import { Link } from "react-router-dom";
import OrderTable from '../order-details-table/OrderTable';
import axios from 'axios';

const URL = "http://localhost:5000/onlinePharmacy";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function PharmacyHome() {
  const [orders, setOrders] = useState([]);
  //const [filteredOrders, setFilteredOrders] = useState([]); // Stores filtered orders
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched data:", data);
      setOrders(data.orders || []);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    fetchHandler().then((data) => {
        const filteredOrders = data.orders.filter((order) =>
            order.patientName.toLowerCase().includes(e.target.value.toLowerCase()) || 
            order.orderId.toLowerCase().includes(e.target.value.toLowerCase())  
        );
        setOrders(filteredOrders);
        setNoResults(filteredOrders.length === 0);
      });
    };

  return (
    <div>
      <div className="order-home-container">
        <h1>Order Details</h1>
        <input
          onChange={handleSearch}
          type="text"
          name="search"
          value={searchQuery}
          placeholder="Search by order details"
        />
        <div className='but-2-m'>
          <Link to="/addPharmacyOrder">
            <button>Place a new order</button>
          </Link>
        </div>
      </div>
      <hr />
      <OrderTable orders={orders} noResults={noResults}/>
    </div>
  );
}

export default PharmacyHome;
