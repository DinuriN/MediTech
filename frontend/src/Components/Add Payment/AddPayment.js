import React, { useState } from "react";
import Nav from "../Nav/Nav"; 
import "./AddPayment.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

function AddPayment() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    cardNo: "",
    holderName: "",
    paymentMethod: "",
    expires: "",
    cvv: "",
  });
  
  // State to manage validation errors
  const [errors, setErrors] = useState({
    cardNo: "",
    cvv: "",
  });

  // Handles changes to form inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to validate input fields
  const validate = () => {
    let valid = true;
    const newErrors = {};
  
    // Card number validation (should be exactly 12 digits)
    const cardNoRegex = /^[0-9]{12}$/;
    if (!cardNoRegex.test(inputs.cardNo)) {
      newErrors.cardNo = "Card number must be exactly 12 digits.";
      valid = false;
    }
  
    // CVV validation (should be 3 or 4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(inputs.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
      valid = false;
    }
  
    // Expiry date validation (MM/YY format, must be a future date)
    const expiresRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; 
    if (!expiresRegex.test(inputs.expires)) {
      newErrors.expires = "Enter a valid expiry date (MM/YY).";
      valid = false;
    } else {
      const [inputMonth, inputYear] = inputs.expires.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear() % 100; 
  
      // Ensure the card has not expired
      if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        newErrors.expires = "Card has expired. Enter a valid date.";
        valid = false;
      }
    }
  
    setErrors(newErrors); // Updating state with validation errors
    return valid;
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return; 
    }

    try {
      await sendRequest(); // Send payment data to the backend
      alert("Payment added successfully!");
      sendEmail(); // Send confirmation email

      navigate("/addappointment"); // Redirect to appointment page after successful payment
    } catch (error) {
      console.error("Error adding Payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Function to send the payment data to the backend
  const sendRequest = async () => {
    console.log('Sending request with data:', inputs); 
    await axios.post("http://localhost:5000/payments", {
      cardNo: Number(inputs.cardNo),
      holderName: String(inputs.holderName),
      paymentMethod: String(inputs.paymentMethod),
      expires: String(inputs.expires),
      cvv: String(inputs.cvv),  
    });
  };

  // Function to send a confirmation email
   const sendEmail = () => {
     const templateParams = {
       to_name: inputs.holderName,
       cardNo: inputs.cardNo,
       to_email: "it23200760@my.sliit.lk",
       message: `Your payment of ${inputs.paymentMethod} was successful.`,
     };

     emailjs.send("service_2z2qeud", "template_hl64zbp", templateParams, "FhIGe__t2RrTGet6U")
       .then((response) => {
         console.log("Email sent successfully!", response.status, response.text);
       })
       .catch((error) => {
         console.error("Failed to send email:", error);
       });
  };

  return (
    <div>
      <Nav /> {/* Navigation component */}
      <div className="payment-form-container">
        <h1 className="payment-title">Payment Portal</h1>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNo"
            maxLength="12"
            placeholder="**** **** ****"
            onChange={handleChange}
            value={inputs.cardNo}
            required
          />
          {errors.cardNo && <p className="error">{errors.cardNo}</p>} 

          <label>Cardholder Name</label>
          <input type="text" name="holderName" onChange={handleChange} value={inputs.holderName} required />

          <label>Payment Method</label>
          <select name="paymentMethod" onChange={handleChange} value={inputs.paymentMethod} required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>

          <label>Expires (MM/YY)</label>
          <input
            type="text"
            name="expires"
            placeholder="MM/YY"
            maxLength="5" 
            onChange={handleChange}
            value={inputs.expires}
            required
          />
          {errors.expires && <p className="error">{errors.expires}</p>} 

          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            maxLength="3"
            placeholder="***"
            onChange={handleChange}
            value={inputs.cvv}
            required
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>} 

          <button type="submit" className="pay-button">Make Payment</button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;
