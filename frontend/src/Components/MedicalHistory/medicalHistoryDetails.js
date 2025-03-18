import axios from 'axios';
import React, { use, useEffect, useRef, useState } from 'react';
import { data, useParams } from 'react-router-dom';

const URL = "http://Localhost:5000/medicalHistory";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

function MedicalHistoryDetails() {
    const {patientId}=useParams();
    const [medicalHistory, setMedicalHistory]=useState([]);
    

    useEffect(()=>{
        fetchHandler().then((data)=>setMedicalHistory(data.medicalHistory))
    }, []);

    useEffect(()=>{
        fetchHandler().then((data)=>{
            const filteredHistory=data.medicalHistory.filter(
                (history)=>history.patientId === patientId
            );
            setMedicalHistory(filteredHistory);
        });
    }, [patientId]);

   


  return (
    <div>
      <div>
        <h1>Medical History</h1>

        {/*Medical History Table */}
        
            <table className='table table-bordered table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>Visit ID</th>
                        <th></th>
                        <th>Appointment Date</th>
                        <th>Department</th>
                        <th>Doctor</th>
                        <th>Required Reports</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {medicalHistory &&
                        medicalHistory.map((medHistory)=>(
                            <tr key={medHistory._id}>
                                <td>{medHistory._id}</td>
                                <td></td>
                                <td>{medHistory.appointmentDate}</td>
                                <td>{medHistory.department}</td>
                                <td>{medHistory.doctor}</td>
                                <td>{medHistory.requiredReports}</td>
                                <td>{medHistory.comments}</td>
                                <td><button>Actions</button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        
      </div>
      <div>

      </div>
    </div>
  );
}

export default MedicalHistoryDetails;
