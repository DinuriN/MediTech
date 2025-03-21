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
// Handle change of inputs
const handleChange = (e) => {
  let value = e.target.value;

  // If the field is doctorAvailableDays, split the input into an array
  if (e.target.name === 'doctorAvailableDays') {
    value = value.split(',').map(day => day.trim());  // Split and remove extra spaces
  }

  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: value,
  }));

  // Revalidate field when user types
  validateField(e.target.name, value);
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

        case 'doctorAvailableDays':
      // If the value is an array, skip calling `.trim()`
      if (Array.isArray(value)) {
        if (value.length === 0) {
          errorMsg = 'At least one day should be selected';
        }
      } else {
        if (!value.trim()) {
          errorMsg = 'Days are required';
        }
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
          {/* Manually create the input fields */}
          <div className='form-group'>
            <label>Doctor ID</label>
            <input
              type='text'
              name='doctorId'
              value={inputs.doctorId}
              onChange={handleChange}
            />
            {errors.doctorId && <span className='error-text'>{errors.doctorId}</span>}
          </div>
          <div className='form-group'>
            <label>Doctor Name</label>
            <input
              type='text'
              name='doctorName'
              value={inputs.doctorName}
              onChange={handleChange}
            />
            {errors.doctorName && <span className='error-text'>{errors.doctorName}</span>}
          </div>
          <div className='form-group'>
            <label>Doctor Specialization</label>
            <input
              type='text'
              name='doctorSpecialization'
              value={inputs.doctorSpecialization}
              onChange={handleChange}
            />
            {errors.doctorSpecialization && <span className='error-text'>{errors.doctorSpecialization}</span>}
          </div>
          <div className='form-group'>
            <label>Doctor Profile Picture (Optional)</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
          <div className='form-group'>
            <label>Phone Number</label>
            <input
              type='text'
              name='doctorPhoneNumber'
              value={inputs.doctorPhoneNumber}
              onChange={handleChange}
            />
            {errors.doctorPhoneNumber && <span className='error-text'>{errors.doctorPhoneNumber}</span>}
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='text'
              name='doctorEmail'
              value={inputs.doctorEmail}
              onChange={handleChange}
            />
            {errors.doctorEmail && <span className='error-text'>{errors.doctorEmail}</span>}
          </div>
          <div className='form-group'>
            <label>Qualifications</label>
            <input
              type='text'
              name='doctorQualifications'
              value={inputs.doctorQualifications}
              onChange={handleChange}
            />
            {errors.doctorQualifications && <span className='error-text'>{errors.doctorQualifications}</span>}
          </div>
          <div className='form-group'>
            <label>Experience</label>
            <input
              type='text'
              name='doctorExperience'
              value={inputs.doctorExperience}
              onChange={handleChange}
            />
            {errors.doctorExperience && <span className='error-text'>{errors.doctorExperience}</span>}
          </div>
          <div className='form-group'>
            <label>Languages Spoken</label>
            <input
              type='text'
              name='doctorLanguagesSpoken'
              value={inputs.doctorLanguagesSpoken}
              onChange={handleChange}
            />
            {errors.doctorLanguagesSpoken && <span className='error-text'>{errors.doctorLanguagesSpoken}</span>}
          </div>
          <div className='form-group'>
            <label>Hospital Affiliation</label>
            <input
              type='text'
              name='doctorHospitalAffiliation'
              value={inputs.doctorHospitalAffiliation}
              onChange={handleChange}
            />
            {errors.doctorHospitalAffiliation && <span className='error-text'>{errors.doctorHospitalAffiliation}</span>}
          </div>
          <div className='form-group'>
            <label>License Number</label>
            <input
              type='text'
              name='doctorLicenseNumber'
              value={inputs.doctorLicenseNumber}
              onChange={handleChange}
            />
            {errors.doctorLicenseNumber && <span className='error-text'>{errors.doctorLicenseNumber}</span>}
          </div>
          <div className='form-group'>
            <label>Available Days</label>
            <input
              type='text'
              name='doctorAvailableDays'
              value={inputs.doctorAvailableDays}
              onChange={handleChange}
            />
            {errors.doctorAvailableDays && <span className='error-text'>{errors.doctorAvailableDays}</span>}
          </div>
          <div className='form-group'>
            <label>Available Time Start</label>
            <input
              type='text'
              name='doctorAvailableTimeStart'
              value={inputs.doctorAvailableTimeStart}
              onChange={handleChange}
            />
            {errors.doctorAvailableTimeStart && <span className='error-text'>{errors.doctorAvailableTimeStart}</span>}
          </div>
          <div className='form-group'>
            <label>Available Time End</label>
            <input
              type='text'
              name='doctorAvailableTimeEnd'
              value={inputs.doctorAvailableTimeEnd}
              onChange={handleChange}
            />
            {errors.doctorAvailableTimeEnd && <span className='error-text'>{errors.doctorAvailableTimeEnd}</span>}
          </div>
          <div className='form-group'>
            <label>Consultation Fees</label>
            <input
              type='text'
              name='doctorConsultationFees'
              value={inputs.doctorConsultationFees}
              onChange={handleChange}
            />
            {errors.doctorConsultationFees && <span className='error-text'>{errors.doctorConsultationFees}</span>}
          </div>

          <button type='submit' className='btn-submit'>Add Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorForm;
