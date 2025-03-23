import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddPharmacyOrder.css';

function AddPharmacyOrder() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    orderId: "",
    patientName: "",
    patientAge: "",
    gender: "",
    patientEmail: "",
    patientContact: "",
    prescriptionFile: "",
    paymentMethod: "",
    deliveryAddress: "",
    uploadedDate: new Date().toISOString().split("T")[0], // Auto-fill with today’s date
    comments: "",
  });

  const [prescriptionImg, setPrescriptionImg] = useState(null);
  const [errors, setErrors] = useState({});

  // Auto-generate order ID
  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // Example: ORD-3456
    }));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors dynamically
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setPrescriptionImg(e.target.files[0]);
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};

    if (!inputs.patientName) newErrors.patientName = "Patient Name is required";
    if (!inputs.patientAge || isNaN(inputs.patientAge) || inputs.patientAge <= 0) 
      newErrors.patientAge = "Valid Patient Age is required";
    if (!inputs.gender) newErrors.gender = "Gender is required";
    if (!inputs.patientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.patientEmail)) 
      newErrors.patientEmail = "Valid email is required";
    if (!inputs.patientContact || !/^\d{10}$/.test(inputs.patientContact)) 
      newErrors.patientContact = "Valid 10-digit phone number is required";
    if (!inputs.paymentMethod) newErrors.paymentMethod = "Payment method is required";
    if (!inputs.deliveryAddress) newErrors.deliveryAddress = "Delivery address is required";
    if (!inputs.uploadedDate) newErrors.uploadedDate = "Uploaded date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imagePath = "";
  
        // Upload prescription file if selected
        if (prescriptionImg) {
          const formData = new FormData();
          formData.append("prescriptionImg", prescriptionImg);
  
          const imageUploadResponse = await axios.post(
            "http://localhost:5000/onlinePharmacy/uploadPrescriptionFile",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
  
          imagePath = imageUploadResponse.data.filePath;
        }
  
        const orderData = { ...inputs, prescriptionFile: imagePath };
  
        const response = await axios.post("http://localhost:5000/onlinePharmacy", orderData);
        console.log("Response from server:", response.data);

        if (response.status === 201 || response.status === 200) { 
            navigate("/order-details"); // Redirect to home page where orders are displayed
        } else {
            console.error("Failed to add order:", response);
        }

  
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="body-form">
      <div className="order-form-header">
        <hr />
        <h1>Place a New Order</h1>
        <hr />
      </div>
      <div className="form-container">
        
        <br />
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Order ID (Auto-Generated)</label>
            <input
              type='text'
              name='orderId'
              value={inputs.orderId}
              onChange={handleChange}
            />
             {errors.orderId && <span className='error-text'>{errors.orderId}</span>}
          </div>

          <div className="form-group">
            <label>Patient Name</label>
            <input type="text" name="patientName" value={inputs.patientName} onChange={handleChange} />
            {errors.patientName && <span className="error-text">{errors.patientName}</span>}
          </div>

          <div className="form-group">
            <label>Patient Age</label>
            <input type="number" name="patientAge" value={inputs.patientAge} onChange={handleChange} />
            {errors.patientAge && <span className="error-text">{errors.patientAge}</span>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={inputs.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="patientEmail" value={inputs.patientEmail} onChange={handleChange} />
            {errors.patientEmail && <span className="error-text">{errors.patientEmail}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="patientContact" value={inputs.patientContact} onChange={handleChange} />
            {errors.patientContact && <span className="error-text">{errors.patientContact}</span>}
          </div>

          <div className="form-group">
            <label>Prescription File (Optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" value={inputs.paymentMethod} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Online">Online Payment</option>
              <option value="Delivery">Cash on delivery</option>
            </select>
            {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <textarea name="deliveryAddress" value={inputs.deliveryAddress} onChange={handleChange} />
            {errors.deliveryAddress && <span className="error-text">{errors.deliveryAddress}</span>}
          </div>

          <div className="form-group">
            <label>Uploaded Date</label>
            <input type="date" name="uploadedDate" value={inputs.uploadedDate} onChange={handleChange} />
            {errors.uploadedDate && <span className="error-text">{errors.uploadedDate}</span>}
          </div>

          <div className="form-group">
            <label>Comments</label>
            <textarea name="comments" value={inputs.comments} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn-submit">Add Order</button>
        </form>
      </div>
    </div>
  );
}

export default AddPharmacyOrder;
