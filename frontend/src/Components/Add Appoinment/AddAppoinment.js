import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './AddAppoinment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAppoinment() {
  const navigate = useNavigate();
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
  
  const [errors, setErrors] = useState({
    gmail: '',
    contact: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Gmail validation (simple regex for email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.gmail)) {
      newErrors.gmail = "Please enter a valid email address.";
      valid = false;
    }

    // Contact validation (only digits, 10 digits)
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(inputs.contact)) {
      newErrors.contact = "Please enter a valid 10-digit contact number.";
      valid = false;
    }


  // Age validation (must be a valid number and not negative)
  const age = parseInt(inputs.age);
  if (isNaN(age)) {
    newErrors.age = "Please enter a valid age.";
    valid = false;
  } else if (age < 0) {
    newErrors.age = "Age cannot be negative. Please enter a positive age.";
    valid = false;
  } else if (age < 18 || age > 100) {
    newErrors.age = "Please enter a valid age between 18 and 100.";
    valid = false;
  }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop form submission if validation fails
    }

    try {
      await sendRequest();
      alert('Appointment added successfully!');
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

  const sendRequest = async () => {
    await axios.post('http://localhost:5000/appointments', {
      name: inputs.name,
      gmail: inputs.gmail,
      age: inputs.age,
      contact: inputs.contact,
      appointmentDate: inputs.appointmentDate, // ✅ Ensure correct format
      appointmentTime: inputs.appointmentTime,
      address: inputs.address,
      appointmentType: inputs.appointmentType,
      doctorOrScanType: inputs.doctorOrScanType,
    });
  };

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
      <Nav />
      <div className="container">
        <h1>Add Appointment</h1>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />

          <label>Email</label>
          <input
            type="email"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail}
            required
          />
          {errors.gmail && <p className="error">{errors.gmail}</p>} {/* Gmail error message */}

          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
          {errors.age && <p className="error">{errors.age}</p>} {/* Age error message */}


          <label>Contact</label>
          <input
            type="text"
            name="contact"
            onChange={handleChange}
            value={inputs.contact}
            required
          />
          {errors.contact && <p className="error">{errors.contact}</p>} {/* Contact error message */}

          <label>Appointment Date</label>
          <input
            type="date"  // ✅ Uses date picker
            name="appointmentDate"
            onChange={handleChange}
            value={inputs.appointmentDate}
            required
          />

          <label>Appointment Time</label>
          <input
            type="time"  // ✅ Uses time picker
            name="appointmentTime"
            onChange={handleChange}
            value={inputs.appointmentTime}
            required
          />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />

          <label>Appointment Type</label>
          <select name="appointmentType" onChange={handleChange} value={inputs.appointmentType} required>
            <option value="" disabled>Select Appointment Type</option>
            <option value="Consultation">Consultation</option>
            <option value="Scan">Scan</option>
          </select>

          <label>Doctor or Scan Type</label>
          {renderDoctorOrScanType()}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddAppoinment;
