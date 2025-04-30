import React, { useState, useEffect } from 'react'; 
import axios from "axios"; // Importing axios for making HTTP requests
import Appointment from '../Appoinment/Appoinment'; 
import './Appoinments.css';

import AdminSideNavBar from "../Common/AdminProfile/AdminSideNavBar";

const URL = "http://localhost:5000/appointments"; // API endpoint to fetch appointments

// Function to fetch appointments data from the backend
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data); // Sending GET request and returning the response data
};

function Appointments() {
  // State hook to store the fetched appointments
  const [appointments, setAppointments] = useState([]); 
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchService, setSearchService] = useState('');

  // Using useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchHandler().then((data) => {
      setAppointments(data.appointments);
      setFilteredAppointments(data.appointments);
    }); 
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle search
  const handleSearch = () => {
    let filtered = [...appointments];

    if (searchDate) {
      filtered = filtered.filter(appointment => 
        appointment.appointmentDate.split('T')[0] === searchDate
      );
    }

    if (searchService) {
      filtered = filtered.filter(appointment => 
        appointment.appointmentType === searchService
      );
    }

    setFilteredAppointments(filtered);
  };

  // Function to reset filters
  const handleReset = () => {
    setSearchDate('');
    setSearchService('');
    setFilteredAppointments(appointments);
  };

  return (
    <div className="admin-dashboard">
        <div className="col-1">
          <AdminSideNavBar />
        </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Appointment Management</h1>
          <div className="search-section">
            <div className="search-inputs">
              <div className="search-group">
                <label>Search by Date:</label>
                <input 
                  type="date" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="search-group">
                <label>Filter by Appointment Type:</label>
                <select 
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                >
                  <option value="">All Appointment Types</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Scan">Scan</option>
                </select>
              </div>
            </div>
            <div className="search-buttons">
              <button onClick={handleSearch} className="search-button">Search</button>
              <button onClick={handleReset} className="reset-button">Reset Filters</button>
            </div>
          </div>
        </div>

        <div className="appointments-section">
          <div className="appointments-header">
            <h2>Appointment Details</h2>
            <span className="appointment-count">
              {filteredAppointments.length} {filteredAppointments.length === 1 ? 'Appointment' : 'Appointments'}
            </span>
          </div>
          <div className="appointments-list">
            {filteredAppointments && filteredAppointments.map((appointment, i) => ( 
              <div key={i}> 
                <Appointment appointment={appointment} /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments; 