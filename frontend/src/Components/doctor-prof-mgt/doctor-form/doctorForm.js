import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './doctorForm.css';

function DoctorForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    doctorId: '',
    doctorName: '',
    doctorSpecialization: '',
    doctorProfilePicture: '',  // This will store the file path
    doctorPhoneNumber: '',
    doctorEmail: '',
    doctorQualifications: '',
    doctorExperience: '',
    doctorLanguagesSpoken: '',
    doctorHospitalAffiliation: '',
    doctorLicenseNumber: '',
    doctorAvailableDays: '',
    doctorAvailableTimeStart: '',
    doctorAvailableTimeEnd: '',
    doctorConsultationFees: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({
    doctorId: 'Doctor ID must be in format: DR-[Specialization]-[Year]-[UniqueNumber] (e.g., DR-ENT-2023-001)',
  });

  // Handle change of inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // Revalidate field when user types
    validateField(e.target.name, e.target.value);
  };

  // Handle profile picture file change
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    let errorMsg = '';

    switch (field) {
      case 'doctorId':
        const doctorIdPattern = /^DR-[A-Z]+-\d{4}-\d{3}$/;
        if (!value.trim()) {
          errorMsg = 'Doctor ID is required';
        } else if (!doctorIdPattern.test(value)) {
          errorMsg = 'Doctor ID must be in format: DR-[Specialization]-[Year]-[UniqueNumber] (e.g., DR-ENT-2023-001)';
        }
        break;

      case 'doctorPhoneNumber':
        if (!value.trim()) {
          errorMsg = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = 'Phone Number must be 10 digits';
        }
        break;

      case 'doctorEmail':
        if (!value.trim()) {
          errorMsg = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMsg = 'Enter a valid email address';
        }
        break;

      case 'doctorExperience':
        if (!value.trim()) {
          errorMsg = 'Experience is required';
        } else if (isNaN(value) || Number(value) <= 0) {
          errorMsg = 'Experience must be a positive number';
        }
        break;

      case 'doctorAvailableTimeStart':
      case 'doctorAvailableTimeEnd':
        if (!value.trim()) {
          errorMsg = 'Enter time in 24HRS format (Like 14:00)';
        }
        break;

      case 'doctorConsultationFees':
        if (!value.trim()) {
          errorMsg = 'Consultation Fees are required';
        } else if (isNaN(value)) {
          errorMsg = 'Fees must be a number';
        }
        break;

      default:
        if (!value.trim()) errorMsg = `${field.replace(/doctor/, 'Doctor ')} is required`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg || '',
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    Object.keys(inputs).forEach((key) => validateField(key, inputs[key]));
    newErrors = Object.fromEntries(Object.entries(errors).filter(([_, value]) => value));
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imagePath = '';
  
        // Upload profile picture if selected
        if (profilePicture) {
          const formData = new FormData();
          formData.append('profilePicture', profilePicture);
  
          const imageUploadResponse = await axios.post('http://localhost:5000/doctors/uploadDoctorProfilePic', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          imagePath = imageUploadResponse.data.filePath; // Assuming backend returns the file path
        }
  
        // Ensure doctorProfilePicture is updated before submission
        const doctorData = { ...inputs, doctorProfilePicture: imagePath };
  
        await axios.post('http://localhost:5000/doctors', doctorData);
        navigate('/doctorDetails'); // Navigate after successful submission
  
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  

  return (
    <div className='body-form'>
      <div className='doctor-form-header'>
        <hr />
        <h1>Register a New Doctor</h1>
        <hr />
      </div>
      <div className='form-container'>
        <Link to='/doctorDetails'>
          <button className='btn-back'>Back</button>
        </Link>
        <br /><br /><br />
        <form onSubmit={handleSubmit}>
          {Object.keys(inputs).map((field) => (
            <div className='form-group' key={field}>
              <label>{field.replace(/doctor/, 'Doctor ')}</label>
              <input
                type='text'
                name={field}
                value={inputs[field]}
                onChange={handleChange}
              />
              {errors[field] && <span className='error-text'>{errors[field]}</span>}
            </div>
          ))}
          <div className='form-group'>
            <label>Doctor Profile Picture (Optional)</label>
            <input type='file' accept='image/*' onChange={handleFileChange} />
          </div>

          <button type='submit' className='btn-submit'>Add Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorForm;
