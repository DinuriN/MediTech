import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabEquipmentDetails from './Components/LabEquipmentDetails';
import UpdateLabEquipment from './Components/UpdateLabEquipment';
import AddLabEquipment from './Components/AddLabEquipment'; // Import the AddLabEquipment component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LabEquipmentDetails />} />
          <Route path="/labEquipmentDetails" element={<LabEquipmentDetails />} />
          <Route path="/updateLabEquipment/:id" element={<UpdateLabEquipment />} />
          <Route path="/addLabEquipment" element={<AddLabEquipment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;