import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./Payments.css"; // Assume a CSS file for styling
import axios from "axios";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payments");
        // Extract the payments array from response.data
        setPayments(Array.isArray(response.data.payments) ? response.data.payments : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to load payments. Please try again.");
        setPayments([]);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="payments-container">
          <h1>Payments</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="payments-container">
          <h1>Payments</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="payments-container">
        <h1>Payments</h1>
        {payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Card Number</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Appointment Date</th>
                <th>Appointment Type</th>
                <th>Doctor/Scan Type</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.appointment?.name || "N/A"}</td>
                  <td>**** **** **** {payment.cardNo.slice(-4)}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>Rs. {payment.amount}</td>
                  <td>
                    {payment.appointment?.appointmentDate
                      ? new Date(payment.appointment.appointmentDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{payment.appointment?.appointmentType || "N/A"}</td>
                  <td>{payment.appointment?.doctorOrScanType || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Payments;