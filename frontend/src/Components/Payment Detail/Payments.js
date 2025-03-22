import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; // Importing axios for making HTTP requests
import Payment from '../Payment/Payment';

function Payments() {
  const [payments, setPayments] = useState([]); // State to store the list of payments

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payments'); // Fetching payments from API
        console.log('Fetched payments:', response.data); 
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error); 
      }
    };

    fetchPayments();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
    
      {payments.length === 0 ? (
        <p>No payment details available</p>
      ) : (
        payments.map((payment) => <Payment key={payment._id} payment={payment} />) // Mapping through payments and rendering Payment component
      )}
    </div>
  );
}

export default Payments; 
