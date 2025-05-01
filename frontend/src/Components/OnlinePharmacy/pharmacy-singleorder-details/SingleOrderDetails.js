import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./SingleOrderDetails.css";

function SingleOrderDetails({ order, index, onDelete }) {
  const {
    _id,
    orderId,
    patientName,
    patientAge,
    gender,
    patientEmail,
    patientContact,
    dateofbirth,
    paymentMethod,
    deliveryAddress,
    uploadedDate,
    comments,
  } = order;

  //const navigate = useNavigate();

  const deleteHandler = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/onlinePharmacy/${order._id}`);
        alert("Order deleted successfully.");
        onDelete(); // ✅ Notify parent to remove order from UI
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete the order. Please try again.");
      }
    }
  };

  

  return (
    <tr className="OrderRow">
      <td className="tableData">{index + 1}</td>
      <td className="tableData">{orderId}</td>
      <td className="tableData">{patientName}</td>
      <td className="tableData">{patientAge}</td>
      <td className="tableData">{gender}</td>
      <td className="tableData">{patientEmail}</td>
      <td className="tableData">{patientContact}</td>
      <td className="tableData">{dateofbirth}</td>
      <td className="tableData">{paymentMethod}</td>
      <td className="tableData">{deliveryAddress}</td>
      <td className="tableData">{uploadedDate}</td>
      <td className="tableData">{comments || "No comments"}</td>

      <td className="actionButtons">
        <Link to={`/order-brief/${_id}`}>
          <button className="btno-view-more">View More</button>
        </Link>
        <Link to={`/order-details/${_id}`}>
          <button className="btno-update">Update</button>
        </Link>
        <button onClick={deleteHandler} className="btno-delete">Delete</button>
      </td>
    </tr>
  );
}

export default SingleOrderDetails;
