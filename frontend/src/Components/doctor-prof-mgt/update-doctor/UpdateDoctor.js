import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './UpdateDoctor.css';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'

function UpdateDoctor() {
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
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // Initially empty
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/doctors/${id}`);
        const doctorData = res.data.doctor;

        // Ensure time fields are in correct format for <input type="time">
        const formatTimeForInput = (time) => {
          if (!time) return "";
          const [hour, minute] = time.split(":");
          return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        };

        setInputs({
          ...doctorData,
          doctorAvailableTimeStart: formatTimeForInput(doctorData.doctorAvailableTimeStart),
          doctorAvailableTimeEnd: formatTimeForInput(doctorData.doctorAvailableTimeEnd),
        });
      } catch (err) {
        setError("Failed to fetch doctor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "doctorAvailableDays") {
      const daysArray = value.split(",").map((day) => day.trim()).filter((day) => day);
      setInputs((prevState) => ({ ...prevState, [name]: daysArray }));
      validateField(name, daysArray);
    } else {
      setInputs((prevState) => ({ ...prevState, [name]: value }));
      validateField(name, value); // Validate while typing
    }
  };
  
  const validateForm = () => {
    let newErrors = {};
  
    // Validate each input field
    Object.keys(inputs).forEach((key) => validateField(key, inputs[key]));
    newErrors = Object.fromEntries(Object.entries(errors).filter(([_, value]) => value));
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field, value) => {
    let errorMsg = '';
  
    // Check if value is a string before calling .trim()
    if (typeof value === 'string' && value.trim) {
      value = value.trim(); // Apply trim to a string value
    }
  
    // Doctor ID Validation
    if (field === 'doctorId') {
      const doctorIdPattern = /^DR-[A-Z]+-\d{4}-\d{3}$/;
      if (!value) {
        errorMsg = 'Doctor ID is required';
      } else if (!doctorIdPattern.test(value)) {
        errorMsg = 'Doctor ID must be in format: DR-[Specialization]-[Year]-[UniqueNumber] (e.g., DR-ENT-2023-001)';
      }
    }
  
    // Phone Number Validation
    else if (field === 'doctorPhoneNumber') {
      if (!value) {
        errorMsg = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = 'Phone Number must be 10 digits';
      }
    }
  
    // Email Validation
    else if (field === 'doctorEmail') {
      if (!value) {
        errorMsg = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMsg = 'Enter a valid email address';
      }
    }
  
    // Experience Validation
    else if (field === 'doctorExperience') {
      if (!value) {
        errorMsg = 'Experience is required';
      } else if (isNaN(value) || Number(value) <= 0) {
        errorMsg = 'Experience must be a positive number';
      }
    }
  
    // Time Validation (Start and End)
    else if (field === 'doctorAvailableTimeStart' || field === 'doctorAvailableTimeEnd') {
      if (!value) {
        errorMsg = 'Enter time in 24HRS format (Like 14:00)';
      }
    }
  
    // Consultation Fees Validation
    else if (field === 'doctorConsultationFees') {
      if (!value) {
        errorMsg = 'Consultation Fees are required';
      } else if (isNaN(value)) {
        errorMsg = 'Fees must be a number';
      }
    }
  
    // Available Days Validation
    else if (field === 'doctorAvailableDays') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          errorMsg = 'At least one day should be selected';
        }
      } else {
        if (!value) {
          errorMsg = 'Days are required';
        }
      }
    }
  
    // Default: Required Field Check
    else if (!value) {
      errorMsg = `${field.replace(/doctor/, 'Doctor ')} is required`;
    }
  
    // Update Errors State
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg || null, // Set error if present, otherwise remove it
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedDoctor = { ...inputs };
  
      if (!validateForm()) {
        // Find the first field with an error and focus on it
        const firstErrorField = Object.keys(errors).find((key) => errors[key]);
        if (firstErrorField) {
          const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
          if (fieldElement) {
            fieldElement.focus();
          }
        }
        return; // Prevent submission if there are validation errors
      }
  
      // If a new profile picture is selected, upload it first
      if (profilePicture) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);
  
        const uploadRes = await axios.post("http://localhost:5000/doctors/uploadDoctorProfilePic", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (uploadRes.status === 200) {
          updatedDoctor.doctorProfilePicture = uploadRes.data.filePath;
        } else {
          throw new Error("Image upload failed");
        }
      }
  
      // Send updated doctor data
      const res = await axios.put(`http://localhost:5000/doctors/${id}`, updatedDoctor);
      if (res.status === 200) {
        navigate("/doctorDetails");
      } else {
        throw new Error("Failed to update doctor details");
      }
  
    } catch (err) {
      console.error(err); // Log the error to get more information
      setError("Failed to update doctor details. Please try again.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className='doc-prof-container'>
    <div className='admin-prof-container'>
      <div className='col-1'>
        <AdminSideNavBar/>
      </div>
      <div className='col-2-d'>
        <div className="update-body-upd">
          <br /><hr />
          <h1>Update Doctor Details</h1>
          <hr />
          <div className="update-doctor-container-upd">
            <Link to="/doctorDetails">
              <button className="back-btn-upd">Back</button>
            </Link>
            <br /><br /><br />
            <form onSubmit={handleSubmit} className="doctor-form-upd">
              {/* Basic Information Section */}
              <div className="section-upd">
                <label className="sub-head-upd">Basic Information</label>
                <div className="form-group-upd">
                  <label htmlFor="doctorId" className="form-label-upd">Doctor ID</label>
                  <input type="text" className="form-input-upd" id="doctorId" name="doctorId" value={inputs.doctorId || ''} onChange={handleChange} required />
                  {errors.doctorId && <span className='error-text-upd'>{errors.doctorId}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorId" className="form-label-upd">Doctor Address</label>
                  <input type="text" className="form-input-upd" id="doctorAddress" name="doctorAddress" value={inputs.doctorAddress || ''} onChange={handleChange} required />
                  {errors.doctorAddress && <span className='error-text-upd'>{errors.doctorAddress}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorName" className="form-label-upd">Name</label>
                  <input type="text" className="form-input-upd" id="doctorName" name="doctorName" value={inputs.doctorName || ''} onChange={handleChange} required />
                </div>
                <div className="form-group-upd">
                  <label>Doctor Profile Picture</label>
                  {inputs.doctorProfilePicture && (
                    <div>
                      <img src={`http://localhost:5000${inputs.doctorProfilePicture}`} alt="Current Profile" width="100" />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorPhoneNumber" className="form-label-upd">Phone Number</label>
                  <input type="text" className="form-input-upd" id="doctorPhoneNumber" name="doctorPhoneNumber" value={inputs.doctorPhoneNumber || ''} onChange={handleChange} required />
                  {errors.doctorPhoneNumber && <span className='error-text-upd'>{errors.doctorPhoneNumber}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorEmail" className="form-label-upd">Email</label>
                  <input type="email" className="form-input-upd" id="doctorEmail" name="doctorEmail" value={inputs.doctorEmail || ''} onChange={handleChange} required />
                  {errors.doctorEmail && <span className='error-text-upd'>{errors.doctorEmail}</span>}
                </div>
              </div>
              {/* Professional Information Section */}
              <div className="section-upd">
                <label className="sub-head-upd">Professional Information</label>
                <div className="form-group-upd">
                  <label htmlFor="doctorSpecialization" className="form-label-upd">Specialization</label>
                  <input type="text" className="form-input-upd" id="doctorSpecialization" name="doctorSpecialization" value={inputs.doctorSpecialization || ''} onChange={handleChange} required />
                  {errors.doctorSpecialization && <span className='error-text-upd'>{errors.doctorSpecialization}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorQualifications" className="form-label-upd">Qualifications</label>
                  <input type="text" className="form-input-upd" id="doctorQualifications" name="doctorQualifications" value={inputs.doctorQualifications || ''} onChange={handleChange} />
                  {errors.doctorQualifications && <span className='error-text-upd'>{errors.doctorQualifications}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorExperience" className="form-label-upd">Experience</label>
                  <input type="text" className="form-input-upd" id="doctorExperience" name="doctorExperience" value={inputs.doctorExperience || ''} onChange={handleChange} />
                  {errors.doctorExperience && <span className='error-text-upd'>{errors.doctorExperience}</span>}
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorHospitalAffiliation" className="form-label-upd">Hospital Affiliation</label>
                  <input type="text" className="form-input-upd" id="doctorHospitalAffiliation" name="doctorHospitalAffiliation" value={inputs.doctorHospitalAffiliation || ''} onChange={handleChange} />
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorLicenseNumber" className="form-label-upd">License Number</label>
                  <input type="text" className="form-input-upd" id="doctorLicenseNumber" name="doctorLicenseNumber" value={inputs.doctorLicenseNumber || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="section-upd">
                <label className="sub-head-upd">Communication & Languages</label>
                <div className="form-group-upd">
                  <label htmlFor="doctorLanguagesSpoken" className="form-label-upd">Languages Spoken</label>
                  <input type="text" className="form-input-upd" id="doctorLanguagesSpoken" name="doctorLanguagesSpoken" value={inputs.doctorLanguagesSpoken || ''} onChange={handleChange} />
                </div>
              </div>
              {/* Availability Section */}
              <div className="section-upd">
                <label className="sub-head-upd">Availability</label>
                <div className="form-group-upd">
                  <label htmlFor="doctorAvailableDays" className="form-label-upd">Available Days</label>
                  <input type="text" className="form-input-upd" id="doctorAvailableDays" name="doctorAvailableDays" value={inputs.doctorAvailableDays?.join(", ") || ''} onChange={handleChange} />
                  <small>Enter days separated by commas (e.g., Monday, Tuesday, Wednesday)</small>
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorAvailableTimeStart" className="form-label-upd">Available Time Start</label>
                  <input type="time" className="form-input-upd" id="doctorAvailableTimeStart" name="doctorAvailableTimeStart" value={inputs.doctorAvailableTimeStart || ''} onChange={handleChange} />
                </div>
                <div className="form-group-upd">
                  <label htmlFor="doctorAvailableTimeEnd" className="form-label-upd">Available Time End</label>
                  <input type="time" className="form-input-upd" id="doctorAvailableTimeEnd" name="doctorAvailableTimeEnd" value={inputs.doctorAvailableTimeEnd || ''} onChange={handleChange} />
                </div>
              </div>
              {/* Pricing Section */}
              <div className="section-upd">
                <label className="sub-head-upd">Pricing</label>
                <div className="form-group-upd">
                  <label htmlFor="doctorConsultationFees" className="form-label-upd">Consultation Fees</label>
                  <input type="text" className="form-input-upd" id="doctorConsultationFees" name="doctorConsultationFees" value={inputs.doctorConsultationFees || ''} onChange={handleChange} />
                  {errors.doctorConsultationFees && <span className='error-text-upd'>{errors.doctorConsultationFees}</span>}
                </div>
              </div>
              <button type="submit" className="btn-submit-1-upd">Update Doctor</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  
}

export default UpdateDoctor;
