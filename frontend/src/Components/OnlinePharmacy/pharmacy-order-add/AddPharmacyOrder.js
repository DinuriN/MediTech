import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "./AddPharmacyOrder.css"; // Import the external CSS file

function AddPharmacyOrder() {
  const navigate = useNavigate();
  //const {orderId} = useParams();
  const [inputs, setInputs] = useState({
    orderId:"",
    patientName: "",
    patientAge: "",
    gender: "",
    patientEmail: "",
    patientContact: "",
    prescriptionFile: null,
    paymentMethod: "",
    deliveryAddress: "",
    uploadedDate: "",
    comments: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setInputs({ ...inputs, prescriptionFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequests();
    navigate("/order-details");
  };

  const sendRequests = async () => {
    const formData = new FormData();
    formData.append("orderId", inputs.orderId);
    formData.append("patientName", inputs.patientName);
    formData.append("patientAge", inputs.patientAge);
    formData.append("gender", inputs.gender);
    formData.append("patientEmail", inputs.patientEmail);
    formData.append("patientContact", inputs.patientContact);
    formData.append("prescriptionFile", inputs.prescriptionFile);
    formData.append("paymentMethod", inputs.paymentMethod);
    formData.append("deliveryAddress", inputs.deliveryAddress);
    formData.append("uploadedDate", inputs.uploadedDate);
    formData.append("comments", inputs.comments);

    await axios
      .post("http://localhost:5000/onlinePharmacy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data)
      .catch((error) => console.error("Error submitting order:", error));
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Add Pharmacy Order</h1>
        <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <label>OrderId</label>
            <input type="text" name="orderId" value={inputs.orderId} onChange={handleChange} required maxLength={50} />
          </div>
          <div className="form-group">
            <label>Patient Name</label>
            <input type="text" name="patientName" value={inputs.patientName} onChange={handleChange} required maxLength={50} />
          </div>

          <div className="form-group">
            <label>Patient Age</label>
            <input type="number" name="patientAge" value={inputs.patientAge} onChange={handleChange} required min={0} max={120} />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={inputs.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="patientEmail" value={inputs.patientEmail} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input type="text" name="patientContact" value={inputs.patientContact} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Prescription File</label>
            <input type="file" name="prescriptionFile" onChange={handleFileChange} accept='application/pdf' required />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" value={inputs.paymentMethod} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="online_payment">Online Payment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <textarea name="deliveryAddress" value={inputs.deliveryAddress} onChange={handleChange} required maxLength={200} />
          </div>

          <div className="form-group">
            <label>Comments</label>
            <textarea name="comments" value={inputs.comments} onChange={handleChange} maxLength={500} />
          </div>

          <button type="submit" className="submit-btn">Submit Order</button>
        </form>
      </div>
    </div>
  );
}

export default AddPharmacyOrder;
