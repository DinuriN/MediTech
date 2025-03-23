import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './UpdateDoctor.css';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'

function UpdateDoctor() {
  const [inputs, setInputs] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
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

    // Handle the doctorAvailableDays input by splitting the input into an array
    if (name === "doctorAvailableDays") {
      const daysArray = value
        .split(",") // Split by commas
        .map((day) => day.trim()) // Trim any extra spaces
        .filter((day) => day); // Remove any empty days
      setInputs((prevState) => ({
        ...prevState,
        [name]: daysArray, // Store the array in the state
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
    try {
      let updatedDoctor = { ...inputs };

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
      await axios.put(`http://localhost:5000/doctors/${id}`, updatedDoctor);
      navigate("/doctorDetails");
    } catch (err) {
      setError("Failed to update doctor details. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className='admin-prof-container'>
      <div className='col-1'>
        <AdminSideNavBar/>
      </div>
      <div className='col-2-d'>
    <div className="update-body">
      <br /><hr />
      <h1>Update Doctor Details</h1>
      <hr />
      <div className="update-doctor-container">
        <Link to="/doctorDetails">
          <button className="back-btn">Back</button>
        </Link>
        <br /><br /><br />
        <form onSubmit={handleSubmit} className="doctor-form">
  
          {/* Basic Information Section */}
          <div className="section">
            <lable className="sub-head">Basic Information</lable>
  
            <div className="form-group">
              <label htmlFor="doctorId" className="form-label">Doctor ID</label>
              <input type="text" className="form-input" id="doctorId" name="doctorId" value={inputs.doctorId || ''} onChange={handleChange} required />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorName" className="form-label">Name</label>
              <input type="text" className="form-input" id="doctorName" name="doctorName" value={inputs.doctorName || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Doctor Profile Picture</label>
              {inputs.doctorProfilePicture && (
                <div>
                  <img src={`http://localhost:5000${inputs.doctorProfilePicture}`} alt="Current Profile" width="100" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="form-group">
              <label htmlFor="doctorPhoneNumber" className="form-label">Phone Number</label>
              <input type="text" className="form-input" id="doctorPhoneNumber" name="doctorPhoneNumber" value={inputs.doctorPhoneNumber || ''} onChange={handleChange} required />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorEmail" className="form-label">Email</label>
              <input type="email" className="form-input" id="doctorEmail" name="doctorEmail" value={inputs.doctorEmail || ''} onChange={handleChange} required />
            </div>
          </div>
  
        
  
          {/* Professional Information Section */}
          <div className="section">
            <lable className="sub-head">Professional Information</lable>

            <div className="form-group">
              <label htmlFor="doctorSpecialization" className="form-label">Specialization</label>
              <input type="text" className="form-input" id="doctorSpecialization" name="doctorSpecialization" value={inputs.doctorSpecialization || ''} onChange={handleChange} required />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorQualifications" className="form-label">Qualifications</label>
              <input type="text" className="form-input" id="doctorQualifications" name="doctorQualifications" value={inputs.doctorQualifications || ''} onChange={handleChange} />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorExperience" className="form-label">Experience</label>
              <input type="text" className="form-input" id="doctorExperience" name="doctorExperience" value={inputs.doctorExperience || ''} onChange={handleChange} />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorHospitalAffiliation" className="form-label">Hospital Affiliation</label>
              <input type="text" className="form-input" id="doctorHospitalAffiliation" name="doctorHospitalAffiliation" value={inputs.doctorHospitalAffiliation || ''} onChange={handleChange} />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorLicenseNumber" className="form-label">License Number</label>
              <input type="text" className="form-input" id="doctorLicenseNumber" name="doctorLicenseNumber" value={inputs.doctorLicenseNumber || ''} onChange={handleChange} />
            </div>
          </div>

          
          <div className="section">
            <lable className="sub-head">Communication & Languages</lable>
            <div className="form-group">
              <label htmlFor="doctorLanguagesSpoken" className="form-label">Languages Spoken</label>
              <input type="text" className="form-input" id="doctorLanguagesSpoken" name="doctorLanguagesSpoken" value={inputs.doctorLanguagesSpoken || ''} onChange={handleChange} />
            </div>            
          </div>
  
          {/* Availability Section */}
          <div className="section">
            <lable className="sub-head">Availability</lable>
  
            <div className="form-group">
              <label htmlFor="doctorAvailableDays" className="form-label">Available Days</label>
              <input type="text" className="form-input" id="doctorAvailableDays" name="doctorAvailableDays" value={inputs.doctorAvailableDays?.join(", ") || ''} onChange={handleChange} />
              <small>Enter days separated by commas (e.g., Monday, Tuesday, Wednesday)</small>
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorAvailableTimeStart" className="form-label">Available Time Start</label>
              <input type="time" className="form-input" id="doctorAvailableTimeStart" name="doctorAvailableTimeStart" value={inputs.doctorAvailableTimeStart || ''} onChange={handleChange} />
            </div>
  
            <div className="form-group">
              <label htmlFor="doctorAvailableTimeEnd" className="form-label">Available Time End</label>
              <input type="time" className="form-input" id="doctorAvailableTimeEnd" name="doctorAvailableTimeEnd" value={inputs.doctorAvailableTimeEnd || ''} onChange={handleChange} />
            </div>
          </div>
  
          {/* Pricing Section */}
          <div className="section">
            <lable className="sub-head">Pricing</lable>
  
            <div className="form-group">
              <label htmlFor="doctorConsultationFees" className="form-label">Consultation Fees</label>
              <input type="text" className="form-input" id="doctorConsultationFees" name="doctorConsultationFees" value={inputs.doctorConsultationFees || ''} onChange={handleChange} />
            </div>
          </div>
  
          <button type="submit" className="btn-submit-1">Update Doctor</button>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
  
}

export default UpdateDoctor;
