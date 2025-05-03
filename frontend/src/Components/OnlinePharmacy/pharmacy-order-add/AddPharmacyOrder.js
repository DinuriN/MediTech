import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPharmacyOrder.css";

function AddPharmacyOrder() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [inputs, setInputs] = useState({
    orderId: "",
    patientName: "",
    patientAge: "",
    gender: "",
    patientEmail: "",
    patientContact: "",
    dateofbirth:"",
    prescriptionFile: "",
    paymentMethod: "",
    deliveryAddress: "",
    uploadedDate: today, // Auto-fill with today’s date
    comments: "",
  });

  const [prescriptionImg, setPrescriptionImg] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPrescriptionImg(file);
    setInputs((prevState) => ({
      ...prevState,
      prescriptionFile: file ? file.name : "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      prescriptionFile: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!inputs.patientName) newErrors.patientName = "Patient Name is required";
    if (!inputs.patientAge || isNaN(inputs.patientAge) || inputs.patientAge <= 0)
      newErrors.patientAge = "Valid Patient Age is required";
    if (!inputs.gender) newErrors.gender = "Gender is required";
    if (!inputs.patientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.patientEmail))
      newErrors.patientEmail = "Valid email is required";
    if (!inputs.patientContact || !/^0\d{9}$/.test(inputs.patientContact))
      newErrors.patientContact = "Phone number must start with 0 and have 10 digits";
    if (!inputs.paymentMethod) newErrors.paymentMethod = "Payment method is required";
    if (!inputs.deliveryAddress) newErrors.deliveryAddress = "Delivery address is required";
    if (!inputs.uploadedDate || inputs.uploadedDate !== today)
      newErrors.uploadedDate = "Date must be today";
    if (!prescriptionImg) newErrors.prescriptionFile = "Prescription file is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors before submitting.");
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imagePath = "";

        if (prescriptionImg) {
          const formData = new FormData();
          formData.append("prescriptionImg", prescriptionImg);

          const imageUploadResponse = await axios.post(
            "http://localhost:5000/onlinePharmacy/uploadPrescriptionFile",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          imagePath = imageUploadResponse.data.filePath;
        }

        const orderData = { ...inputs, prescriptionFile: imagePath };

        console.log("Submitting Order Data:", orderData);

        const response = await axios.post("http://localhost:5000/onlinePharmacy", orderData);

        console.log("Server Response:", response.data);
        alert("Order placed successfully!");
        navigate("/");

      } catch (error) {
        console.error("Error submitting form:", error.response ? error.response.data : error.message);
        alert("Failed to place the order. Please try again.");
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: error.response?.data?.error || "Failed to place the order. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="body-form">
      <div className="order-form-header">
        
        
        
      </div>
      <div className="form-container">
      
        
        <br />
        <br />
        <h1>Place a New Order</h1>
        <br />


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Order ID (Auto-Generated)</label>
            <input type="text" name="orderId" value={inputs.orderId} readOnly />
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
          <label>Patient Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={inputs.dateofbirth}
            onChange={handleChange} 
          />
          {errors.dateofbirth && <span className="error-text">{errors.dateofbirth}</span>}
        </div>

          <div className="form-group">
            <label>Prescription File</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.prescriptionFile && <span className="error-text">{errors.prescriptionFile}</span>}
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
            <input type="date" name="uploadedDate" value={inputs.uploadedDate} />
            {errors.uploadedDate && <span className="error-text">{errors.uploadedDate}</span>}
          </div>

          <div className="form-group">
            <label>Comments</label>
            <textarea name="comments" value={inputs.comments} onChange={handleChange} placeholder="Comment your concerns about the uploaded prescription" style={{ height: "100px" }} />
          </div>

          {errors.submit && <span className="error-text">{errors.submit}</span>}

          <button type="submit" className="btn-submit">Add Order</button>
        </form>
      </div>

      </div>
    
  );
}

export default AddPharmacyOrder;
