import React, { useState } from 'react';
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
    guardianName: '',
    appointmentType: '',
    doctorOrScanType: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!inputs.name) newErrors.name = 'Name is required.';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputs.gmail || !emailRegex.test(inputs.gmail)) {
      newErrors.gmail = 'Please enter a valid email address.';
      valid = false;
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!inputs.contact || !contactRegex.test(inputs.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit contact number.';
      valid = false;
    }

    const age = parseInt(inputs.age);
    if (!inputs.age || isNaN(age) || age < 0 || age > 200) {
      newErrors.age = 'Please enter a valid age between 0 and 200.';
      valid = false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!inputs.appointmentDate || inputs.appointmentDate < today) {
      newErrors.appointmentDate = 'Please select a valid date (today or future).';
      valid = false;
    }

    if (!inputs.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required.';
      valid = false;
    } else {
      const todayDate = new Date();
      const [inputHour, inputMinute] = inputs.appointmentTime.split(':').map(Number);

      if (inputs.appointmentDate === today) {
        if (
          
          inputHour < todayDate.getHours() ||
          (inputHour === todayDate.getHours() && inputMinute <= todayDate.getMinutes())
        ) {
          newErrors.appointmentTime = 'Please select a future time for today.';
          valid = false;
        }
      }
    }

    if (!inputs.address) newErrors.address = 'Address is required.';
    if (!inputs.guardianName) newErrors.guardianName = 'Guardian name is required.';
    if (!inputs.appointmentType) newErrors.appointmentType = 'Appointment type is required.';
    if (!inputs.doctorOrScanType) newErrors.doctorOrScanType = 'Doctor or scan type is required.';

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await sendRequest({
        ...inputs,
        age: parseInt(inputs.age),
        contact: parseInt(inputs.contact),
      });
      alert('Appointment added successfully!');
      navigate('/addPayments', {
        state: {
          appointmentId: response.data.appointment._id,
          name: inputs.name,
          gmail: inputs.gmail,
          appointmentDate: inputs.appointmentDate,
          appointmentTime: inputs.appointmentTime,
          appointmentType: inputs.appointmentType,
          doctorOrScanType: inputs.doctorOrScanType,
        },
      });
    } catch (error) {
      console.error('Error adding appointment:', error.response?.data || error.message);
      alert(`An error occurred: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  const sendRequest = async (data) => {
    return await axios.post('http://localhost:5000/appointments', data);
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
      
      <div className="container">
        <h1>Add Appointment</h1>

        <form onSubmit={handleSubmit}>
          <label>Patient's Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email</label>
          <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required />
          {errors.gmail && <p className="error">{errors.gmail}</p>}

          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
          {errors.age && <p className="error">{errors.age}</p>}

          <label>Contact</label>
          <input type="text" name="contact" onChange={handleChange} value={inputs.contact} required />
          {errors.contact && <p className="error">{errors.contact}</p>}

          <label>Appointment Date</label>
          <input type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} required />
          {errors.appointmentDate && <p className="error">{errors.appointmentDate}</p>}

          <label>Appointment Time</label>
          <input type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime} required />
          {errors.appointmentTime && <p className="error">{errors.appointmentTime}</p>}

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
          {errors.address && <p className="error">{errors.address}</p>}

          <label>Guardian's Name</label>
          <input type="text" name="guardianName" onChange={handleChange} value={inputs.guardianName} required />
          {errors.guardianName && <p className="error">{errors.guardianName}</p>}

          <label>Appointment Type</label>
          <select name="appointmentType" onChange={handleChange} value={inputs.appointmentType} required>
            <option value="" disabled>Select Appointment Type</option>
            <option value="Consultation">Consultation</option>
            <option value="Scan">Scan</option>
          </select>
          {errors.appointmentType && <p className="error">{errors.appointmentType}</p>}

          <label>Doctor or Scan Type</label>
          {renderDoctorOrScanType()}
          {errors.doctorOrScanType && <p className="error">{errors.doctorOrScanType}</p>}

          <div className="fee-info">
            <p>Appointment Fee: Rs. 2,000</p>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddAppoinment;