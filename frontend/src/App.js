import logo from './logo.svg';
import './App.css';
import React from "react";

import {Route, Routes} from "react-router";
import NavBar from './Components/Common/NavBar';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Footer/>} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
