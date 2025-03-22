import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import PharmacyOrder from "../pharmacy-order/PharmacyOrder.js";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:5000/onlinePharmacy";


const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data); 
  }

function PharmacyOrderDetails() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  // Fetch orders on component mount
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched data:", data); // Log the fetched data
      setOrders(data.orders);
    });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Orders Report",
    onafterprint: () => alert("Order Report successfully downloaded!"),
  });

  // Search handler
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const orders = data.orders || []; // Ensure it's an array
      const filteredOrders = orders.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filteredOrders);
      setNoResults(filteredOrders.length === 0);
    });
  };

  return (
    <div>
      <h1>Order Details Display Page</h1>
      
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Orders Details"
        ></input>
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Orders Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {orders &&
            orders.map((order, i) => {
            console.log("Rendering order:", order); // Log each order being rendered
            return (
               <div key={i}>
                    <PharmacyOrder order={order} />
              </div>
            );
       })}
        </div>
      )}
      <br/><br/>
      <button onClick={handlePrint}>Download Report</button>
      <br/><br/>
    </div>
  );
}

export default PharmacyOrderDetails;
