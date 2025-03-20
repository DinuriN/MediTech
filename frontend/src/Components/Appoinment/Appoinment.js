import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Appoinment.css';



function Appointment(props) {
  const { _id, name, gmail, age, contact,appointmentDate,appointmentTime, address, appointmentType, doctorOrScanType } = props.appointment;
  const navigate = useNavigate();

  // Function to handle the delete action
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${_id}`);
      alert('Appointment deleted successfully!');
      navigate('/appointments'); // Navigate to appointments page after deletion
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment.');
    }
  };



  return (
    <div className="appointment-container">
      <table className="appointment-table">
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{name}</td>
          </tr>
          <tr>
            <td><strong>Gmail:</strong></td>
            <td>{gmail}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{age}</td>
          </tr>
          <tr>
            <td><strong>Contact:</strong></td>
            <td>{contact}</td>
          </tr>

          <tr>
            <td><strong>Appointment Date:</strong></td>
            <td>{appointmentDate}</td>
          </tr>

          <tr>
            <td><strong>Appointment Time:</strong></td>
            <td>{appointmentTime}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{address}</td>
          </tr>
          <tr>
            <td><strong>Appointment Type:</strong></td>
            <td>{appointmentType}</td>
          </tr>
          <tr>
            <td><strong>Doctor/Scan Type:</strong></td>
            {doctorOrScanType} {/* Dynamically render doctor/scan type */}
          </tr>
        </tbody>
      </table>
      <div className="actions">
        <Link to={`/appointments/${_id}`} className="update-link">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default Appointment;