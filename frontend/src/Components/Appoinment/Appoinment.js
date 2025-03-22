import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Appoinment.css';

function Appointment(props) {
  // Destructuring props to extract appointment details
  const { _id, name, gmail, age, contact, appointmentDate, appointmentTime, address, appointmentType, doctorOrScanType } = props.appointment;
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle deleting an appointment
  const deleteHandler = async () => {
    try {
      // Sending a DELETE request to the backend
      await axios.delete(`http://localhost:5000/appointments/${_id}`);
      alert('Appointment deleted successfully!');
      
      // Navigating to the admin dashboard 
      navigate('/admindashboard/appointment'); 
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment.');
    }
  };

  return (
    <div className="appointment-container">
      {/* Displaying appointment details in a table format */}
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
            <td>{doctorOrScanType}</td>
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
