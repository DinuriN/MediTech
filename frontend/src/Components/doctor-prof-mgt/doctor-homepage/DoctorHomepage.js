import React, { useState, useEffect } from 'react';
import './doctorHomepag.css';
import { Link } from "react-router-dom";
import DoctorInTable from '../doctor-details-in-table/doctorInTable';
import axios from 'axios';
import AdminSideNavBar from '../../Common/AdminProfile/AdminSideNavBar'
import '../../Common/AdminProfile/AdminProfileSample.css'

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

  return (
    <div className='doc-prof-container'>

    <div className='admin-prof-container'>
      <div className='col-1'>
        <AdminSideNavBar/>
      </div>
      <div className='col-2-d'>
        <div className="doctor-home-container-unique">
          <h1>Registered Doctors</h1>
          <input
            onChange={handleSearch}
            type="text"
            name="search"
            value={searchQuery}
            placeholder="Search by Name or Doctor ID"
          />
          <div className='but-2-m-unique'>
            <Link to="/doctorsTimetable">
              <button className='time-table-button'>View Timetable</button>
            </Link>
            <Link to="/registerADoctor">
              <button>Add doctor</button>
            </Link>
          </div>
        </div>
        <hr />
        {/* Pass filtered doctors data to DoctorInTable */}
        <DoctorInTable doctors={doctors} noResults={noResults} />
      </div>
    </div>
    </div>
  );
}

export default DoctorHomepage;
