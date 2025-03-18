import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddMedicalHistory() {
    const {patientId} = useParams();
    const navigate=useNavigate();
    
    const [formData, setFormData] = useState ({
        appointmentDate: "",
        department: "",
        doctor: "",
        requiredReports: "",
        comments: ""
    });

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const newRecord={
            ...formData,
            patientId,
        };

        await axios.post("http://Localhost:5000/medicalHistory", newRecord);
        alert("Record added successfully!");
        navigate(`/medicalHistoryDetails/${patientId}`);
    }
  return (
    <div>
      <h1>Add Medical History</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="patientId" className="form-label">
              Patient ID
            </label>
            <input
              type="text"
              className="form-control"
              id="patientId"
              name="patientId"
              value={patientId}
              disabled
            />
        </div>
        <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label">
            Appointment Date
            </label>
            <input
              type="text"
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              
            />
        </div>
        <div className="mb-3">
            <label htmlFor="department" className="form-label">
            Department
            </label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              
            />
        </div>
        <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
            Doctor
            </label>
            <input
              type="text"
              className="form-control"
              id="doctor"
              name
              ="doctor"
              value={formData.doctor}
              onChange={handleChange}
              
            />
        </div>
        <div className="mb-3">
            <label htmlFor="requiredReports" className="form-label">
            Required Reports
            </label>
            <input
              type="text"
              className="form-control"
              id="requiredReports"
              name="requiredReports"
              value={formData.requiredReports}
              onChange={handleChange}
              
            />
        </div>
        <div className="mb-3">
            <label htmlFor="comments" className="form-label">
            Comments
            </label>
            <input
              type="text"
              className="form-control"
              id="comments"
               name="comments"
              value={formData.comments}
              onChange={handleChange}
              
            />
        </div>

        <button type='submit' className='btn btn-primary'>Add Record</button>

      </form>
    </div>
  );
}

export default AddMedicalHistory;
