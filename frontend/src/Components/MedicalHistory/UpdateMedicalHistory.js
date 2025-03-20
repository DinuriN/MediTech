import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideNavBar from '../Common/AdminProfile/AdminSideNavBar';
import "./MedicalHistoryForms.css"


function UpdateMedicalHistory() {
    const {patientId}=useParams();
    const [inputs, setInputs]=useState({});
    const updatedMedHistory=useNavigate();
    const [isListening, setIsListening] = useState(false);
    let recognition = null;

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

    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputs((prev) => ({
              ...prev,
              diagnoses: prev.diagnoses + " " + transcript
          }));
      };

      recognition.onerror = (event) => {
          console.error("Speech Recognition Error: ", event.error);
      };

      recognition.onend = () => {
          setIsListening(false);
      };
  }

  const startListening = () => {
      if (recognition) {
          setIsListening(true);
          recognition.start();
      } else {
          alert("Speech recognition is not supported in this browser");
      }
  };
    

    const sendUpdatedMedHistory = async()=>{
        await axios
        .put(`http://Localhost:5000/medicalHistory/${patientId}`, {
            patientId: String(inputs.patientId),
            appointmentDate: String(inputs.appointmentDate),
            department: String(inputs.department),
            doctor: String(inputs.doctor),
            diagnoses: String(inputs.diagnoses),
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
    <div className='admin-prof-container'>
      <div className='col-1'>
            <AdminSideNavBar />

        </div> 
        <div className='col-2'>
      <h2>Update Medical History</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
      <div className="form-label-input-field">
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

        <div className="form-label-input-field">
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

        <div className="form-label-input-field">
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

        <div className="form-label-input-field">
            <label htmlFor="diagnoses" className="form-label">
              Diagnoses
            </label>
            <input
              type="text"
              className="form-control"
              id="diagnoses"
              name="diagnoses"
              value={inputs.diagnoses}
              onChange={handleChange}
              required
            />
            <button
                        type="button"
                        className="btn-microphone-med-history"
                        onClick={startListening}
                        disabled={isListening}
                    >
                        {isListening ? "Listening..." : <i class='bx bx-microphone' ></i>}
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
              value={inputs.requiredReports}
              onChange={handleChange}
              required
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
              value={inputs.comments}
              onChange={handleChange}
              required
            />
            
        </div>
        <button type="submit" className="btn-add-record-btn-green">
            Save Changes
          </button>
      </form>
      </div>
    </div>
  );
}

export default UpdateMedicalHistory;
