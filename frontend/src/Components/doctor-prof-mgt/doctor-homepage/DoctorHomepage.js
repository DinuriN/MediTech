import React, { useState, useEffect } from 'react';
import './doctorHomepag.css';
import { Link } from "react-router-dom";
import DoctorInTable from '../doctor-details-in-table/doctorInTable';
import axios from 'axios';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import meditechLogo from '../../Common/common-images/meditech-logo-1.png'; // Adjust path if different


const URL = "http://localhost:5000/doctors";

// Fetching doctors data from API
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DoctorHomepage() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Fetch doctor details on component mount
  useEffect(() => {
    fetchHandler().then((data) => setDoctors(data.doctors));
  }, []);

  // Handle live search functionality for doctor name and doctor ID only
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    fetchHandler().then((data) => {
      const filteredDoctors = data.doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(e.target.value.toLowerCase()) || 
        doctor.doctorId.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDoctors(filteredDoctors);
      setNoResults(filteredDoctors.length === 0);
    });
  };


  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const defaultSelectedFields = ["doctorId", "doctorName", "doctorSpecialization"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of doctors per page
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginatedDoctors = previewData ? previewData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
  
  const [selectedFields, setSelectedFields] = useState(defaultSelectedFields);

  // List of available fields
  const availableFields = [
    { label: "Doctor ID", value: "doctorId" },
    { label: "Name", value: "doctorName" },
    { label: "Specialization", value: "doctorSpecialization" },
    { label: "Phone Number", value: "doctorPhoneNumber" },
    { label: "Email", value: "doctorEmail" },
    { label: "Qualifications", value: "doctorQualifications" },
    { label: "Experience", value: "doctorExperience" },
    { label: "Languages Spoken", value: "doctorLanguagesSpoken" },
    { label: "Hospital Affiliation", value: "doctorHospitalAffiliation" },
    { label: "License Number", value: "doctorLicenseNumber" },
    { label: "Available Days", value: "doctorAvailableDays" },
    { label: "Available Time Start", value: "doctorAvailableTimeStart" },
    { label: "Available Time End", value: "doctorAvailableTimeEnd" },
    { label: "Consultation Fees", value: "doctorConsultationFees" },
  ];

  const toggleFieldSelection = (field) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const generatePreview = () => {
    const preview = doctors.map((doctor) => {
      const filtered = {};
      selectedFields.forEach((field) => {
        filtered[field] = doctor[field];
      });
      return filtered;
    });
    setPreviewData(preview);
  };

  const downloadPDF = () => {
    const doc = new jsPDF("landscape"); // Set orientation to 'landscape'
    
    // Add Logo and Company info
    const imgWidth = 40;
    const imgHeight = 20;
    doc.addImage(meditechLogo, "PNG", 10, 10, imgWidth, imgHeight);
    doc.setFontSize(16);
    doc.text("MEDI TECH LAB", 105, 15, null, null, "center");
    doc.setFontSize(10);
    doc.text("No 43, Bauddhaloka Mawatha, Gampaha.", 105, 22, null, null, "center");
    
    doc.setLineWidth(0.5);
    doc.line(10, 30, 290, 30); // Horizontal line for landscape layout
    
    // Add a page break after the header
    
    // Prepare table with sections
    const tableColumn = selectedFields.map((field) =>
      availableFields.find((f) => f.value === field)?.label || field
    );
    
    const tableRows = doctors.map((doctor) =>
      selectedFields.map((field) => {
        const value = doctor[field] || "-";
        return Array.isArray(value) ? value.join(", ") : value;
      })
    );
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { halign: "center", valign: "middle" },
      headStyles: {
        fillColor: [30, 144, 255],
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      bodyStyles: { fontSize: 9 },
      margin: { top: 40, left: 10, right: 10 },
    });
    
    doc.save("Doctor_Report_Landscape.pdf");
  };
  
  

  const clearSelections = () => {
    setSelectedFields([]);
  };

  const selectAllFields = () => {
    setSelectedFields(availableFields.map((field) => field.value));
  };

  return (
    <div className="doc-prof-container">
      <div className="admin-prof-container">
        <div className="col-1">
          <AdminSideNavBar />
        </div>
        <div className="col-2-d">
          <div className="doctor-home-container-unique">
            <h1>Registered Doctors</h1>
            <input
              onChange={handleSearch}
              type="text"
              className="search-doc-prof"
              name="search"
              value={searchQuery}
              placeholder="Search by Name or Doctor ID"
            />
            <div className="but-2-m-unique">
              <Link to="#">
                <button onClick={() => setShowModal(true)}>Generate report</button>
              </Link>
              <Link to="/doctorsTimetable">
                <button className="time-table-button">View Timetable</button>
              </Link>
              <Link to="/registerADoctor">
                <button>Add doctor</button>
              </Link>
            </div>
          </div>
          <hr />

          {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">Select Fields to Include</h2>
      <div className="field-selection">
        {availableFields.map((field) => (
          <div key={field.value} className="field-selection-item">
            <input
              type="checkbox"
              id={field.value}
              value={field.value}
              checked={selectedFields.includes(field.value)}
              onChange={() => toggleFieldSelection(field.value)}
              className="field-checkbox"
            />
            <label htmlFor={field.value} className="field-label">
              {field.label}
            </label>
          </div>
        ))}
      </div>
      {/* Secondary buttons: Cancel, Clear, Select All */}
      <div className="modal-buttons-row secondary">
        <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
        <button onClick={clearSelections} className="clear-button">Clear</button>
        <button onClick={selectAllFields} className="select-all-button">Select All</button>
      </div>
      {/* Primary buttons: Preview, Download PDF */}
      <div className="modal-buttons-row primary">
        <button onClick={generatePreview} className="preview-button">Preview</button>
        <button onClick={downloadPDF} className="download-button">Download PDF</button>
      </div>
      {previewData && (
        <div className="preview-table">
          <h3>Preview</h3>
          <table className="preview-table-content">
            <thead>
              <tr>
                {selectedFields.map((field) => (
                  <th key={field}>
                    {availableFields.find((f) => f.value === field)?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((doctor, index) => (
                <tr key={index}>
                  {selectedFields.map((field) => (
                    <td key={field}>
                      {Array.isArray(doctor[field])
                        ? doctor[field].join(", ")
                        : doctor[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}



          {/* Pass filtered doctors data to DoctorInTable */}
          <DoctorInTable doctors={doctors} noResults={noResults} />
        </div>
      </div>
    </div>
  );
}

export default DoctorHomepage;
