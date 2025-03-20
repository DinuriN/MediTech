import React, { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Appointment from '../Appoinment/Appoinment'; // Make sure the path is correct

const URL = "http://localhost:5000/appointments"; // Change to the correct URL for appointments

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Appointments() {
  const [appointments, setAppointments] = useState(); // Renamed to appointments

  useEffect(() => {
    fetchHandler().then((data) => setAppointments(data.appointments)); // Updated to appointments
  }, []);

  return (
    <div>
      <Nav />
      <div>
        {appointments && appointments.map((appointment, i) => ( // Updated to appointment
          <div key={i}>
            <Appointment appointment={appointment} /> {/* Updated to appointment */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
