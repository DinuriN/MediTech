import React from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import "./Payment.css"; 


function Payment({ payment }) {
  // const navigate = useNavigate(); // Move this to the top

  if (!payment) {
    return <p>No payment details available</p>;
  }

  const { _id, cardNo, holderName, paymentMethod, expires } = payment;

  // const deleteHandler = async () => {
  //   try {
  //     await axios.delete(`http://localhost:5000/payments/${_id}`);
  //     alert('Payment deleted successfully!');
  //     navigate('/admindashboard/payment'); 
  //   } catch (error) {
  //     console.error('Error deleting payment:', error);
  //     alert('Failed to delete payment.');
  //   }
  // };

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

      {/* Add a delete button to use deleteHandler */}
      {/* <button onClick={deleteHandler}>Delete</button>  */}
    </div>
  );
}
export default Payment;