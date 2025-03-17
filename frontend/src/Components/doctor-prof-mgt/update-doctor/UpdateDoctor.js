import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './UpdateDoctor.css';

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
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        }      }

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
    <div className="update-body">
      <br/><hr/>
      <h1>Update Doctor Details</h1>
      <hr/>
      <div className="update-doctor-container">
        <Link to='/doctorDetails'>
          <button className='back-btn'>Back</button>
        </Link>
        <br/><br/><br/>
        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-group">
            <label htmlFor="doctorId" className="form-label">Doctor ID</label>
            <input type="text" className="form-input" id="doctorId" name="doctorId" value={inputs.doctorId || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="doctorName" className="form-label">Name</label>
            <input type="text" className="form-input" id="doctorName" name="doctorName" value={inputs.doctorName || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="doctorSpecialization" className="form-label">Specialization</label>
            <input type="text" className="form-input" id="doctorSpecialization" name="doctorSpecialization" value={inputs.doctorSpecialization || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
  <label>Doctor Profile Picture</label>
  
  {/* Show Current Profile Picture */}
  {inputs.doctorProfilePicture && (
    <div>
      <img src={`http://localhost:5000${inputs.doctorProfilePicture}`} alt="Current Profile" width="100" />
    </div>
  )}

  {/* Upload New Picture */}
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

          <div className="form-group">
            <label htmlFor="doctorAvailableTimeStart" className="form-label">Available Time Start</label>
            <input type="time" className="form-input" id="doctorAvailableTimeStart" name="doctorAvailableTimeStart" value={inputs.doctorAvailableTimeStart || ''} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="doctorAvailableTimeEnd" className="form-label">Available Time End</label>
            <input type="time" className="form-input" id="doctorAvailableTimeEnd" name="doctorAvailableTimeEnd" value={inputs.doctorAvailableTimeEnd || ''} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-submit">Update Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDoctor;
