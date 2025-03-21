import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './SingleDoctorDetails.css'

function Doctor({ doctor, index }) {
    const {_id,
        doctorId,
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
        doctorConsultationFees } =doctor;

        // Handle doctorAvailableDays
        const formattedDays = Array.isArray(doctorAvailableDays)
        ? doctorAvailableDays.join(", ") // Join array elements with a comma
        : typeof doctorAvailableDays === "string"
        ? doctorAvailableDays.split(/(?=[A-Z])/).join(", ") // Split and format strings like "MonWedFri"
        : "N/A"; // Fallback for unexpected data types

        // Format time
        const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const hourNum = parseInt(hour);
        const isPM = hourNum >= 12;
        const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        return `${formattedHour.toString().padStart(2, "0")}:${minute} ${isPM ? "PM" : "AM"}`;
        };

        const formattedStartTime = formatTime(doctorAvailableTimeStart);
        const formattedEndTime = formatTime(doctorAvailableTimeEnd);

        const history = useNavigate();

        const deleteHandler = async () => {
            const confirmed = window.confirm("Are you sure you want to delete this doctor?");
            if (confirmed) {
              try {
                await axios.delete(`http://localhost:5000/doctors/${_id}`);
                history("/"); // Navigate back to the homepage or desired route
                history("/doctorDetails"); // Navigate to the doctor details page if needed
              } catch (err) {
                alert("Failed to delete the doctor. Please try again.");
              }
            }
          };
          

  return (
    <tr className="doctorRow">
      <td className='tableData'>{index + 1}</td>
      <td className='tableData'>{doctorId}</td>
      <td className='tableData'>{doctorName}</td>
      <td className='tableData'>{doctorSpecialization}</td>
      <td className='tableData'>{doctorPhoneNumber}</td>
      <td className='tableData'>{formattedDays}</td>
      <td className='tableData'>{formattedStartTime}</td>
      <td className='tableData'>{formattedEndTime}</td>
      <td className='tableData'>LKR {doctorConsultationFees} /=</td>
      <td className='actionButtons'>
        <Link to={`/doctorProfile/${_id}`}>
        <button className="btno-view-more">View More</button>
        </Link>
        <Link to={`/doctordetails/${_id}`}>
        <button className="btno-update">Update</button>
        </Link>
        <button onClick={deleteHandler} className="btno-delete">Delete</button>
      </td>
    </tr>
  )
}

export default Doctor
