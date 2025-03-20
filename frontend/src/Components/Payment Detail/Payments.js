import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Payment from '../Payment/Payment'; // Import the Payment component

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payments');
        console.log('Fetched payments:', response.data); // Log fetched payments to debug
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Payment Details</h1>
      {payments.length === 0 ? (
        <p>No payment details available</p>
      ) : (
        payments.map((payment) => <Payment key={payment._id} payment={payment} />)
      )}
    </div>
  );
}

export default Payments;

