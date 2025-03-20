import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../Common/AdminProfile/AdminProfileSample.css";
import AdminSideNavBar from '../Common/AdminProfile/AdminSideNavBar';

const URL = "http://localhost:5000/patients";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  

function PatientDetails() {

    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetchHandler().then((data) => setPatients(data.patients));
      }, []);

      const deleteHandler = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (confirmDelete) {
          await axios
            .delete(`http://localhost:5000/patients/${id}`)
            .then(() =>
              setPatients(patients.filter((patient) => patient._id !== id))
            );
        }
      };  

      const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    
        fetchHandler().then((data) => {
          const filteredPatients = data.patients.filter((patient) =>
            patient.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
            patient.patientId.toLowerCase().includes(e.target.value.toLowerCase())  // Search by doctorName and doctorId
          );
          setPatients(filteredPatients);
          setNoResults(filteredPatients.length === 0);
        });
      };

  return (
    <div className="admin-prof-container">
      <div className='col-1'>
            <AdminSideNavBar />

        </div> 
        <div className='col-2'>
      <h1>Patient Details</h1>
      <div className='addPatient-button'>
      <Link to ="/addPatient" className="active home-a">
            <button className="btn btn-success" style={{ marginBottom: "10px"}}>Add patient</button>
        </Link>
        </div>

        <div className="d-flex mb-3">
        <input
        className="form-control rounded"
          onChange={handleSearch}
          type="text"
          name="search"
          value={searchQuery}
          placeholder="Search Patient"
        />
        </div>

        <div className='patientDetails-table'>
            <table className='table'>
            <thead class="table-success">
            <tr>
              <th>ID</th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {patients &&
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient._id}</td>
                  <td>{patient.patientId}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.contactNo}</td>
                  <td>{patient.address}</td>
                  <td>
                  <Link to={`/medicalHistoryDetails/${patient._id}`}><button class="btn btn-success" >Medical Records</button></Link>
                    
                    <Link
                      to={`/updatePatient/${patient._id}`}
                      style={{ marginRight: "10px", marginLeft: "10px" }}
                    >
                      <button type="button" class="btn btn-primary">
                        Update
                      </button>
                      </Link>
                    <button
                    onClick={() => deleteHandler(patient._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>

        </div>

    </div>
  );
}

export default PatientDetails;
