import React from "react";
import { useNavigate } from "react-router-dom";


import "./Payment.css"; // Ensure you have a specific CSS file for payment details

function Payment({ payment }) {
  const navigate = useNavigate();

  if (!payment) {
    return <p>No payment details available</p>;
  }

  const { _id, cardNo, holderName, paymentMethod, paymentDate } = payment;

  return (
    <div className="payment-container">
     

  

      <table className="payment-table">
        <tbody>
          <tr>
            <td>Payment ID</td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td>Card No</td>
            <td>{cardNo}</td>
          </tr>
          <tr>
            <td>Holder Name</td>
            <td>{holderName}</td>
          </tr>
          <tr>
            <td>Payment Method</td>
            <td>{paymentMethod}</td>
          </tr>
          <tr>
            <td>Payment Date</td>
            <td>{paymentDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
