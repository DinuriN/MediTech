import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./AddPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

function AddPayment() {
  const location = useLocation();
  console.log(location.state.appointmentType);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    cardNo: "",
    holderName: "",
    paymentMethod: "",
    paymentDate: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("Payment added successfully!");
      sendEmail();

      navigate("/addPatients");
    } catch (error) {
      console.error("Error adding Payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/payments", {
      cardNo: Number(inputs.cardNo),
      holderName: String(inputs.holderName),
      paymentMethod: String(inputs.paymentMethod),
      paymentDate: String(inputs.paymentDate),
      name: location.state.name,
      gmail: location.state.gmail,
      appointmentType: location.state.appointmentType,
      doctorOrScanType: location.state.doctorOrScanType

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
        <h1 className="payment-title">Secure Payment Portal</h1>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>Card Number</label>
          <input type="text" name="cardNo" maxLength="16" placeholder="**** **** **** ****" onChange={handleChange} value={inputs.cardNo} required />

          <label>Cardholder Name</label>
          <input type="text" name="holderName" onChange={handleChange} value={inputs.holderName} required />

          <label>Payment Method</label>
          <select name="paymentMethod" onChange={handleChange} value={inputs.paymentMethod} required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>

          <label>Payment Date</label>
          <input type="date" name="paymentDate" onChange={handleChange} value={inputs.paymentDate} required />

          <button type="submit" className="pay-button">Make Payment</button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;