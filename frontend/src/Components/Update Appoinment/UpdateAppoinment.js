import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function UpdateAppointment() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/appointments/${id}`);
        const data = res.data.appointment;

        // Convert date to YYYY-MM-DD format
        const formattedDate = data.appointmentDate ? data.appointmentDate.split('T')[0] : '';

        setInputs({
          ...data,
          appointmentDate: formattedDate, // Ensure correct date format
          doctorOrScanType: data.doctorOrScanType || '', // Ensure it is set
        });
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/appointments/${id}`, {
      name: String(inputs.name),
      gmail: String(inputs.gmail),
      age: Number(inputs.age),
      contact: Number(inputs.contact),
      appointmentDate: inputs.appointmentDate, // No need to convert it to Date()
      appointmentTime: String(inputs.appointmentTime),
      address: String(inputs.address),
      appointmentType: String(inputs.appointmentType),
      doctorOrScanType: String(inputs.doctorOrScanType),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset doctorOrScanType if appointmentType is changed
    if (name === "appointmentType") {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
        doctorOrScanType: "", // Reset the selection when switching types
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history('/appointments'); // Navigate after update
  };

  return (
    <div className="update-container">
      <h1>Update Appointment</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name || ''} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail || ''} required />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age || ''} required />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input type="text" name="contact" onChange={handleChange} value={inputs.contact || ''} required />
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <input type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate || ''} required />
        </div>

        <div className="form-group">
          <label>Appointment Time</label>
          <input type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime || ''} required />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address || ''} required />
        </div>

        <div className="form-group">
          <label>Appointment Type</label>
          <select name="appointmentType" onChange={handleChange} value={inputs.appointmentType || ''} required>
            <option value="" disabled>Select Appointment Type</option>
            <option value="Doctor">Consultation</option>
            <option value="Scan">Scan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Doctor or Scan Type</label>
          {inputs.appointmentType === 'Doctor' ? (
            <select name="doctorOrScanType" onChange={handleChange} value={inputs.doctorOrScanType || ''} required>
              <option value="" disabled>Select Doctor</option>
              <option value="Dr. Smith (Cardiologist)">Dr. Smith (Cardiologist)</option>
              <option value="Dr. Johnson (Dermatologist)">Dr. Johnson (Dermatologist)</option>
              <option value="Dr. Brown (Pediatrician)">Dr. Brown (Pediatrician)</option>
            </select>
          ) : inputs.appointmentType === 'Scan' ? (
            <select name="doctorOrScanType" onChange={handleChange} value={inputs.doctorOrScanType || ''} required>
              <option value="" disabled>Select Scan Type</option>
              <option value="X-ray">X-ray</option>
              <option value="MRI">MRI</option>
              <option value="Ultrasound">Ultrasound</option>
            </select>
          ) : (
            <p>Please select an appointment type first.</p>
          )}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default UpdateAppointment;
