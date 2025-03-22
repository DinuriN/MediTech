import React, { useState, useEffect } from 'react'; 
import Nav from "../Nav/Nav"; 
import axios from "axios"; // Importing axios for making HTTP requests
import Appointment from '../Appoinment/Appoinment'; 

const URL = "http://localhost:5000/appointments"; // API endpoint to fetch appointments

// Function to fetch appointments data from the backend
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data); // Sending GET request and returning the response data
};

function Appointments() {
  // State hook to store the fetched appointments
  const [appointments, setAppointments] = useState(); 

  // Using useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchHandler().then((data) => setAppointments(data.appointments)); 
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Nav /> 
      <div>
        {/* Conditional rendering: check if appointments are available, then map through them */}
        {appointments && appointments.map((appointment, i) => ( 
          <div key={i}> 
            <Appointment appointment={appointment} /> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments; 
