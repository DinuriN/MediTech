import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./DoctorProfileForViewMore.css"
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // import as a function

function DoctorProfileForViewMore() {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${id}`);
        setDoctorDetails(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  const {
    doctorId,
    doctorName,
    doctorAddress,
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

  const formatCommaSeparatedValues = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    } else if (typeof value === "string") {
      return value.split(/(?=[A-Z])/).join(", ");
    } else {
      return "N/A";
    }
  };

  const formattedAvailableDays = formatCommaSeparatedValues(doctorAvailableDays);
  const formattedLanguagesSpoken = formatCommaSeparatedValues(doctorLanguagesSpoken);

  const formatDoctorTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const isPM = hourNum >= 12;
    const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${isPM ? "PM" : "AM"}`;
  };

  const formattedStartTime = formatDoctorTime(doctorAvailableTimeStart);
  const formattedEndTime = formatDoctorTime(doctorAvailableTimeEnd);

  const handleGeneratePDF = async () => {
    const doc = new jsPDF();

    let imageUrl = `http://localhost:5000${doctorProfilePicture}`;
    let imageData;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        imageData = reader.result;

        doc.setFontSize(18);
        doc.text(`${doctorName}'s Profile`, 14, 20);

        doc.addImage(imageData, 'JPEG', 150, 10, 40, 40);

        doc.setFontSize(12);
        autoTable(doc, {
          startY: 60,
          head: [['Field', 'Value']],
          body: [
            ['Doctor ID', doctorId || 'N/A'],
            ['Name', doctorName || 'N/A'],
            ['Specialization', doctorSpecialization || 'N/A'],
            ['Address', doctorAddress || 'N/A'],
            ['Phone Number', doctorPhoneNumber || 'N/A'],
            ['Email', doctorEmail || 'N/A'],
            ['Qualifications', formatCommaSeparatedValues(doctorQualifications)],
            ['Experience', doctorExperience ? `${doctorExperience} years` : 'N/A'],
            ['Languages Spoken', formattedLanguagesSpoken],
            ['Hospital Affiliation', doctorHospitalAffiliation || 'N/A'],
            ['License Number', doctorLicenseNumber || 'N/A'],
            ['Available Days', formattedAvailableDays],
            ['Available Time', `${formattedStartTime} - ${formattedEndTime}`],
            ['Consultation Fees', doctorConsultationFees ? `LKR ${doctorConsultationFees} /=` : 'N/A'],
          ]
        });

        doc.save(`${doctorName}_profile.pdf`);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };

  return (
    <div className='admin-prof-container'>
      <div className='col-1'>
        <AdminSideNavBar/>
      </div>
      <div className='col-2-d'>
        <div className="container-dpfvm">
          <br />
          <div className="doctor-profile-dpfvm">
            <div>
              <h2 className="text-center mb-4">{doctorName}'s Profile</h2>
            </div>
            <img
              src={`http://localhost:5000${doctorProfilePicture}`}
              alt={doctorName}
              className="img-fluid"
              onError={(e) => e.target.src = "http://localhost:5000/uploads/doc-prof-profile-pictures/default-profile.jpg"}
            />
            <h4>Specialization: {doctorSpecialization}</h4>
            <p><strong>Doctor ID:</strong> {doctorId}</p>
            <p><strong>Doctor Address:</strong> {doctorAddress}</p>
            <p><strong>Phone Number:</strong> {doctorPhoneNumber}</p>
            <p><strong>Email:</strong> {doctorEmail}</p>
            <p><strong>Qualifications:</strong> {doctorQualifications}</p>
            <p><strong>Experience:</strong> {doctorExperience} years</p>
            <p><strong>Languages Spoken:</strong> {formattedLanguagesSpoken}</p>
            <p><strong>Hospital Affiliation:</strong> {doctorHospitalAffiliation}</p>
            <p><strong>License Number:</strong> {doctorLicenseNumber}</p>
            <p><strong>Available Days:</strong> {formattedAvailableDays}</p>
            <p><strong>Available Time:</strong> {formattedStartTime} - {formattedEndTime}</p>
            <p><strong>Consultation Fees:</strong> LKR {doctorConsultationFees} /=</p>
            <div className="btn-group-vertical-dpfvm">
              <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF Report</button>
              <button className="btn-secondary-dpfvm" onClick={() => navigate("/doctorDetails")}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfileForViewMore;
