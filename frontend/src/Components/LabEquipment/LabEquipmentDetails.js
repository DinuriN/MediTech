import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./LabEquipmentDetails.css";
import AdminSideNavBar from '../Common/AdminProfile/AdminSideNavBar';
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
  const [searchField, setSearchField] = useState("EquipmentId");
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

    const filtered = labEquipments.filter((equipment) => {
      const value = equipment[searchField];
      if (!value) return false;
      // For dates, format before searching
      if (
        searchField === "EquipmentLastMaintenance" ||
        searchField === "EquipmentNextMaintenance"
      ) {
        return formatDate(value).toLowerCase().includes(query);
      }
      return value.toString().toLowerCase().includes(query);
    });
    setFilteredEquipments(filtered);
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
    setSearchQuery(""); // Clear search when changing field
    setFilteredEquipments(labEquipments); // Reset filter
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
    doc.text("MEDI TECH", 14, 15);
    doc.setFontSize(12);
    doc.text("123 Main Street, Colombo, Sri Lanka", 14, 22);
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
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 48,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [44, 62, 80] }
    });

    // Save PDF
    doc.save("Lab_Equipment_Details.pdf");
  };

  // Helper for placeholder
  const fieldLabels = {
    EquipmentId: "ID",
    EquipmentName: "Name",
    EquipmentCategory: "Category",
    EquipmentBrand: "Brand",
    EquipmentSerialNum: "Serial Number",
    EquipmentLocation: "Location",
    EquipmentCost: "Cost",
    EquipmentLastMaintenance: "Last Maintenance",
    EquipmentNextMaintenance: "Next Maintenance",
    status: "Status"
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

          {/* Search by dropdown and input */}
          <div className="search-bar-container" style={{display: "flex", gap: "8px", marginBottom: "15px"}}>
            <select
              value={searchField}
              onChange={handleFieldChange}
              className="form-select"
              style={{ maxWidth: "180px" }}
            >
              <option value="EquipmentId">ID</option>
              <option value="EquipmentName">Name</option>
              <option value="EquipmentCategory">Category</option>
              <option value="EquipmentBrand">Brand</option>
              <option value="EquipmentSerialNum">Serial Number</option>
              <option value="EquipmentLocation">Location</option>
              <option value="EquipmentCost">Cost</option>
              <option value="EquipmentLastMaintenance">Last Maintenance</option>
              <option value="EquipmentNextMaintenance">Next Maintenance</option>
              <option value="status">Status</option>
            </select>
            <input
              type="text"
              className="search-bar"
              placeholder={`Search by ${fieldLabels[searchField]}`}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="lab-equipment-table-container">
          <div className="table-responsive lab-table-scroll-wrapper">
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