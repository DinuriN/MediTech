import React, { useState, useEffect } from "react";
import "./Payments.css"; // Assume a CSS file for styling
import axios from "axios";

import AdminSideNavBar from '../Common/AdminProfile/AdminSideNavBar';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchPaymentMethod, setSearchPaymentMethod] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payments");
        const paymentsData = Array.isArray(response.data.payments) ? response.data.payments : [];
        setPayments(paymentsData);
        setFilteredPayments(paymentsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to load payments. Please try again.");
        setPayments([]);
        setFilteredPayments([]);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleSearch = () => {
    let filtered = [...payments];

    if (searchDate) {
      filtered = filtered.filter(payment => 
        payment.appointment?.appointmentDate?.split('T')[0] === searchDate
      );
    }

    if (searchPaymentMethod) {
      filtered = filtered.filter(payment => 
        payment.paymentMethod === searchPaymentMethod
      );
    }

    setFilteredPayments(filtered);
  };

  const handleReset = () => {
    setSearchDate('');
    setSearchPaymentMethod('');
    setFilteredPayments(payments);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Payment Management</h1>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Payment Management</h1>
          </div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
        <div className='col-1'>
            <AdminSideNavBar />

        </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Payment Management</h1>
          <div className="search-section">
            <div className="search-inputs">
              <div className="search-group">
                <label>Search by Date:</label>
                <input 
                  type="date" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="search-group">
                <label>Filter by Payment Method:</label>
                <select 
                  value={searchPaymentMethod}
                  onChange={(e) => setSearchPaymentMethod(e.target.value)}
                >
                  <option value="">All Payment Methods</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
            </div>
            <div className="search-buttons">
              <button onClick={handleSearch} className="search-button">Search</button>
              <button onClick={handleReset} className="reset-button">Reset Filters</button>
            </div>
          </div>
        </div>

        <div className="payments-section">
          <div className="payments-header">
            <h2>Payment Details</h2>
            <span className="payment-count">
              {filteredPayments.length} {filteredPayments.length === 1 ? 'Payment' : 'Payments'}
            </span>
          </div>
          {filteredPayments.length === 0 ? (
            <p className="no-payments">No payments found.</p>
          ) : (
            <div className="payments-table-container">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Name</th>
                    <th>Card Number</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Appointment Date</th>
                    <th>Doctor/Scan Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment._id}</td>
                      <td>{payment.appointment?.name || "N/A"}</td>
                      <td>**** **** **** {payment.cardNo.slice(-4)}</td>
                      <td>{payment.paymentMethod}</td>
                      <td>Rs. {payment.amount}</td>
                      <td>
                        {payment.appointment?.appointmentDate
                          ? new Date(payment.appointment.appointmentDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{payment.appointment?.doctorOrScanType || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payments;