import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './doctorForm.css';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar';
import '../../Common/AdminProfile/AdminProfileSample.css';

function DoctorForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    doctorId: '',
    doctorName: '',
    doctorSpecialization: '',
    doctorProfilePicture: '',
    doctorPhoneNumber: '',
    doctorEmail: '',
    doctorQualifications: '',
    doctorExperience: '',
    doctorLanguagesSpoken: '',
    doctorHospitalAffiliation: '',
    doctorLicenseNumber: '',
    doctorAvailableDays: [],
    doctorAvailableTimeStart: '',
    doctorAvailableTimeEnd: '',
    doctorConsultationFees: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch Doctor ID when specialization changes
  const handleSpecializationChange = async (e) => {
    const selected = e.target.value;
    setInputs(prev => ({ ...prev, doctorSpecialization: selected }));
    validateField('doctorSpecialization', selected);

    if (selected) {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/generateDoctorId/${encodeURIComponent(selected)}`);
        setInputs(prev => ({ ...prev, doctorId: response.data.doctorId }));
        validateField('doctorId', response.data.doctorId);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          doctorId: 'Failed to generate Doctor ID'
        }));
      }
    } else {
      setInputs(prev => ({ ...prev, doctorId: '' }));
      setErrors(prev => ({
        ...prev,
        doctorId: 'Doctor ID is required'
      }));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    let value = e.target.value;
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: value,
    }));
    validateField(e.target.name, value);
  };

  // Handle profile picture file change
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Handle available days multi-select
  const handleAvailableDaysChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setInputs(prev => ({
      ...prev,
      doctorAvailableDays: options,
    }));
    validateField('doctorAvailableDays', options);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    let errorMsg = '';

    if (field === 'doctorId') {
      const doctorIdPattern = /^DR-[A-Z]+-\d{4}-\d{3}$/;
      if (!value || !value.trim()) {
        errorMsg = 'Doctor ID is required';
      } else if (!doctorIdPattern.test(value)) {
        errorMsg = 'Doctor ID must be in format: DR-[Specialization]-[Year]-[UniqueNumber] (e.g., DR-ENT-2023-001)';
      }
    } else if (field === 'doctorSpecialization') {
      if (!value || !value.trim()) {
        errorMsg = 'Specialization is required';
      }
    } else if (field === 'doctorPhoneNumber') {
      if (!value || !value.trim()) {
        errorMsg = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = 'Phone Number must be 10 digits';
      }
    } else if (field === 'doctorEmail') {
      if (!value || !value.trim()) {
        errorMsg = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMsg = 'Enter a valid email address';
      }
    } else if (field === 'doctorExperience') {
      if (!value || !value.trim()) {
        errorMsg = 'Experience is required';
      } else if (isNaN(value) || Number(value) <= 0) {
        errorMsg = 'Experience must be a positive number';
      }
    } else if (field === 'doctorConsultationFees') {
      if (!value || !value.trim()) {
        errorMsg = 'Consultation Fees are required';
      } else if (isNaN(value)) {
        errorMsg = 'Fees must be a number';
      }
    } else if (field === 'doctorAvailableDays') {
      if (!Array.isArray(value) || value.length === 0) {
        errorMsg = 'At least one day should be selected';
      }
    } else if (field === 'doctorAvailableTimeStart' || field === 'doctorAvailableTimeEnd') {
      if (!value || !value.trim()) {
        errorMsg = 'Enter time in 24HRS format (Like 14:00)';
      }
    } else {
      // For all other fields, just check required
      if (!value || !value.trim()) {
        errorMsg = `${field.replace(/doctor/, 'Doctor ')} is required`;
      }
    }

    setErrors(prevErrors => {
      if (errorMsg) {
        return { ...prevErrors, [field]: errorMsg };
      } else {
        const { [field]: removed, ...rest } = prevErrors;
        return rest;
      }
    });
  };

  // Validate the whole form
  const validateForm = () => {
    let valid = true;
    Object.keys(inputs).forEach((key) => {
      validateField(key, inputs[key]);
      // If there's an error after validation, set valid to false
      if (
        (key === 'doctorAvailableDays' && (!Array.isArray(inputs[key]) || inputs[key].length === 0)) ||
        (errors[key])
      ) {
        valid = false;
      }
    });
    return valid && Object.keys(errors).length === 0;
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
          imagePath = imageUploadResponse.data.filePath;
        }

        // Prepare doctor data for submission
        const doctorData = { ...inputs, doctorProfilePicture: imagePath };

        await axios.post('http://localhost:5000/doctors', doctorData);
        navigate('/doctorDetails');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      // Focus the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (fieldElement) fieldElement.focus();
      }
    }
  };

  return (
    <div className='doc-prof-container'>
      <div className='admin-prof-container'>
        <div className='col-1'>
          <AdminSideNavBar />
        </div>
        <div className='body-form-unique col-2-d'>
          <div className='doctor-form-header-unique'>
            <hr />
            <h1>Register a New Doctor</h1>
            <hr />
          </div>
          <div className='form-container-unique'>
            <Link to='/doctorDetails'>
              <button className='btn-back-unique'>Back</button>
            </Link>
            <br /><br /><br />
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className='doc-form-section-unique'>
                <label className='doc-form-subhead-unique'>Basic Information</label>
                <div className='form-group-unique'>
                  <label>Doctor Specialization</label>
                  <select
                    name='doctorSpecialization'
                    value={inputs.doctorSpecialization}
                    onChange={handleSpecializationChange}
                  >
                    <option value=''>Select Specialization</option>
                    <option value='Pediatrics'>Pediatrics</option>
                    <option value='Cardiology'>Cardiology</option>
                    <option value='Dermatology'>Dermatology</option>
                    <option value='ENT'>ENT</option>
                    <option value='Emergency Medicine'>Emergency Medicine</option>
                    <option value='Gastroenterology'>Gastroenterology</option>
                    <option value='General Practice'>General Practice</option>
                    <option value='Geriatrics'>Geriatrics</option>
                    <option value='Internal Medicine'>Internal Medicine</option>
                    <option value='Neurology'>Neurology</option>
                    <option value='Obstetrics & Gynecology'>Obstetrics & Gynecology</option>
                    <option value='Orthopedics'>Orthopedics</option>
                    <option value='Pediatric Dermatology'>Pediatric Dermatology</option>
                    <option value='Pediatric ENT'>Pediatric ENT</option>
                    <option value='Urology'>Urology</option>
                  </select>
                  {errors.doctorSpecialization && <span className='error-text'>{errors.doctorSpecialization}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Doctor ID (Auto Generated)</label>
                  <input
                    type="text"
                    value={inputs.doctorId}
                    readOnly
                    style={{ backgroundColor: "#f0f0f0" }}
                  />
                  {errors.doctorId && <span className='error-text'>{errors.doctorId}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Doctor Name</label>
                  <input
                    type='text'
                    name='doctorName'
                    value={inputs.doctorName}
                    onChange={handleChange}
                  />
                  {errors.doctorName && <span className='error-text'>{errors.doctorName}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Doctor Address</label>
                  <input
                    type='text'
                    name='doctorAddress'
                    value={inputs.doctorAddress}
                    onChange={handleChange}
                  />
                  {errors.doctorAddress && <span className='error-text'>{errors.doctorAddress}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Doctor Profile Picture (Optional)</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                  {profilePicture && (
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt='Preview'
                      width={100}
                    />
                  )}
                </div>
                <div className='form-group-unique'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    name='doctorPhoneNumber'
                    value={inputs.doctorPhoneNumber}
                    onChange={handleChange}
                  />
                  {errors.doctorPhoneNumber && <span className='error-text'>{errors.doctorPhoneNumber}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Email</label>
                  <input
                    type='text'
                    name='doctorEmail'
                    value={inputs.doctorEmail}
                    onChange={handleChange}
                  />
                  {errors.doctorEmail && <span className='error-text'>{errors.doctorEmail}</span>}
                </div>
              </div>
              {/* Professional Information */}
              <div className='doc-form-section-unique'>
                <label className='doc-form-subhead-unique'>Professional Information</label>
                <div className='form-group-unique'>
                  <label>Qualifications</label>
                  <input
                    type='text'
                    name='doctorQualifications'
                    value={inputs.doctorQualifications}
                    onChange={handleChange}
                  />
                  {errors.doctorQualifications && <span className='error-text'>{errors.doctorQualifications}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Experience</label>
                  <input
                    type='text'
                    name='doctorExperience'
                    value={inputs.doctorExperience}
                    onChange={handleChange}
                  />
                  {errors.doctorExperience && <span className='error-text'>{errors.doctorExperience}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Hospital Affiliation</label>
                  <input
                    type='text'
                    name='doctorHospitalAffiliation'
                    value={inputs.doctorHospitalAffiliation}
                    onChange={handleChange}
                  />
                  {errors.doctorHospitalAffiliation && <span className='error-text'>{errors.doctorHospitalAffiliation}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>License Number</label>
                  <input
                    type='text'
                    name='doctorLicenseNumber'
                    value={inputs.doctorLicenseNumber}
                    onChange={handleChange}
                  />
                  {errors.doctorLicenseNumber && <span className='error-text'>{errors.doctorLicenseNumber}</span>}
                </div>
              </div>
              {/* Communication & Languages */}
              <div className='doc-form-section-unique'>
                <label className='doc-form-subhead-unique'>Communication & Languages</label>
                <div className='form-group-unique'>
                  <label>Languages Spoken (Separate with a comma)</label>
                  <input
                    type='text'
                    name='doctorLanguagesSpoken'
                    value={inputs.doctorLanguagesSpoken}
                    onChange={handleChange}
                  />
                  {errors.doctorLanguagesSpoken && <span className='error-text'>{errors.doctorLanguagesSpoken}</span>}
                </div>
              </div>
              {/* Availability */}
              <div className='doc-form-section-unique'>
                <label className='doc-form-subhead-unique'>Availability</label>
                <div className='form-group-unique'>
                  <label>Available Days</label>
                  <select
                    name='doctorAvailableDays'
                    multiple
                    value={inputs.doctorAvailableDays}
                    onChange={handleAvailableDaysChange}
                  >
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                  {errors.doctorAvailableDays && <span className='error-text'>{errors.doctorAvailableDays}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Available Time Start</label>
                  <input
                    type='time'
                    name='doctorAvailableTimeStart'
                    value={inputs.doctorAvailableTimeStart}
                    onChange={handleChange}
                  />
                  {errors.doctorAvailableTimeStart && <span className='error-text'>{errors.doctorAvailableTimeStart}</span>}
                </div>
                <div className='form-group-unique'>
                  <label>Available Time End</label>
                  <input
                    type='time'
                    name='doctorAvailableTimeEnd'
                    value={inputs.doctorAvailableTimeEnd}
                    onChange={handleChange}
                  />
                  {errors.doctorAvailableTimeEnd && <span className='error-text'>{errors.doctorAvailableTimeEnd}</span>}
                </div>
              </div>
              {/* Pricing */}
              <div className='doc-form-section-unique'>
                <label className='doc-form-subhead-unique'>Pricing</label>
                <div className='form-group-unique'>
                  <label>Consultation Fees</label>
                  <input
                    type='text'
                    name='doctorConsultationFees'
                    value={inputs.doctorConsultationFees}
                    onChange={handleChange}
                  />
                  {errors.doctorConsultationFees && <span className='error-text'>{errors.doctorConsultationFees}</span>}
                </div>
              </div>
              <button type='submit' className='btn-submit-unique'>Add Doctor</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorForm;
