import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabEquipmentDetails from './Components/LabEquipment/LabEquipmentDetails';
import UpdateLabEquipment from './Components/LabEquipment/UpdateLabEquipment';
import AddLabEquipment from './Components/LabEquipment/AddLabEquipment';
import ChatBot from './Components/LabEquipment/ChatBot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LabEquipmentDetails />} />
          <Route path="/labEquipmentDetails" element={<LabEquipmentDetails />} />
          <Route path="/updateLabEquipment/:id" element={<UpdateLabEquipment />} />
          <Route path="/addLabEquipment" element={<AddLabEquipment />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
