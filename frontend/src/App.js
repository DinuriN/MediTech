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
import HomePage from './Components/Common/Index';

import PatientDetails from './Components/Patients/PatientDetails';
import AddPatient from "./Components/Patients/AddPatient";
import UpdatePatient from './Components/Patients/UpdatePatient';
import AddStaff from './Components/StaffMeditech/AddMeditechStaff';
import LoginForUsers from './Components/Common/LoginForUsers/LoginForUsers';
import ProtectedRoute from './Components/Common/LoginForUsers/ProtectedRoute';

import MedicalHistoryDetails from './Components/MedicalHistory/medicalHistoryDetails';
import AddMedicalHistory from './Components/MedicalHistory/AddMedicalHistory';
import UpdateMedicalHistory from './Components/MedicalHistory/UpdateMedicalHistory';
import AdminSideNavBar from './Components/Common/AdminProfile/AdminSideNavBar';
import AdminProfiileSample from './Components/Common/AdminProfile/AdminProfileSample';
import DoctorSuggestForm from './Components/doctor-suggest-form/SymptomForm'
import SingleVisitDetails from './Components/MedicalHistory/SingleVisitDetails';

import AddAppoinment from './Components/Add Appoinment/AddAppoinment';
import AddPayment from './Components/Add Payment/AddPayment';
import AppointmentDetails from './Components/Appoinment Detail/Appoinments';
import PaymentDetails from './Components/Payment Detail/Payments';
import UpdateAppoinment from './Components/Update Appoinment/UpdateAppoinment'

function App() {
  const isAuthenticated= !!localStorage.getItem("token");

  return (
    <div className="App">
      
      <React.Fragment>
        <Routes>
          
          <Route path="/doctorDetails" element={<DoctorHome/>}/>
          <Route path="/doctorDetails/:id" element={<UpdateDoctor/>}/>
          <Route path="/doctorProfile/:id" element={<DoctorProfile/>}/>
          <Route path="/doctorsTimetable" element={<TimetableAllDoctors/>}/>
          <Route path="/registerADoctor" element={<DoctorForm/>}/>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/patientDetails" element={<PatientDetails/>} /> */}
          <Route path="/addPatient" element={<AddPatient/>} />
          <Route path="/updatePatient/:id" element={<UpdatePatient/>} />
          <Route path="/addStaff" element={<AddStaff/>} />
          <Route path='/loginForUsers' element={<LoginForUsers/>} />
          <Route element={<ProtectedRoute allowedUserType="staff" />}>
          <Route path="/patientDetails" element={<PatientDetails />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedUserType="staff" />}>
          <Route path="/addPatient" element={<AddPatient />} />
        </Route> */}

          <Route path="/medicalHistoryDetails/:patientId" element={<MedicalHistoryDetails/>} />
          <Route path="/addMedicalHistory/:patientId" element={<AddMedicalHistory/>} />
          <Route path="/updateMedicalHistory/:patientId" element={<UpdateMedicalHistory/>} />
          <Route path="/adminSideNavBar" element={<AdminSideNavBar/>} />
          <Route path="/adminProfileSample" element={<AdminProfiileSample/>} />
          <Route path="/doctorSuggestForm" element={<DoctorSuggestForm/>} />

          <Route path="/medicalHistory/:visitId" element={<SingleVisitDetails/>}/>

          <Route path="/addappointment" element={<AddAppoinment/>}/>
          <Route path="/addPayments" element={<AddPayment />} />
          <Route path="/appointmentDetails" element={<AppointmentDetails />} />
          <Route path="/paymentDetails" element={<PaymentDetails />} />
          <Route path="/appointments/:id" element={<UpdateAppoinment />} />

          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
