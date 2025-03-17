import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './AddPatient.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPatient() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    gmail: '',
    age: '',
    contact: '',
    address: '',
    appointmentType: '',
    doctorOrScanType: '',
  });
  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      await sendRequest();
      alert('Patient added successfully!');
      navigate('/addPayments', { state: { ...inputs, doctorOrScanType: inputs.doctorOrScanType, appointmentType: inputs.appointmentType } });
    } catch (error) {
      console.error('Error adding Patient:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const sendRequest = async () => {
    await axios
      .post('http://localhost:5000/patients', {
        name: inputs.name,
        gmail: inputs.gmail,
        age: inputs.age,
        contact: inputs.contact,
        address: inputs.address,
        appointmentType: inputs.appointmentType,
        doctorOrScanType: inputs.doctorOrScanType,
      })
      .then((res) => res.data);
  };

  const renderDoctorOrScanType = () => {
    if (inputs.appointmentType === 'Doctor') {
      return (
        <select
          name="doctorOrScanType"
          onChange={handleChange}
          value={inputs.doctorOrScanType}
          required
        >
          <option value="" disabled>
            Select Doctor
          </option>
          <option value="Dr. Smith (Cardiologist)">Dr. Smith (Cardiologist)</option>
          <option value="Dr. Johnson (Dermatologist)">Dr. Johnson (Dermatologist)</option>
          <option value="Dr. Brown (Pediatrician)">Dr. Brown (Pediatrician)</option>
        </select>
      );
    } else if (inputs.appointmentType === 'Scan') {
      return (
        <select
          name="doctorOrScanType"
          onChange={handleChange}
          value={inputs.doctorOrScanType}
          required
        >
          <option value="" disabled>
            Select Scan Type
          </option>
          <option value="X-ray">X-ray</option>
          <option value="MRI">MRI</option>
          <option value="Ultrasound">Ultrasound</option>
        </select>
      );
    }
    return null; // No dropdown if appointment type is not selected
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>Add Consultation</h1>

        <form onSubmit={handleSubmit} state={inputs}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail}
            required
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            value={inputs.age}
            required
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            onChange={handleChange}
            value={inputs.contact}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={inputs.address}
            required
          />

          <label>Appointment Type</label>
          <select
            name="appointmentType"
            onChange={handleChange}
            value={inputs.appointmentType}
            required
          >
            <option value="" disabled>
              Select Appointment Type
            </option>
            <option value="Doctor">Consultation</option>
            <option value="Scan">Scan</option>
          </select>

          <label>Doctor or Scan Type</label>
          {renderDoctorOrScanType()}

          <button
            type="submit"
            onClick={handleSubmit} // This will handle the submit action as well
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
