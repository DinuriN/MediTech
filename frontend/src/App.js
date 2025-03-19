import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import HomePage from './Components/Common/Index';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
