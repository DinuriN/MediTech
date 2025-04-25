import axios from "axios";
import React, { use, useEffect, useRef, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import AdminSideNavBar from "../Common/AdminProfile/AdminSideNavBar";
import "../Common/AdminProfile/AdminProfileSample.css";
import "../Patients/PatientDetails.css";
import DeleteIcon from "../Patients/delete-icon-dinuri.png";

const URL = "http://Localhost:5000/medicalHistory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MedicalHistoryDetails() {
  const { patientId } = useParams();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [originalMedicalHistory, setOriginalMedicalHistory] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      const filteredHistory = data.medicalHistory.filter(
        (history) => history.patientId === patientId
      );

      const sortedHistory = filteredHistory.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setMedicalHistory(filteredHistory);
      setOriginalMedicalHistory(sortedHistory);
    });
  }, [patientId]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filteredMedicalRecords = originalMedicalHistory.filter(
      (medHistory) =>
        medHistory._id.toLowerCase().includes(e.target.value.toLowerCase()) ||
        medHistory.appointmentDate
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setMedicalHistory(filteredMedicalRecords);
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://Localhost:5000/medicalHistory/${id}`)
        .then(() =>
          setMedicalHistory(
            medicalHistory.filter((medHistory) => medHistory._id !== id)
          )
        );
    }
  };

  const copyToClipboard = (copyId) => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.value = copyId;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setCopiedId(copyId);

    setTimeout(() => {
      setCopiedId(false);
    }, 1000);
  };

  return (
    <div>
      <div className="admin-prof-container">
        <div className="col-1">
          <AdminSideNavBar />
        </div>
        <div className="col-2">
          <h2>Medical History of Patient {patientId}</h2>
          <hr />

          <div className="search-and-btn-med-recs">
            <div className="d-flex mb-3">
              <input
                className="patient-searchbar-top-right"
                onChange={handleSearch}
                type="text"
                name="search"
                value={searchQuery}
                placeholder="Search Medical Record"
              />
            </div>
            <div className="add-new-med-rec">
              <Link to={`/addMedicalHistory/${patientId}`}>
                <button
                  className="btn-add-patient"
                  style={{ marginBottom: "10px" }}
                >
                  Add New Record
                </button>
              </Link>
            </div>
          </div>

          {/*Medical History Table */}
          <div className="patientDetails-table">
            <table className="table-med-history-details-tbl">
              <thead className="table-med-history-details-tbl-thead">
                <tr>
                  <th>Visit ID</th>
                  <th></th>
                  <th>Appointment Date</th>
                  <th>appointment Time</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Diagnoses</th>
                  <th>Required Reports</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {medicalHistory.length > 0 ? (
                  medicalHistory.map((medHistory) => (
                    <tr key={medHistory._id}>
                      <td>{medHistory._id}</td>
                      <td>
                        <button
                          onClick={() => copyToClipboard(medHistory._id)}
                          className={`btn ${
                            copiedId === medHistory._id
                              ? "btn-success"
                              : "btn-light"
                          }`}
                        >
                          <i className="bx bx-copy"></i>
                        </button>
                      </td>
                      <td>
                        {new Date(
                          medHistory.appointmentDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>{medHistory.appointmentTime}</td>
                      <td>{medHistory.department}</td>
                      <td>{medHistory.doctor}</td>
                      <td>{medHistory.diagnoses}</td>
                      <td>{medHistory.requiredReports}</td>
                      <td>{medHistory.comments}</td>
                      <td>
                        <Link to={`/updateMedicalHistory/${medHistory._id}`}>
                          <button
                            className="btn-patient-update-btn"
                            style={{ marginRight: "10px" }}
                          >
                            <i class="bx bx-edit"></i>
                          </button>
                        </Link>
                        {new Date() - new Date(medHistory.appointmentDate) >
                          5 * 365 * 24 * 60 * 60 * 1000 && (
                          <button
                            onClick={() => deleteHandler(medHistory._id)}
                            className="btn-patient-delete-btn"
                          >
                            <img src={DeleteIcon} alt="Delete" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="no-records-found" colSpan={9}>
                        <div>
                      No medical records found.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistoryDetails;
