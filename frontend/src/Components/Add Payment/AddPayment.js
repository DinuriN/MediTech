import React, { useState } from "react";
import "./AddPayment.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AddPayment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [inputs, setInputs] = useState({
    cardNo: "",
    holderName: "",
    paymentMethod: "",
    expires: "",
    cvv: "",
    appointmentId: state?.appointmentId || "",
  });

  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!/^[0-9]{12}$/.test(inputs.cardNo)) {
      newErrors.cardNo = "Card number must be exactly 12 digits.";
      valid = false;
    }

    if (!/^[0-9]{3,4}$/.test(inputs.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
      valid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(inputs.expires)) {
      newErrors.expires = "Enter a valid expiry date (MM/YY).";
      valid = false;
    } else {
      const [inputMonth, inputYear] = inputs.expires.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;

      if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        newErrors.expires = "Card has expired.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate() || !inputs.appointmentId) {
      if (!inputs.appointmentId) {
        alert("Appointment ID is missing. Please create an appointment first.");
      }
      return;
    }

    try {
      const response = await sendRequest();
      setPaymentSuccess(true);
      setPaymentData(response.data);
      sendEmail(response.data.appointment, response.data.payment);
    } catch (error) {
      console.error("Error adding Payment:", error.response?.data || error.message);
      alert(`An error occurred: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  const sendRequest = async () => {
    return await axios.post("http://localhost:5000/payments", {
      cardNo: inputs.cardNo,
      holderName: inputs.holderName,
      paymentMethod: inputs.paymentMethod,
      expires: inputs.expires,
      cvv: inputs.cvv,
      appointmentId: inputs.appointmentId,
    });
  };

  const sendEmail = (appointment, payment) => {
    const templateParams = {
      name: state?.name || appointment.name,
      cardNo: inputs.cardNo.slice(-4),
      appointmentType: state?.appointmentType || appointment.appointmentType,
      appointmentDate: state?.appointmentDate ? new Date(state.appointmentDate).toLocaleDateString() : new Date(appointment.appointmentDate).toLocaleDateString(),
      appointmentTime: state?.appointmentTime || appointment.appointmentTime,
      doctorOrScanType: state?.doctorOrScanType || appointment.doctorOrScanType,
      to_email: state?.gmail || appointment.gmail,
      amount: 2000,
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

  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Blue Header
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 30, 'F');

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Receipt of Payment", 105, 20, { align: "center" });

    doc.setTextColor(0, 0, 0); // Reset body text

    // Divider Line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    const paymentDateObj = paymentData?.payment?.paymentDate ? new Date(paymentData.payment.paymentDate) : new Date();
    const formattedDate = paymentDateObj.toLocaleDateString();
    const formattedTime = paymentDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("Issued by:", 20, 45);
    doc.text("Payment Date:", 20, 52);
    doc.text("Payment Time:", 20, 59);
    doc.text("Receipt No.:", 20, 66);

    doc.setFont("Helvetica", "normal");
    doc.text("MediTech Hospital", 55, 45);
    doc.text(formattedDate, 55, 52);
    doc.text(formattedTime, 55, 59);
    doc.text(`${paymentData?.payment?._id || '1001'}`, 55, 66);

    // Payment Details Table
    autoTable(doc, {
      startY: 75,
      head: [["Received From", "Amount", "Payment Method", "For"]],
      body: [[
        inputs.holderName || 'N/A',
        'Rs. 2000',
        inputs.paymentMethod || 'N/A',
        state?.doctorOrScanType || 'Appointment',
      ]],
      styles: {
        fontSize: 12,
        valign: 'middle',
        lineColor: [0, 102, 204], // Blue lines
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      theme: 'grid',
    });

    // Signature Section
    const finalY = doc.lastAutoTable.finalY || 90;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("Authorized By:", 20, finalY + 20);
    doc.setFont("Helvetica", "normal");
    doc.text("MediTech Staff", 55, finalY + 20);

  

    doc.setFontSize(10);
    doc.setFont("Helvetica", "italic");
    doc.text("Thank you for trusting MediTech!", 20, finalY + 50);

    doc.save("payment_receipt.pdf");
  };

  return (
    <div>
      
      <div className="payment-form-container">
        {paymentSuccess ? (
          <div className="confirmation-message">
            <h2>Payment Successful!</h2>
            <p>Your payment has been processed successfully.</p>
            <button onClick={downloadReceipt} className="pay-button">Download Receipt</button>
            <button onClick={() => navigate("/")} className="pay-button">Back to Appointments</button>
          </div>
        ) : (
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
              maxLength="4"
              placeholder="***"
              onChange={handleChange}
              value={inputs.cvv}
              required
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}

            <button type="submit" className="pay-button">Make Payment</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddPayment;