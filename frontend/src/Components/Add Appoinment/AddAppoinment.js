import React, { useState } from 'react';
import Nav from '../Nav/Nav'; // Importing navigation component
import './AddAppoinment.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAppoinment() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    name: '',
    gmail: '',
    age: '',
    contact: '',
    appointmentDate: '',
    appointmentTime: '',
    address: '',
    appointmentType: '',
    doctorOrScanType: '',
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({
    gmail: '',
    contact: '',
    age: '',
    appointmentDate: '',
  });

  // Handles changes to form inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to validate input fields
  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.gmail)) {
      newErrors.gmail = "Please enter a valid email address.";
      valid = false;
    }

    // Contact number validation (should be exactly 10 digits)
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(inputs.contact)) {
      newErrors.contact = "Please enter a valid 10-digit contact number.";
      valid = false;
    }

    // Age validation (between 18 and 100)
    const age = parseInt(inputs.age);
    if (isNaN(age)) {
      newErrors.age = "Please enter a valid age.";
      valid = false;
    } else if (age < 0) {
      newErrors.age = "Age cannot be negative. Please enter a positive age.";
      valid = false;
    } else if (age < 0 || age > 200) {
      newErrors.age = "Please enter a valid age between 18 and 100.";
      valid = false;
    }

    // Date validation (only allow today and future dates)
    const today = new Date().toISOString().split("T")[0]; //date in YYYY-MM-DD format
    if (!inputs.appointmentDate || inputs.appointmentDate < today) {
      newErrors.appointmentDate = "Please select a valid date (today or future).";
      valid = false;
    }

    setErrors(newErrors); // Updating state with validation errors
    return valid; // Returning whether the form is valid
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return; 
    }

    try {
      await sendRequest(); // Send appointment data to the backend
      alert('Appointment added successfully!');

      // Navigate to the payment page while passing form data as state
      navigate('/addPayments', {
        state: {
          name: inputs.name,
          gmail: inputs.gmail,
          age: inputs.age,
          contact: inputs.contact,
          address: inputs.address,
          appointmentType: inputs.appointmentType,
          doctorOrScanType: inputs.doctorOrScanType,
          appointmentDate: inputs.appointmentDate,
          appointmentTime: inputs.appointmentTime,
        },
      });
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Function to send the appointment data to the backend
  const sendRequest = async () => {
    await axios.post('http://localhost:5000/appointments', {
      name: inputs.name,
      gmail: inputs.gmail,
      age: inputs.age,
      contact: inputs.contact,
      appointmentDate: inputs.appointmentDate,
      appointmentTime: inputs.appointmentTime,
      address: inputs.address,
      appointmentType: inputs.appointmentType,
      doctorOrScanType: inputs.doctorOrScanType,
    });
  };

  // Function to render the dropdown based on the selected appointment type
  const renderDoctorOrScanType = () => {
    if (inputs.appointmentType === 'Consultation') {
      return (
        <select name="doctorOrScanType" onChange={handleChange} value={inputs.doctorOrScanType} required>
          <option value="" disabled>Select Doctor</option>
          <option value="Dr. Smith (Cardiologist)">Dr. Smith (Cardiologist)</option>
          <option value="Dr. Johnson (Dermatologist)">Dr. Johnson (Dermatologist)</option>
          <option value="Dr. Brown (Pediatrician)">Dr. Brown (Pediatrician)</option>
        </select>
      );
    } else if (inputs.appointmentType === 'Scan') {
      return (
        <select name="doctorOrScanType" onChange={handleChange} value={inputs.doctorOrScanType} required>
          <option value="" disabled>Select Scan Type</option>
          <option value="X-ray">X-ray</option>
          <option value="MRI">MRI</option>
          <option value="Ultrasound">Ultrasound</option>
        </select>
      );
    }
    return null;
  };

  return (
    <div>
      <Nav /> {/* Navigation component */}
      <div className="container">
        <h1>Add Appointment</h1>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />

          <label>Email</label>
          <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required />
          {errors.gmail && <p className="error">{errors.gmail}</p>} {/* Display email validation error */}

          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
          {errors.age && <p className="error">{errors.age}</p>} {/* Display age validation error */}

          <label>Contact</label>
          <input type="text" name="contact" onChange={handleChange} value={inputs.contact} required />
          {errors.contact && <p className="error">{errors.contact}</p>} {/* Display contact validation error */}

          <label>Appointment Date</label>
          <input type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} required />
          {errors.appointmentDate && <p className="error">{errors.appointmentDate}</p>} {/* Display date validation error */}

          <label>Appointment Time</label>
          <input type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime} required />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />

          <label>Appointment Type</label>
          <select name="appointmentType" onChange={handleChange} value={inputs.appointmentType} required>
            <option value="" disabled>Select Appointment Type</option>
            <option value="Consultation">Consultation</option>
            <option value="Scan">Scan</option>
          </select>

          <label>Doctor or Scan Type</label>
          {renderDoctorOrScanType()} {/* Render dropdown based on appointment type */}

          <button type="submit">Submit</button> 
        </form>
      </div>
    </div>
  );
}

export default AddAppoinment;
