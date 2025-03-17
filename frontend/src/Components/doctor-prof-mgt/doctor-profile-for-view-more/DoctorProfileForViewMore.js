import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./DoctorProfileForViewMore.css"

function DoctorProfileForViewMore() {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const { id } = useParams();  // Keeping the variable name `id` as per your preference
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${id}`);
        setDoctorDetails(response.data.doctor); // Keeping the variable name `doctorDetails`
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctorDetails) {
    return <div>Loading...</div>;  // Show loading while data is being fetched
  }

  const {
    doctorName,
    doctorSpecialization,
    doctorProfilePicture,
    doctorPhoneNumber,
    doctorEmail,
    doctorQualifications,
    doctorExperience,
    doctorLanguagesSpoken,
    doctorHospitalAffiliation,
    doctorLicenseNumber,
    doctorAvailableDays,
    doctorAvailableTimeStart,
    doctorAvailableTimeEnd,
    doctorConsultationFees
  } = doctorDetails;

  const formattedAvailableDays = Array.isArray(doctorAvailableDays)
    ? doctorAvailableDays.join(", ")
    : typeof doctorAvailableDays === "string"
    ? doctorAvailableDays.split(/(?=[A-Z])/).join(", ")
    : "N/A";

  const formatDoctorTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const isPM = hourNum >= 12;
    const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${isPM ? "PM" : "AM"}`;
  };

  const formattedStartTime = formatDoctorTime(doctorAvailableTimeStart);
  const formattedEndTime = formatDoctorTime(doctorAvailableTimeEnd);

  return (
    <div className="container">
      <br />
      <hr/>
      <h2 className="text-center mb-4">{doctorName}'s Profile</h2>
      <hr/>
      <div className="doctor-profile">
      <img
  src={`http://localhost:5000${doctorProfilePicture}`}
  alt={doctorName}
  className="img-fluid"
  onError={(e) => e.target.src = "http://localhost:5000/uploads/doc-prof-profile-pictures/default-profile.jpg"} // Fallback image
/>
        <h3>Specialization: {doctorSpecialization}</h3>
        <p><strong>Phone Number:</strong> {doctorPhoneNumber}</p>
        <p><strong>Email:</strong> {doctorEmail}</p>
        <p><strong>Qualifications:</strong> {doctorQualifications}</p>
        <p><strong>Experience:</strong> {doctorExperience} years</p>
        <p><strong>Languages Spoken:</strong> {doctorLanguagesSpoken}</p>
        <p><strong>Hospital Affiliation:</strong> {doctorHospitalAffiliation}</p>
        <p><strong>License Number:</strong> {doctorLicenseNumber}</p>
        <p><strong>Available Days:</strong> {formattedAvailableDays}</p>
        <p><strong>Available Time:</strong> {formattedStartTime} - {formattedEndTime}</p>
        <p><strong>Consultation Fees:</strong> LKR {doctorConsultationFees} /=</p>
        <button className="btn btn-secondary" onClick={() => navigate("/doctorDetails")}>Back</button>
      </div>
    </div>
  );
}

export default DoctorProfileForViewMore;
