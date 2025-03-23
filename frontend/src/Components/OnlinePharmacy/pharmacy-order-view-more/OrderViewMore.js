import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderViewMore.css";

function OrderViewMore() {
  const [orderBrief, setOrderBrief] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderBrief = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/onlinePharmacy/${id}`);
        
        setOrderBrief(response.data.order); // Ensure correct API response format
      
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderBrief();
  }, [id]);

  if (!orderBrief) {
    return <div>Loading...</div>;
  }

  const {
    orderId,
    patientName,
    patientAge,
    gender,
    patientEmail,
    patientContact,
    prescriptionFile,
    paymentMethod,
    deliveryAddress,
    uploadedDate,
    comments
  } = orderBrief;

  return (
    <div className="container">
      <br />
      <hr />
      <h2 className="text-center mb-4">{orderId} - {patientName}'s Order</h2>
      <hr />
      <div className="prescription">
        <img
          src={`http://localhost:5000${prescriptionFile}`}
          alt={patientName}
          className="img-fluid"
          onError={(e) => e.target.src = "http://localhost:5000/uploads/doc-prof-profile-pictures/default-prescription.png"} // Fallback image
        />
        <h3>Patient Age: {patientAge}</h3>
        <p><strong>Patient Gender:</strong> {gender}</p>
        <p><strong>Patient Email:</strong> {patientEmail}</p>
        <p><strong>Patient Contact:</strong> {patientContact}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
        <p><strong>Uploaded Date:</strong> {uploadedDate}</p>
        <p><strong>Comments:</strong> {comments}</p>
        <button className="btn btn-secondary" onClick={() => navigate("/order-details")}>Back</button>
      </div>
    </div>
  );
}

export default OrderViewMore;
