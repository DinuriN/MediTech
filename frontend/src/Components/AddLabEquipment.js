import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For Bootstrap icons
import "./AddLabEquipment.css"; // Custom CSS for modern styling

function AddLabEquipment() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    EquipmentId: "",
    EquipmentName: "",
    EquipmentCategory: "",
    EquipmentBrand: "",
    EquipmentSerialNum: "",
    EquipmentLocation: "",
    EquipmentCost: "",
    EquipmentLastMaintenance: "",
    EquipmentNextMaintenance: "",
    status: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkDuplicateId = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/labEquipments");
      const existingIds = response.data.labEquipments.map((equipment) => equipment.EquipmentId);
      return existingIds.includes(id);
    } catch (error) {
      console.error("Error checking duplicate ID:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = await checkDuplicateId(inputs.EquipmentId);
    if (isDuplicate) {
      setErrorMessage("Equipment ID already exists. Please use a different ID.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/labEquipments", inputs);
      navigate("/labEquipmentDetails");
    } catch (error) {
      console.error("Error adding lab equipment:", error);
      setErrorMessage("An error occurred while adding the equipment.");
    }
  };

  return (
    <div className="add-lab-equipment-container">
      <h1 className="text-center mb-4">Add Lab Equipment</h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="row">
          {/* Equipment ID */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentId" className="form-label">
              <i className="bi bi-tag"></i> Equipment ID:
            </label>
            <input
              type="text"
              id="EquipmentId"
              name="EquipmentId"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentId}
              required
            />
          </div>

          {/* Equipment Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentName" className="form-label">
              <i className="bi bi-tools"></i> Equipment Name:
            </label>
            <input
              type="text"
              id="EquipmentName"
              name="EquipmentName"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentName}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Equipment Category */}
<div className="col-md-6 mb-3">
<label htmlFor="EquipmentCategory" className="form-label">
  <i className="bi bi-grid"></i> Equipment Category:
</label>
<select
  id="EquipmentCategory"
  name="EquipmentCategory"
  className="form-control"
  onChange={handleChange}
  value={inputs.EquipmentCategory}
  required
>
  <option value="Analytical Instruments">Analytical Instruments</option>
  <option value="Diagnostic Equipment">Diagnostic Equipment</option>
  <option value="Sample Processing Equipment">Sample Processing Equipment</option>
  <option value="Storage and Preservation Equipment">Storage and Preservation Equipment</option>
  <option value="General Laboratory Equipment">General Laboratory Equipment</option>
  <option value="Cleaning and Safety Equipment">Cleaning and Safety Equipment</option>
  <option value="Support and Utility Equipment">Support and Utility Equipment</option>
</select>
</div>


          {/* Equipment Brand */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentBrand" className="form-label">
              <i className="bi bi-building"></i> Equipment Brand:
            </label>
            <input
              type="text"
              id="EquipmentBrand"
              name="EquipmentBrand"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentBrand}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Equipment Serial Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentSerialNum" className="form-label">
              <i className="bi bi-upc-scan"></i> Equipment Serial Number:
            </label>
            <input
              type="text"
              id="EquipmentSerialNum"
              name="EquipmentSerialNum"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentSerialNum}
              required
            />
          </div>

          {/* Equipment Location */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentLocation" className="form-label">
              <i className="bi bi-geo-alt"></i> Equipment Location:
            </label>
            <input
              type="text"
              id="EquipmentLocation"
              name="EquipmentLocation"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentLocation}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Equipment Cost */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentCost" className="form-label">
              <i className="bi bi-cash"></i> Equipment Cost:
            </label>
            <input
              type="number"
              id="EquipmentCost"
              name="EquipmentCost"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentCost}
              required
            />
          </div>

          {/* Last Maintenance Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentLastMaintenance" className="form-label">
              <i className="bi bi-calendar"></i> Last Maintenance Date:
            </label>
            <input
              type="date"
              id="EquipmentLastMaintenance"
              name="EquipmentLastMaintenance"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentLastMaintenance}
            />
          </div>
        </div>

        <div className="row">
          {/* Next Maintenance Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="EquipmentNextMaintenance" className="form-label">
              <i className="bi bi-calendar-check"></i> Next Maintenance Date:
            </label>
            <input
              type="date"
              id="EquipmentNextMaintenance"
              name="EquipmentNextMaintenance"
              className="form-control"
              onChange={handleChange}
              value={inputs.EquipmentNextMaintenance}
              required
            />
          </div>

          {/* Status */}
<div className="col-md-6 mb-3">
<label htmlFor="status" className="form-label">
  <i className="bi bi-info-circle"></i> Status:
</label>
<select
  id="status"
  name="status"
  className="form-control"
  onChange={handleChange}
  value={inputs.status}
  required
>
  <option value="Available">Available</option>
  <option value="Not Available">Not Available</option>
  <option value="Under Maintained">Under Maintained</option>
</select>
</div></div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add Equipment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLabEquipment;