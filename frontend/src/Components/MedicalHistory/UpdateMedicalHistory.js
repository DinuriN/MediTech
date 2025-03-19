import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMedicalHistory() {
    const {patientId}=useParams();
    const [inputs, setInputs]=useState({});
    const updatedMedHistory=useNavigate();

    useEffect(()=>{
        const fetchHandler=async()=>{
            await axios
            .get(`http://Localhost:5000/medicalHistory/${patientId}`)
            .then((res)=>res.data)
            .then((data)=>{
                const medicalHistory = data.medicalHistory;
                if (medicalHistory.appointmentDate) {
                  medicalHistory.appointmentDate = new Date(medicalHistory.appointmentDate)
                    .toISOString()
                    .split("T")[0];
                }
                
                setInputs(medicalHistory);
            });
        };
        fetchHandler();
    }, [patientId]);

    const sendUpdatedMedHistory = async()=>{
        await axios
        .put(`http://Localhost:5000/medicalHistory/${patientId}`, {
            patientId: String(inputs.patientId),
            appointmentDate: String(inputs.appointmentDate),
            department: String(inputs.department),
            doctor: String(inputs.doctor),
            requiredReports: String(inputs.requiredReports),
            comments: String(inputs.comments),
        })
        .then((res)=> res.data);
    };

    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        sendUpdatedMedHistory().then(()=>updatedMedHistory(`/medicalHistoryDetails/${inputs.patientId}`));
    };


  return (
    <div>
      <h1>Update Medical History</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label">
              Appointment Date
            </label>
            <input
              type="date"
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              value={inputs.appointmentDate}
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
              value={inputs.department}
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
              name="doctor"
              value={inputs.doctor}
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
              value={inputs.requiredReports}
              onChange={handleChange}
              required
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
              value={inputs.comments}
              onChange={handleChange}
              required
            />
        </div>
        <button type="submit" className="btn btn-success">
            Save Changes
          </button>
      </form>
    </div>
  );
}

export default UpdateMedicalHistory;
