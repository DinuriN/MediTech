import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PharmacyOrder(props) {
    console.log("Order props:", props.order);
    const {_id,orderId,patientName,patientAge,gender,patientEmail,patientContact,prescriptionFile,paymentMethod,deliveryAddress,uploadedDate,comments} = props.order;

    const history = useNavigate();
    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/onlinePharmacy/${_id}`)
        .then(res=>res.data)
        .then(() =>history(0)) //refreshes the current page
        .then(() =>history("/order-details")) //redirects to orderdetails
      };
    return(
        <div className="order-container">
        <table className="order-table">
            <tbody>
                <tr>
                    <td><strong>ID:</strong></td>
                    <td>{_id}</td>
                </tr>
                <tr>
                    <td><strong>Order ID:</strong></td>
                    <td>{orderId}</td>
                </tr>
                <tr>
                    <td><strong>Patient Name:</strong></td>
                    <td>{patientName}</td>
                </tr>
                <tr>
                    <td><strong>Patient Age:</strong></td>
                    <td>{patientAge}</td>
                </tr>
                <tr>
                <   td><strong>Gender:</strong></td>
                    <td>{gender}</td>
                </tr>
                <tr>
                    <td><strong>Patient Email:</strong></td>
                    <td>{patientEmail}</td>
                </tr>
                 <tr>
                    <td><strong>Patient Contact:</strong></td>
                    <td>{patientContact}</td>
                </tr>
                <tr>
                    <td><strong>Prescription File:</strong></td>
                    <td>{prescriptionFile}</td>
                </tr>
                <tr>
                    <td><strong>Payment Method:</strong></td>
                    <td>{paymentMethod}</td>
                </tr>
                <tr>
                    <td><strong>Delivery Address:</strong></td>
                     <td>{deliveryAddress}</td>
                </tr>
                <tr>
                    <td><strong>Uploaded Date:</strong></td>
                    <td>{uploadedDate}</td>
                </tr>
                <tr>
                    <td><strong>Comments:</strong></td>
                    <td>{comments}</td>
                </tr>
    </tbody>
  </table>
  <div className="actions">
    <Link to={`/order-details/${_id}`} className="update-link">Update</Link>
    <button onClick={deleteHandler} className="delete-button">Delete</button>
  </div>
</div>
    )
}

export default PharmacyOrder
