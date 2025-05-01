import React, { useState, useEffect } from 'react';
import './PharmacyHome.css';
import { Link } from "react-router-dom";
import OrderTable from '../order-details-table/OrderTable';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from 'axios';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'
import logoBase64 from './logo';

const URL = "http://localhost:5000/onlinePharmacy";

// Fetch data from API
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// ✅ Safe date formatter
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate) ? "" : parsedDate.toISOString().split("T")[0];
};

function PharmacyHome() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("patientName");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      const fetched = (data.orders || []).map((order) => ({
        ...order,
        uploadedDate: formatDate(order.uploadedDate),
        dateofbirth: formatDate(order.dateofbirth),
      }));
      setAllOrders(fetched);
      setOrders(fetched);
    });
  }, []);

  const filterOrders = (ordersList, query, criteria) => {
    const lowerCaseQuery = query.toLowerCase();
    return ordersList.filter(order =>
      order[criteria]?.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredOrders = filterOrders(allOrders, query, searchCriteria);
    setOrders(filteredOrders);
    setNoResults(filteredOrders.length === 0);
  };

  const handleCriteriaChange = (e) => {
    const criteria = e.target.value;
    setSearchCriteria(criteria);
    const filteredOrders = filterOrders(allOrders, searchQuery, criteria);
    setOrders(filteredOrders);
    setNoResults(filteredOrders.length === 0);
  };

  const generatePDF = (data, title) => {
    const doc = new jsPDF('landscape');
    const generatedDate = new Date().toLocaleString();
  
    // ✅ Add your Base64 logo here (make sure it's not too large)
  
    // your logo as Base64
    const imgWidth = 30; // adjust width
    const imgHeight = 30; // adjust height
    doc.addImage(logoBase64, 'PNG', 5, 5, imgWidth, imgHeight); // (x, y, width, height)
  
    // 🧢 Fancy title styling
    doc.setFontSize(18);
    doc.setTextColor(40, 78, 120);
    doc.setFont("helvetica", "bold");
    doc.text("MediTech Health Care Center", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
  
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 23, { align: "center" });
  
    const tableColumn = [
      "#", "Order ID", "Patient Name", "Age", "Gender", "Email",
      "Contact", "DOB", "Payment", "Address", "Upload Date", "Comments"
    ];
  
    const tableRows = data.map((order, index) => [
      index + 1,
      order.orderId || "",
      order.patientName || "",
      order.patientAge || "",
      order.gender || "",
      order.patientEmail || "",
      order.patientContact || "",
      order.dateofbirth || "",
      order.paymentMethod || "",
      order.deliveryAddress || "",
      order.uploadedDate || "",
      order.comments || "",
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 22 },
        2: { cellWidth: 28 },
        3: { cellWidth: 10 },
        4: { cellWidth: 12 },
        5: { cellWidth: 35 },
        6: { cellWidth: 25 },
        7: { cellWidth: 22 },
        8: { cellWidth: 22 },
        9: { cellWidth: 30 },
        10: { cellWidth: 22 },
        11: { cellWidth: 38 },
      },
      didDrawPage: function () {
        doc.setFontSize(9);
        doc.text(`Generated on: ${generatedDate}`, 14, doc.internal.pageSize.getHeight() - 10);
      },
    });
  
    doc.save(`${title.replace(/\s/g, "_")}.pdf`);
  };
  

  return (
    <div>
      <div className="order-home-container">
      <div className="sidebar" style={{ display: 'flex', marginTop: "-220px"}}>
      <AdminSideNavBar/>
        </div>
        
        <h1 style={{ margin:"0 300px" }}>Order <br/>Details</h1>
        <div className="orders" style={{  margin:"0 50px"}}>
        <label htmlFor="searchCriteria"> Search By: </label>
        <select
          id="searchCriteria"
          onChange={handleCriteriaChange}
          value={searchCriteria}
          style={{
            width: "250px",
            padding: "6px",
            margin: "0 3px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        >
          <option value="patientName">Patient Name</option>
          <option value="orderId">Order ID</option>
        </select>

        <label htmlFor="searchInput">Search Orders: </label>
        <input
          id="searchInput"
          onChange={handleSearch}
          type="text"
          name="search"
          value={searchQuery}
          placeholder={`Search by ${searchCriteria === 'patientName' ? 'Patient Name' : 'Order ID'}`}
          style={{
            width: "500px",
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        </div>
        <div className='but-2-m'>
          

          <Link to="/extract-text">
            <button>Extract Text from Image</button>
          </Link>

          <Link to="/drug-checker">
            <button>Drug checker</button>
          </Link>

          <button
            className="btn btn-primary mb-3"
            onClick={() => generatePDF(orders, "Online Pharmacy - Filtered Order Details Report")}
          >
            Download Filtered Orders PDF
          </button>

          <button
            className="btn btn-primary mb-3"
            onClick={() => generatePDF(allOrders, "Online Pharmacy - Full Order Details Report")}
          >
            Download Full Orders PDF
          </button>
        </div>
      </div>
      <hr />
      <div className="ordertable" style={{ marginLeft: "300px", overflowX: "auto" }}>
      <OrderTable orders={orders} setOrders={setOrders} noResults={noResults} />
      </div>
    </div>
    
  );
}

export default PharmacyHome;
