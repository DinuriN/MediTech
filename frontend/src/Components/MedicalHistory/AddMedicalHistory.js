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
            comments: formData.comments.trim() === "" ? "None" : formData.comments,
            requiredReports: formData.requiredReports.trim() === "" ? "None" : formData.requiredReports,
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
              type="date"
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="department" className="form-label">
            Department
            </label>
            <select
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              
            >
              <option value="">Select a Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
            Doctor
            </label>
            <select
              type="text"
              className="form-control"
              id="doctor"
              name
              ="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              
            >
              <option value="">Select a Doctor</option>
              <option value="Dr. Nalin Perera">Dr. Nalin Perera</option>
              <option value="Dr. Ayesha Fernando">Dr. Ayesha Fernando</option>
              <option value="Dr. Rajitha Kumara">Dr. Rajitha Kumara</option>
              <option value="Dr. Shalini Wickramasinghe">Dr. Shalini Wickramasinghe</option>
              <option value="Dr. Pradeep Fernando">Dr. Pradeep Fernando</option>
              <option value="Dr. Sanath Perera">Dr. Sanath Perera</option>
              <option value="Dr. Nihal Bandu">Dr. Nihal Bandu</option>
              <option value="Dr. Yamuna Nadee">Dr. Yamuna Nadee</option>
            </select>
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
