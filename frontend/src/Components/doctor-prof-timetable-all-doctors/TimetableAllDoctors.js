import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TimetableAllDoctors.css'; // Styling the timetable

const URL = "http://localhost:5000/doctors";

// Fetching doctors data from the API
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function TimetableAllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [dayFilter, setDayFilter] = useState(""); // Filter by day
  const [nameFilter, setNameFilter] = useState(""); // Filter by name
  
  useEffect(() => {
    fetchHandler().then((data) => {
      setDoctors(data.doctors);
      setFilteredDoctors(data.doctors);
    });
  }, []);

  // Filter doctors by day
  const handleDayFilterChange = (e) => {
    const filter = e.target.value;
    setDayFilter(filter);
    applyFilters(filter, nameFilter);
  };

  // Filter doctors by name
  const handleNameFilterChange = (e) => {
    const filter = e.target.value;
    setNameFilter(filter);
    applyFilters(dayFilter, filter);
  };

  // Apply all filters
  const applyFilters = (dayFilter, nameFilter) => {
    const filtered = doctors.filter((doctor) => {
      const matchesDay = dayFilter === "" || doctor.doctorAvailableDays.includes(dayFilter);
      const matchesName = nameFilter === "" || doctor.doctorName.toLowerCase().includes(nameFilter.toLowerCase());
      return matchesDay && matchesName;
    });
    setFilteredDoctors(filtered);
  };

  // Function to format the timetable cells and apply colors
  const formatAvailableTimes = (doctor, day) => {
    const isAvailable = doctor.doctorAvailableDays.includes(day);
    const availabilityText = isAvailable ? `${doctor.doctorAvailableTimeStart} - ${doctor.doctorAvailableTimeEnd}` : "Not Available";

    return (
      <div className={isAvailable ? 'available' : 'not-available'}>
        {availabilityText}
      </div>
    );
  };

  // Get columns based on the day filter
  const getColumns = () => {
    if (dayFilter === "") {
      // Show all days when no specific day is selected
      return (
        <>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </>
      );
    } else {
      // Show only the filtered day when a specific day is selected
      return <th>{dayFilter}</th>;
    }
  };

  return (
    <div className='top-header'>
        <div className='topic'>
        <h1>Doctor's Weekly Timetable</h1>
        </div>
        
        <hr/>
    <div className="timetable-container">

      <div className="filters">
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="Search by Doctor Name"
        />

        <select onChange={handleDayFilterChange} value={dayFilter}>
          <option value="">All Days</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <table className="doctor-timetable">
        <thead>
          <tr>
            <th>Doctor Name</th>
            {getColumns()} {/* Render relevant columns based on the filter */}
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.doctorName}</td>
              {dayFilter === "" ? (
                <>
                  <td>{formatAvailableTimes(doctor, "Monday")}</td>
                  <td>{formatAvailableTimes(doctor, "Tuesday")}</td>
                  <td>{formatAvailableTimes(doctor, "Wednesday")}</td>
                  <td>{formatAvailableTimes(doctor, "Thursday")}</td>
                  <td>{formatAvailableTimes(doctor, "Friday")}</td>
                  <td>{formatAvailableTimes(doctor, "Saturday")}</td>
                  <td>{formatAvailableTimes(doctor, "Sunday")}</td>
                </>
              ) : (
                <td>{formatAvailableTimes(doctor, dayFilter)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default TimetableAllDoctors;
