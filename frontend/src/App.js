import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Appoinments from "./Components/Appoinment Detail/Appoinments";
// import Payments from "./Components/Payment Detail/Payments";
import AddAppoinment from "./Components/Add Appoinment/AddAppoinment";
import UpdateAppoinment from './Components/Update Appoinment/UpdateAppoinment';
import Admin from './Components/AdminProfile/AdminPanel';
import AddPayment from './Components/Add Payment/AddPayment';


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
import SingleVisitDetails from './Components/MedicalHistory/SingleVisitDetails';

function App() {
  const isAuthenticated= !!localStorage.getItem("token");

  return (
    <div>
      
      <React.Fragment>
        <Routes>
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
          <Route path="/medicalHistory/:visitId" element={<SingleVisitDetails/>}/>
          <Route path="/addAppointment" element={<AddAppoinment />} />
          <Route path="/addappointment" element={<AddAppoinment />} />
          <Route path="/addPayments" element={<AddPayment />} />
          {/* <Route path="/appointments" element={<Appoinments />} /> */}
          <Route path="/admindashboard/*" element={<Admin />} />
          {/* <Route path="/paymentdetails" element={<Payments />} /> */}
          <Route path="/appointments/:id" element={<UpdateAppoinment />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;