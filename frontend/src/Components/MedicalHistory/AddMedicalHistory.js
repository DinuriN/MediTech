import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./MedicalHistoryForms.css"
import AdminSideNavBar from '../Common/AdminProfile/AdminSideNavBar';


function AddMedicalHistory() {
    const {patientId} = useParams();
    const navigate=useNavigate();
    
    const [formData, setFormData] = useState ({
        appointmentDate: "",
        appointmentTime:"",
        department: "",
        doctor: "",
        diagnoses: "",
        requiredReports: "",
        comments: ""
    });

    const [isListening, setIsListening]=useState(false);
    let recognition=null;

    if("webkitSpeechRecognition" in window) {
      recognition=new window.webkitSpeechRecognition();
      recognition.continuous=false;
      recognition.interimResults=false;
      recognition.lang="en-US";

      recognition.onresult=(event)=>{
        const transcript=event.results[0][0].transcript;
        setFormData((prev)=>({...prev, diagnoses:prev.diagnoses + " "+transcript}));
      };

      recognition.onerror=(event)=>{
        console.error("Speech Recognition Error: ",event.error);
      };

      recognition.onend=()=>{
        setIsListening(false);
      };
    };

      const startListening=()=>{
        if(recognition){
          setIsListening(true);
          recognition.start();
        } else{
          alert("Speech recognition is not supported in this browser");
        }
      };
   

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
    <div className="admin-prof-container">
      <div className='col-1'>
            <AdminSideNavBar />

        </div> 
        <div className='col-2'>
      <h2>Add New Medical Record</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
      <div className="form-label-input-field">
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
        <div className="form-label-input-field">
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

        <div className="form-label-input-field">
            <label htmlFor="appointmentTime" className="form-label">
            Appointment Time
            </label>
            <input
              type="time"
              className="form-control"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
        </div>
        <div className="form-label-input-field">
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
              <option value="Emergency Department">Emergency Department </option>
              <option value="ENT">ENT</option>
              <option value="Hematology">Hematology</option>
              <option value="Neurology">Neurology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pathology">Pathology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatric">Psychiatric</option>
              <option value="Radiology">Radiology</option>
              <option value="Urology">Urology</option>
            </select>
        </div>
        <div className="form-label-input-field">
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

        <div className="form-label-input-field">
            <label htmlFor="diagnoses" className="form-label">
            Diagnoses
            </label>
            <input
              type="text"
              className="form-control"
              id="diagnoses"
              name="diagnoses"
              value={formData.diagnoses}
              onChange={handleChange}
              
              
            />
            <button type="button" className="btn-microphone-med-history" onClick={startListening} disabled={isListening}>
              {isListening? "Listening...": <i class='bx bx-microphone' ></i>}
            </button>
        </div>


        <div className="form-label-input-field">
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
        <div className="form-label-input-field">
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

        <button type='submit' className='btn-add-record-btn-green'>Add Record</button>

      </form>
      </div>
    </div>
  );
}

export default AddMedicalHistory;
