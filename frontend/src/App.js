import React from "react"
import {Routes, Route} from "react-router-dom"
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

import Orderbrief from "./Components/OnlinePharmacy/pharmacy-order-view-more/OrderViewMore";
import AddPharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-add/AddPharmacyOrder";
import PharmacyHome from "./Components/OnlinePharmacy/pharmacy-home-page/PharmacyHome";
import UpdatePharmacyOrder from "./Components/OnlinePharmacy/pharmacy-order-update/UpdatPharmacyOrder"
import TextExtractor from "./Components/OnlinePharmacy/pharmacy-text-extract/TextExtractor";
import DrugInteractionChecker from './Components/OnlinePharmacy/pharmacy-drug-checker/DrugInteractionChecker';
import SingleOrderDetails from './Components/OnlinePharmacy/pharmacy-singleorder-details/SingleOrderDetails';

import AddAppoinment from './Components/Add Appoinment/AddAppoinment';
import AddPayment from './Components/Add Payment/AddPayment';
import AppointmentDetails from './Components/Appoinment Detail/Appoinments';
import PaymentDetails from './Components/Payment Detail/Payments';
import UpdateAppoinment from './Components/Update Appoinment/UpdateAppoinment';

import LabEquipmentDetails from './Components/LabEquipment/LabEquipmentDetails';
import UpdateLabEquipment from './Components/LabEquipment/UpdateLabEquipment';
import AddLabEquipment from './Components/LabEquipment/AddLabEquipment';
import ChatBot from './Components/LabEquipment/ChatBot';

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

          <Route path="/order-details" element={<PharmacyHome/>} />
          <Route path="/addPharmacyOrder" element={<AddPharmacyOrder/>} />
          <Route path="/order-details/:id" element={<UpdatePharmacyOrder/>} />
          <Route path="/order-brief/:id" element={<Orderbrief/>} />
          <Route path="/extract-text" element={<TextExtractor />} />
          <Route path="/drug-checker" element={<DrugInteractionChecker />} />
          <Route path="/order-single" element={<SingleOrderDetails />} />

          <Route path="/addappointment" element={<AddAppoinment/>}/>
          <Route path="/addPayments" element={<AddPayment />} />
          <Route path="/appointmentDetails" element={<AppointmentDetails />} />
          <Route path="/paymentDetails" element={<PaymentDetails />} />
          <Route path="/appointments/:id" element={<UpdateAppoinment />} />

          <Route path="/labEquipmentDetails" element={<LabEquipmentDetails />} />
          <Route path="/updateLabEquipment/:id" element={<UpdateLabEquipment />} />
          <Route path="/addLabEquipment" element={<AddLabEquipment />} />
          <Route path="/chatbot" element={<ChatBot />} />

          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
