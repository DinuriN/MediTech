import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './UpdatePatient.css';

function UpdatePatient() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/patients/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.patient));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/patients/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        contact: Number(inputs.contact),
        address: String(inputs.address),
        appointmentType: String(inputs.appointmentType),
        doctorOrScanType: String(inputs.doctorOrScanType),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/userdetails'));
  };

  const renderDoctorOrScanType = () => {
    if (inputs.appointmentType === 'Doctor') {
      return (
        <select
          name="doctorOrScanType"
          onChange={handleChange}
          value={inputs.doctorOrScanType || ''}
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
          value={inputs.doctorOrScanType || ''}
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
    <div className="update-container">
      <h1>Update Patient</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            name="age"
            onChange={handleChange}
            value={inputs.age || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            onChange={handleChange}
            value={inputs.contact || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={inputs.address || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Appointment Type</label>
          <select
            name="appointmentType"
            onChange={handleChange}
            value={inputs.appointmentType || ''}
            required
          >
            <option value="" disabled>
              Select Appointment Type
            </option>
            <option value="Doctor">Consultation</option>
            <option value="Scan">Scan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Doctor or Scan Type</label>
          {renderDoctorOrScanType()}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdatePatient;
