import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Patient.css';

function Patient(props) {
  const { _id, name, gmail, age, contact, address, appointmentType, doctorOrScanType } = props.patient;
  const navigate = useNavigate();

  // Function to handle the delete action
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/patients/${_id}`);
      alert('Patient deleted successfully!');
      navigate('/userdetails'); // Navigate to user details page after deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient.');
    }
  };

  return (
    

    <div className="patient-container">
    
      
      <table className="patient-table">
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
        <Link to={`/userdetails/${_id}`} className="update-link">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default Patient;
