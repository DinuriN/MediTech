import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./LabEquipmentDetails.css"; // Custom CSS for modern styling

const URL = "http://localhost:5000/labEquipments";

// Function to fetch lab equipment data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Function to format date
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

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter equipment based on search query
    const filtered = labEquipments.filter(
      (equipment) =>
        equipment.EquipmentName.toLowerCase().includes(query) ||
        equipment.EquipmentId.toLowerCase().includes(query)
    );
    setFilteredEquipments(filtered);
  };

  // Function to handle status or location change
  const handleUpdate = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:5000/labEquipments/${id}`, {
        [field]: value,
      });

      // Update the local state after a successful update
      setLabEquipments((prevEquipments) =>
        prevEquipments.map((equipment) =>
          equipment._id === id ? { ...equipment, [field]: value } : equipment
        )
      );

      setFilteredEquipments((prevEquipments) =>
        prevEquipments.map((equipment) =>
          equipment._id === id ? { ...equipment, [field]: value } : equipment
        )
      );
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  // Function to delete an equipment entry
  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this equipment?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:5000/labEquipments/${id}`).then(() => {
        const updatedEquipments = labEquipments.filter((equipment) => equipment._id !== id);
        setLabEquipments(updatedEquipments);
        setFilteredEquipments(updatedEquipments);
      });
    }
  };

  return (
    <div className="lab-equipment-container">
      <h1 className="mainHead">LAB EQUIPMENT DETAILS</h1>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>


      {/* Navigation Button to Add Lab Equipment */}
      <div className="text-end mb-4">
        <Link to="/addLabEquipment" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add New Equipment
        </Link>
      </div>

      </div>

      {/* Equipment Table */}
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Equipment ID</th>
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
            {filteredEquipments.map((equipment) => (
              <tr key={equipment._id}>
                <td>{equipment.EquipmentId}</td>
                <td>{equipment.EquipmentName}</td>
                <td>{equipment.EquipmentCategory}</td>
                <td>{equipment.EquipmentBrand}</td>
                <td>{equipment.EquipmentSerialNum}</td>
                
                {/* Location Dropdown */}
                <td>
                  <select
                    className="form-select"
                    value={equipment.EquipmentLocation}
                    onChange={(e) => handleUpdate(equipment._id, "EquipmentLocation", e.target.value)}
                  >
                    <option value="Lab A">Lab A</option>
                    <option value="Lab B">Lab B</option>
                    <option value="Lab C">Lab C</option>
                    <option value="Lab D">Lab D</option>
                    <option value="Lab E">Lab E</option>
                  </select>
                </td>

                <td>{equipment.EquipmentCost}</td>
                <td>{formatDate(equipment.EquipmentLastMaintenance)}</td>
                <td>{formatDate(equipment.EquipmentNextMaintenance)}</td>
                
                {/* Status Dropdown */}
                <td>
                  <select
                    className="form-select"
                    value={equipment.status}
                    onChange={(e) => handleUpdate(equipment._id, "status", e.target.value)}
                  >
                  <option value="Available">Available</option>
                  <option value="Not Available">In Use</option>
                  <option value="Under Maintained">Under Maintained</option>
                  </select>
                </td>

                <td>
                  <Link to={`/updateLabEquipment/${equipment._id}`} className="btn btn-warning btn-sm me-2">
                    <i className="bi bi-pencil"></i> 
                  </Link>
                  <button
                    onClick={() => deleteHandler(equipment._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LabEquipmentDetails;
