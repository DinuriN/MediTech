import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./LabEquipmentDetails.css";
import AdminSideNavBar from './AdminSideNavBar';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


const URL = "http://localhost:5000/labEquipments";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

function LabEquipmentDetails() {
  const [labEquipments, setLabEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEquipments, setFilteredEquipments] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      setLabEquipments(data.labEquipments);
      setFilteredEquipments(data.labEquipments);
    });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = labEquipments.filter(
      (equipment) =>
        equipment.EquipmentName.toLowerCase().includes(query) ||
        equipment.EquipmentId.toLowerCase().includes(query)
    );
    setFilteredEquipments(filtered);
  };

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this equipment?");
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:5000/labEquipments/${id}`)
        .then(() => {
          const updatedEquipments = labEquipments.filter((equipment) => equipment._id !== id);
          setLabEquipments(updatedEquipments);
          setFilteredEquipments(updatedEquipments);
        });
    }
  };


  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Company Details and Report Name
    doc.setFontSize(16);
    doc.text("Your Company Name", 14, 15);
    doc.setFontSize(12);
    doc.text("123 Main Street, City, Country", 14, 22);
    doc.text("Phone: +1 234 567 890", 14, 28);
    doc.setFontSize(14);
    doc.text("Lab Equipment Details Report", 14, 40);
  
    // Prepare table data
    const tableColumn = [
      "ID", "Name", "Category", "Brand", "Serial Number", "Location",
      "Cost", "Last Maintenance", "Next Maintenance", "Status"
    ];
    const tableRows = filteredEquipments.map(equipment => [
      equipment.EquipmentId,
      equipment.EquipmentName,
      equipment.EquipmentCategory,
      equipment.EquipmentBrand,
      equipment.EquipmentSerialNum,
      equipment.EquipmentLocation,
      equipment.EquipmentCost,
      formatDate(equipment.EquipmentLastMaintenance),
      formatDate(equipment.EquipmentNextMaintenance),
      equipment.status
    ]);
  
    // Add table using autoTable()
    autoTable(doc, {  // <-- Changed here
      head: [tableColumn],
      body: tableRows,
      startY: 48,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [44, 62, 80] }
    });
  
    // Save PDF
    doc.save("Lab_Equipment_Details.pdf");
  };
  


  return (
    <div className="admin-prof-container">
      <div className="side-navbar">
        <AdminSideNavBar />
      </div>
      <div className="main-content">
        <div className="lab-equipment-header">
          <h1>Lab Equipment Details</h1>
          <div className="top-action-bar">
            <button
              className="btn-red"
              onClick={() => navigate('/chatbot')}
            >
              <i className="bi bi-robot"></i> AI Troubleshooting Assistant
            </button>
            <Link to="/addLabEquipment" className="btn-blue">
              <i className="bi bi-plus-circle"></i> Add New Equipment
            </Link>
          </div>
          
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name, ID"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="lab-equipment-table-container">
          <div className="table-responsive">
            <table className="table table-hover table-striped lab-equipment-table">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Serial Number</th>
                  <th>Location</th>
                  <th>Cost</th>
                  <th>Last Maintenance</th>
                  <th>Next Maintenance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="table table-hover table-striped lab-equipment-table">
                <tbody>
                  {filteredEquipments.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center text-muted py-4">
                        No equipment found.
                      </td>
                    </tr>
                  ) : (
                    filteredEquipments.map((equipment) => (
                      <tr key={equipment._id}>
                        <td>{equipment.EquipmentId}</td>
                        <td>{equipment.EquipmentName}</td>
                        <td>{equipment.EquipmentCategory}</td>
                        <td>{equipment.EquipmentBrand}</td>
                        <td>{equipment.EquipmentSerialNum}</td>
                        <td>{equipment.EquipmentLocation}</td>
                        <td>{equipment.EquipmentCost}</td>
                        <td>{formatDate(equipment.EquipmentLastMaintenance)}</td>
                        <td>{formatDate(equipment.EquipmentNextMaintenance)}</td>
                        <td>{equipment.status}</td>
                        <td>
                          <Link
                            to={`/updateLabEquipment/${equipment._id}`}
                            className="btn btn-warning btn-sm me-2"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            onClick={() => deleteHandler(equipment._id)}
                            className="btn btn-danger btn-sm"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
           

          </div>
        </div>
        <div className="download-btn-container">
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          <i className="bi bi-download"></i> Download Lab Equipment Details (PDF)
        </button>
      </div>
        
      </div>
    </div>
  );
}

export default LabEquipmentDetails;
