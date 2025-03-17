import React from "react"
import {Routes, Route} from "react-router"
import logo from './logo.svg';
import './App.css';
import DoctorHome from "./Components/doctor-prof-mgt/doctor-homepage/DoctorHomepage";
import DoctorForm from "./Components/doctor-prof-mgt/doctor-form/doctorForm"
import UpdateDoctor from "./Components/doctor-prof-mgt/update-doctor/UpdateDoctor";
import DoctorProfile from "./Components/doctor-prof-mgt/doctor-profile-for-view-more/DoctorProfileForViewMore";
import TimetableAllDoctors from "./Components/doctor-prof-timetable-all-doctors/TimetableAllDoctors";
import NavBar from './Components/Common/NavBar';

function App() {
  return (
    <div className="App">
      
      <React.Fragment>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/doctorDetails" element={<DoctorHome/>}/>
          <Route path="/doctorDetails/:id" element={<UpdateDoctor/>}/>
          <Route path="/doctorProfile/:id" element={<DoctorProfile/>}/>
          <Route path="/doctorsTimetable" element={<TimetableAllDoctors/>}/>
          <Route path="/registerADoctor" element={<DoctorForm/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
