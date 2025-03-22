import React from "react";

import "./Payment.css"; 

// Payment component that receives payment details as a prop
function Payment({ payment }) {
  // If no payment details 
  if (!payment) {
    return <p>No payment details available</p>;
  }

  // Destructuring payment details from the payment object
  const { _id, cardNo, holderName, paymentMethod, expires } = payment;

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
            <td>Expires</td>
            <td>{expires}</td> 
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Payment; 
