import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./AddPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

function AddPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    cardNo: "",
    holderName: "",
    paymentMethod: "",
    expires: "",
    cvv: "",  // Adding cvv state
  });
  
  const [errors, setErrors] = useState({
    cardNo: "",
    cvv: "", // Adding cvv validation
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
  
    // Card number validation (only digits, exactly 12 digits)
    const cardNoRegex = /^[0-9]{12}$/;
    if (!cardNoRegex.test(inputs.cardNo)) {
      newErrors.cardNo = "Card number must be exactly 12 digits.";
      valid = false;
    }
  
    // CVV validation (only digits, 3 or 4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(inputs.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
      valid = false;
    }
  
    // Expiration date validation (format MM/YY and must be a future date)
    const expiresRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format: MM/YY
    if (!expiresRegex.test(inputs.expires)) {
      newErrors.expires = "Enter a valid expiry date (MM/YY).";
      valid = false;
    } else {
      // Extract month and year
      const [inputMonth, inputYear] = inputs.expires.split("/").map(Number);
      
      // Get current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
  
      // Validate expiration date
      if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        newErrors.expires = "Card has expired. Enter a valid date.";
        valid = false;
      }
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return; // Stop form submission if validation fails
    }

    try {
      await sendRequest();
      alert("Payment added successfully!");
      sendEmail();

      navigate("/addappointment"); // Navigate to appointments page after successful submission
    } catch (error) {
      console.error("Error adding Payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const sendRequest = async () => {
    console.log('Sending request with data:', inputs); // Log data to debug
    await axios.post("http://localhost:5000/payments", {
      cardNo: Number(inputs.cardNo),
      holderName: String(inputs.holderName),
      paymentMethod: String(inputs.paymentMethod),
      expires: String(inputs.expires),
      cvv: String(inputs.cvv),  // Sending CVV to backend
      
    });
  };

  const sendEmail = () => {
    const templateParams = {
      to_name: inputs.holderName,
      cardNo: inputs.cardNo,
      to_email: "it23200760@my.sliit.lk",
      message: `Your payment of ${inputs.paymentMethod} on ${inputs.paymentDate} was successful.`,
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
      <Nav />
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
          {errors.cardNo && <p className="error">{errors.cardNo}</p>} {/* Card number error message */}

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
            maxLength="5" // Format "MM/YY"
            onChange={handleChange}
            value={inputs.expires}
            required
          />
          {errors.expires && <p className="error">{errors.expires}</p>} {/* Expires error message */}

          {/* CVV input field */}
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
          {errors.cvv && <p className="error">{errors.cvv}</p>} {/* CVV error message */}

          <button type="submit" className="pay-button">Make Payment</button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;